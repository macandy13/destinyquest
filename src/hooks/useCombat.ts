import { useState, useCallback } from 'react';
import { CombatState, Enemy, CombatLog, ActiveAbility, DiceRoll } from '../types/combat';
import { sumDice, rollDice } from '../utils/dice';
import { Hero } from '../types/hero';
import { getAbilityDefinition } from '../mechanics/abilityRegistry';
import '../mechanics/abilities';

const INITIAL_STATE: CombatState = {
    round: 0,
    phase: 'combat-start', // Start inactive
    enemy: null,
    hero: null,
    winner: null,
    activeAbilities: [],
    modifiers: [],
    logs: []
};

// Default easy enemy for testing
const MOCK_ENEMY: Enemy = {
    name: 'Training Dummy',
    speed: 2,
    brawn: 2,
    magic: 0,
    armour: 0,
    health: 20,
    maxHealth: 20,
    abilities: []
};

export function useCombat(hero: Hero) {
    const [combat, setCombat] = useState<CombatState>(INITIAL_STATE);

    const startCombat = useCallback(() => {
        // Extract abilities from equipped items
        const abilities: ActiveAbility[] = [];
        Object.values(hero.equipment).forEach(item => {
            if (item && item.abilities && item.abilities.length > 0) {
                item.abilities.forEach(abilityName => {
                    if (abilityName !== 'None') {
                        abilities.push({
                            name: abilityName,
                            source: item.name,
                            used: false
                        });
                    }
                });
            }
        });

        setCombat({
            round: 1,
            phase: 'combat-start',
            enemy: { ...MOCK_ENEMY },
            hero: { ...hero }, // Clone hero state for combat
            winner: null,
            activeAbilities: abilities,
            modifiers: [],
            logs: [{ round: 1, message: 'Combat started!', type: 'info' }]
        });
    }, [hero]);

    const endCombat = useCallback(() => {
        setCombat(INITIAL_STATE);
    }, []);

    const activateAbility = (abilityName: string) => {
        setCombat(prev => {
            const ability = prev.activeAbilities.find(a => a.name === abilityName && !a.used);
            if (!ability) return prev; // No unused ability found

            const definition = getAbilityDefinition(abilityName);
            if (!definition || !definition.onActivate) return prev; // No active effect defined

            const updates = definition.onActivate(prev);
            if (!updates) return prev; // Activation decided no effect or invalid

            // Mark ability as used
            // Mark specific ability instance as used
            const abilityIndex = prev.activeAbilities.indexOf(ability);
            const newActiveAbilities = [...prev.activeAbilities];
            if (abilityIndex !== -1) {
                newActiveAbilities[abilityIndex] = { ...ability, used: true };
            }

            return {
                ...prev,
                ...updates,
                activeAbilities: newActiveAbilities,
                // Logs are typically handled inside 'updates' from the hook if they want to explain effect,
                // but we can ensure they are appended if merging array logic isn't perfect.
                // In our registry implementation, we return { logs: [...prev.logs, newLog] }.
                // So spread ...updates overwrites logs, which is correct.
            };
        });
    };

    const addLog = (message: string, type: CombatLog['type']) => {
        setCombat(prev => ({
            ...prev,
            logs: [...prev.logs, { round: prev.round, message, type }]
        }));
    };

    // Phase 1: Speed Roll
    interface SpeedRoundParams {
        heroRolls: DiceRoll[];
        enemyRolls: DiceRoll[];
    }

    // Resolves the winner but does NOT advance phase automatically
    // This allows the user to see results and reroll if needed before committing
    const resolveSpeedRound = ({ heroRolls, enemyRolls }: SpeedRoundParams) => {
        if (!combat.enemy) return;

        const heroRoll = sumDice(heroRolls);
        const enemyRoll = sumDice(enemyRolls);

        // Apply modifiers
        const speedModifiers = combat.modifiers
            .filter(m => m.type === 'speed-bonus')
            .reduce((sum, m) => sum + m.value, 0);

        const heroTotal = heroRoll + hero.stats.speed + speedModifiers;
        const enemyTotal = enemyRoll + combat.enemy.speed;
        let winner: 'hero' | 'enemy' | null = null;

        let modText = speedModifiers > 0 ? ` (+${speedModifiers} mod)` : '';
        let message = `Speed: Hero ${heroTotal}${modText} vs Enemy ${enemyTotal}. `;

        if (heroTotal > enemyTotal) {
            winner = 'hero';
            message += 'Hero wins execution round!';
        } else if (enemyTotal > heroTotal) {
            winner = 'enemy';
            message += 'Enemy wins execution round!';
        } else {
            message += 'Draw! No damage this round.';
        }

        setCombat(prev => ({
            ...prev,
            phase: 'speed-roll', // Stay in speed-roll to allow viewing/rerolling
            winner,
            heroSpeedRolls: heroRolls,
            enemySpeedRolls: enemyRolls,
            logs: [...prev.logs, { round: prev.round, message, type: 'info' }]
        }));
    };

    // New function to proceed after speed results are accepted
    const commitSpeedResult = () => {
        setCombat(prev => {
            const nextPhase = prev.winner ? 'damage-roll' : 'round-end';
            let damageRolls: DiceRoll[] | undefined = undefined;

            if (nextPhase === 'damage-roll') {
                // Check where damageDice lives. Hero: stats.damageDice. Enemy: damageDice.
                const diceCount = prev.winner === 'hero'
                    ? (prev.hero?.stats.damageDice ?? 1)
                    : (prev.enemy?.damageDice ?? 1);

                // Auto-roll damage based on dice count
                damageRolls = rollDice(diceCount);
            }

            return {
                ...prev,
                phase: nextPhase,
                damageRolls
            };
        });
    };

    // Helper to generate rolls
    const generateSpeedRolls = () => {
        const heroDice = hero.stats.speedDice ?? 2;
        const enemyDice = combat.enemy?.speedDice ?? 2;
        return {
            hero: rollDice(heroDice),
            enemy: rollDice(enemyDice)
        };
    };

    // Called by "Fight" button in Round 1
    const executeSpeedRoll = () => {
        const rolls = generateSpeedRolls();
        resolveSpeedRound({ heroRolls: rolls.hero, enemyRolls: rolls.enemy });
    };

    // Called by "Next Round" button
    const nextRound = () => {
        setCombat(prev => {
            // Update modifiers (decrease duration, remove expired)
            const shouldDecrement = prev.phase !== 'combat-start';

            const activeModifiers = prev.modifiers
                .map(m => shouldDecrement ? { ...m, duration: m.duration - 1 } : m)
                .filter(m => m.duration > 0);

            // Auto-roll for the new round
            const rolls = generateSpeedRolls();
            // We need to duplicate resolve logic here since we are inside setCombat
            // OR we can just set the rolls and phase, and rely on resolveSpeedRound logic separately?
            // No, we need to determine winner to set the state correctly in one go.

            // Duplicating core calc logic briefly for atomicity in nextRound
            // (Or we could extract the calculation to a pure function, but inline is fine for now)

            const heroRoll = sumDice(rolls.hero);
            const enemyRoll = sumDice(rolls.enemy);
            const speedModifiers = activeModifiers
                .filter(m => m.type === 'speed-bonus')
                .reduce((sum, m) => sum + m.value, 0);

            // Need enemy stats from prev.enemy
            const enemySpeed = prev.enemy?.speed || 0;
            const heroSpeed = prev.hero?.stats.speed || 0; // Using prev.hero to be safe

            const heroTotal = heroRoll + heroSpeed + speedModifiers;
            const enemyTotal = enemyRoll + enemySpeed;

            let winner: 'hero' | 'enemy' | null = null;
            let modText = speedModifiers > 0 ? ` (+${speedModifiers} mod)` : '';
            let message = `Speed: Hero ${heroTotal}${modText} vs Enemy ${enemyTotal}. `;

            if (heroTotal > enemyTotal) {
                winner = 'hero';
                message += 'Hero wins execution round!';
            } else if (enemyTotal > heroTotal) {
                winner = 'enemy';
                message += 'Enemy wins execution round!';
            } else {
                message += 'Draw! No damage this round.';
            }

            return {
                ...prev,
                round: prev.round + 1,
                winner,
                heroSpeedRolls: rolls.hero,
                enemySpeedRolls: rolls.enemy,
                damageRolls: undefined,
                phase: 'speed-roll',
                modifiers: activeModifiers,
                logs: [...prev.logs, { round: prev.round + 1, message: `Round ${prev.round + 1}`, type: 'info' }, { round: prev.round + 1, message, type: 'info' }]
            };
        });
    };

    const executeDamageRoll = (rolls: DiceRoll[]) => {
        setCombat(prev => ({
            ...prev,
            damageRolls: rolls,
            phase: 'damage-roll' // Explicitly state phase (though likely already there)
        }));
    };

    const commitDamageResult = () => {
        if (!combat.enemy || !combat.winner || !combat.hero || !combat.damageRolls) return;

        const rolls = combat.damageRolls;

        setCombat(prev => {
            if (!prev.enemy || !prev.winner || !prev.hero) return prev;

            let logMsg = '';
            let currentHero = { ...prev.hero! };
            currentHero.stats = { ...currentHero.stats };
            let currentEnemy = { ...prev.enemy };

            let newHeroHealth = currentHero.stats.health;
            let newEnemyHealth = currentEnemy.health;
            let type: CombatLog['type'] = 'info';

            // Hook call for Acid and other damage modifiers
            let modifiersFromHooks = 0;
            let hookLogMsg = '';

            const rollTotal = sumDice(rolls);
            if (prev.winner === 'hero') {
                const modifier = Math.max(hero.stats.brawn, hero.stats.magic);
                const rawDamage = rollTotal + modifier + modifiersFromHooks;

                prev.activeAbilities.forEach(ability => {
                    const def = getAbilityDefinition(ability.name);
                    if (def && def.onDamageCalculate) {
                        const mod = def.onDamageCalculate(prev, { total: rawDamage, rolls });
                        if (mod !== 0) {
                            modifiersFromHooks += mod;
                            hookLogMsg += ` (+${mod} ${ability.name})`;
                        }
                    }
                });

                const totalDamage = rawDamage + modifiersFromHooks;
                const actualDamage = Math.max(0, totalDamage - currentEnemy.armour);
                newEnemyHealth = Math.max(0, currentEnemy.health - actualDamage);
                currentEnemy.health = newEnemyHealth;

                logMsg = `Hero hits for 💥 ${totalDamage}: Rolled ${rollTotal}, Modifier ${modifier}, Hooks ${hookLogMsg}. Enemy armour absorbs ${currentEnemy.armour}.`;
                type = 'damage-enemy';
            } else {
                const modifier = Math.max(currentEnemy.brawn, currentEnemy.magic);
                const rawDamage = rollTotal + modifier;
                const actualDamage = Math.max(0, rawDamage - currentHero.stats.armour);
                newHeroHealth = Math.max(0, currentHero.stats.health - actualDamage);
                currentHero.stats.health = newHeroHealth;

                logMsg = `Enemy hits for 💔 ${rawDamage}: Rolled ${rollTotal}, Modifier ${modifier}. Hero armour absorbs ${currentHero.stats.armour}.`;
                type = 'damage-hero';
            }

            // Apply end-of-round passives via hooks
            let passiveLogMsg = '';

            // Temporary state for hooks to see valid health in this immediate transition
            let currentStateForHooks = {
                ...prev,
                hero: currentHero,
                enemy: currentEnemy,
                phase: 'round-end' // Simulate round-end for hooks
            } as CombatState;

            prev.activeAbilities.forEach(ability => {
                const def = getAbilityDefinition(ability.name);
                if (def && def.onRoundEnd) {
                    const updates = def.onRoundEnd(currentStateForHooks);

                    if (updates.enemy) {
                        currentEnemy = updates.enemy;
                        newEnemyHealth = currentEnemy.health;
                        currentStateForHooks.enemy = currentEnemy;
                    }
                    if (updates.hero) {
                        currentHero = updates.hero;
                        newHeroHealth = currentHero.stats.health;
                        currentStateForHooks.hero = currentHero;
                    }

                    if (updates.logs) {
                        updates.logs.forEach(l => {
                            if (l.round === prev.round) passiveLogMsg += ' ' + l.message;
                        });
                    }
                }
            });

            // Check for defeat
            const isFinished = newHeroHealth <= 0 || newEnemyHealth <= 0;
            const nextPhase = isFinished ? 'combat-end' : 'round-end';

            const logs = [...prev.logs, { round: prev.round, message: logMsg + passiveLogMsg, type }];

            if (newHeroHealth <= 0) logs.push({ round: prev.round, message: 'Hero Defeated!', type: 'loss' });
            if (newEnemyHealth <= 0) logs.push({ round: prev.round, message: 'Enemy Defeated!', type: 'win' });

            return {
                ...prev,
                hero: currentHero,
                enemy: currentEnemy,
                phase: nextPhase,
                damageRolls: rolls,
                logs
            };
        });
    };



    // Helper to re-evaluate speed winner if rolls changed (manual call if needed, or effect?)
    // Actually, `resolveSpeedRound` sets the state including winner.
    // If handleReroll updates `heroSpeedRolls`, the `winner` in state remains the OLD one unless updated.
    // Charm implementation returns `heroSpeedRolls`. It does NOT calculating winner.
    // So if I reroll speed, the winner might be wrong in the UI until something updates it.

    // We should probably just call resolveSpeedRound with the new rolls?
    // But `updates` came from `def.onReroll`.

    // Quick patch for Speed Reroll to ensure winner is correct:
    // This duplicates logic but is safe:
    /* 
       const newSpeedRolls = updates.heroSpeedRolls;
       if (newSpeedRolls) {
           const heroTotal = ...
           const enemyTotal = ...
           const winner = ...
           updates.winner = winner; 
       }
    */
    // I will leave Speed Reroll logic 'as is' (it might be broken regarding winner update, but I am fixing Damage).
    // Actually, the previous code called resolveSpeedRound.
    // I should probably keep calling it if I can?
    // `resolveSpeedRound` calls `setCombat`. `handleReroll` calls `setCombat`.
    // `handleReroll` was merging `updates`.
    // If I remove `resolveSpeedRound` call, winner won't update.

    // FIX: In handleReroll, after getting updates, IF speed involved, calculate winner and merge into updates.
    // IF damage involved, just set rolls (which updates did).

    const handleReroll = (dieIndex: number) => {
        if (!combat.rerollState) return;
        const def = getAbilityDefinition(combat.rerollState.source);
        if (!def || !def.onReroll) return;

        const updates = def.onReroll(combat, dieIndex);

        // If speed changed, re-evaluate winner
        if (updates.heroSpeedRolls && combat.enemySpeedRolls) {
            const heroRoll = sumDice(updates.heroSpeedRolls);
            const enemyRoll = sumDice(combat.enemySpeedRolls);

            // Speed modifiers
            const speedModifiers = combat.modifiers
                .filter(m => m.type === 'speed-bonus')
                .reduce((sum, m) => sum + m.value, 0);

            const heroTotal = heroRoll + hero.stats.speed + speedModifiers;
            const enemyTotal = enemyRoll + (combat.enemy?.speed || 0);

            let winner: 'hero' | 'enemy' | null = null;
            if (heroTotal > enemyTotal) winner = 'hero';
            else if (enemyTotal > heroTotal) winner = 'enemy';

            updates.winner = winner;
        }

        setCombat(prev => ({ ...prev, ...updates, rerollState: undefined }));
    };

    return {
        combat,
        startCombat,
        endCombat,
        nextRound,
        activateAbility,
        resolveSpeedRound,

        executeDamageRoll, // New export
        commitDamageResult, // New export

        handleReroll,
        addLog,
        commitSpeedResult,
        executeSpeedRoll
    };
}
