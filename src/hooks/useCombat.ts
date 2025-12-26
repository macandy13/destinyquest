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

    const startCombat = useCallback((initialEnemy?: Enemy) => {
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

        // Use provided enemy or fallback to MOCK_ENEMY if none provided (for existing calls compatibility if any, or just fail safe)
        const enemyToUse = initialEnemy || MOCK_ENEMY;

        setCombat({
            round: 1,
            phase: 'combat-start',
            enemy: { ...enemyToUse },
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
            message += 'Hero wins speed round!';
        } else if (enemyTotal > heroTotal) {
            winner = 'enemy';
            message += 'Enemy wins speed round!';
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

    // Helper to generate rolls
    const generateSpeedRolls = () => {
        const heroDice = hero.stats.speedDice ?? 2;

        // Apply speed-dice modifiers
        const speedDiceModifiers = combat.modifiers
            .filter(m => m.type === 'speed-dice')
            .reduce((sum, m) => sum + m.value, 0);

        const totalHeroDice = Math.max(1, heroDice + speedDiceModifiers);
        const enemyDice = combat.enemy?.speedDice ?? 2;

        return {
            hero: rollDice(totalHeroDice),
            enemy: rollDice(enemyDice)
        };
    };

    // Called by "Fight" button in Round 1
    const executeSpeedRoll = () => {
        const rolls = generateSpeedRolls();
        resolveSpeedRound({ heroRolls: rolls.hero, enemyRolls: rolls.enemy });
    };

    const generateDamageRolls = () => {
        const diceCount = combat.winner === 'hero'
            ? (combat.hero?.stats.damageDice ?? 1)
            : (combat.enemy?.damageDice ?? 1);

        // Auto-roll damage based on dice count
        return rollDice(diceCount);
    }

    const commitSpeedResult = () => {
        setCombat(prev => {
            if (!prev.winner) {
                return {
                    ...prev,
                    phase: 'round-end'
                }
            }
            return {
                ...prev,
                phase: 'damage-roll',
                damageRolls: generateDamageRolls()
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
                const skill = Math.max(hero.stats.brawn, hero.stats.magic);
                const damageModifiers = prev.modifiers
                    .filter(m => m.type === 'damage-bonus')
                    .reduce((sum, m) => sum + m.value, 0);
                const rawDamage = rollTotal + skill + modifiersFromHooks + damageModifiers;

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

                logMsg = `Hero hits for 💥 ${totalDamage}: Rolled ${rollTotal}, Skill ${skill}, Hooks ${hookLogMsg}${damageModifiers ? `, Bonus +${damageModifiers}` : ''}. Enemy armour absorbs ${currentEnemy.armour}.`;
                type = 'damage-enemy';
            } else {
                const skill = Math.max(currentEnemy.brawn, currentEnemy.magic);
                const rawDamage = rollTotal + skill;
                const actualDamage = Math.max(0, rawDamage - currentHero.stats.armour);
                newHeroHealth = Math.max(0, currentHero.stats.health - actualDamage);
                currentHero.stats.health = newHeroHealth;

                logMsg = `Enemy hits for 💔 ${rawDamage}: Rolled ${rollTotal}, Skill ${skill}. Hero armour absorbs ${currentHero.stats.armour}.`;
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

    // Called by "Next Round" button
    const nextRound = () => {
        startNewRound();
        executeSpeedRoll();
    };

    const startNewRound = () => {
        setCombat(prev => {
            const activeModifiers = prev.modifiers
                .map(m => { return { ...m, duration: m.duration - 1 }; })
                .filter(m => m.duration > 0);
            return {
                ...prev,
                round: prev.round + 1,
                phase: 'speed-roll',
                modifiers: activeModifiers,
                rerollState: undefined,
                heroSpeedRolls: undefined,
                enemySpeedRolls: undefined,
                damageRolls: undefined,
                winner: null,
            };
        });
    };

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
        executeDamageRoll,
        commitDamageResult,
        handleReroll,
        addLog,
        commitSpeedResult,
        executeSpeedRoll
    };
}
