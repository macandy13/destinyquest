import { useState, useCallback } from 'react';
import { CombatState, Enemy, CombatLog, ActiveAbility } from '../types/combat';
import { Hero } from '../types/hero';
import { getAbilityDefinition } from '../mechanics/abilityDefinitions';

const INITIAL_STATE: CombatState = {
    round: 0,
    phase: 'combat-start', // Start inactive
    enemy: null,
    heroHealth: 0,
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
            heroHealth: hero.stats.health,
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
            const ability = prev.activeAbilities.find(a => a.name === abilityName);
            if (!ability || ability.used) return prev; // Cannot use

            const definition = getAbilityDefinition(abilityName);
            if (!definition || !definition.onActivate) return prev; // No active effect defined

            const updates = definition.onActivate(prev, hero);
            if (!updates) return prev; // Activation decided no effect or invalid

            // Mark ability as used
            const newActiveAbilities = prev.activeAbilities.map(a =>
                a.name === abilityName ? { ...a, used: true } : a
            );

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
        heroRolls: number[];
        enemyRolls: number[];
    }

    const resolveSpeedRound = ({ heroRolls, enemyRolls }: SpeedRoundParams) => {
        if (!combat.enemy) return;

        const heroRoll = heroRolls.reduce((a, b) => a + b, 0);
        const enemyRoll = enemyRolls.reduce((a, b) => a + b, 0);

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
            phase: winner ? 'damage-roll' : 'round-end',
            winner,
            heroSpeedRolls: heroRolls,
            enemySpeedRolls: enemyRolls,
            logs: [...prev.logs, { round: prev.round, message, type: 'info' }]
        }));
    };

    // Phase 2: Damage Roll
    interface DamageRoundParams {
        damageRoll: number;
        rolls: number[];
    }

    const resolveDamageAndArmour = ({ damageRoll, rolls }: DamageRoundParams) => {
        if (!combat.enemy || !combat.winner) return;

        setCombat(prev => {
            if (!prev.enemy || !prev.winner) return prev;

            let logMsg = '';
            let newHeroHealth = prev.heroHealth;
            let newEnemyHealth = prev.enemy.health;
            let type: CombatLog['type'] = 'info';

            // Hook call for Acid and other damage modifiers
            let modifiersFromHooks = 0;
            let hookLogMsg = '';

            if (prev.winner === 'hero') {
                prev.activeAbilities.forEach(ability => {
                    const def = getAbilityDefinition(ability.name);
                    if (def && def.onDamageCalculate) {
                        const mod = def.onDamageCalculate(prev, hero, damageRoll, rolls);
                        if (mod !== 0) {
                            modifiersFromHooks += mod;
                            hookLogMsg += ` (+${mod} ${ability.name})`;
                        }
                    }
                });

                const modifier = Math.max(hero.stats.brawn, hero.stats.magic);
                const rawDamage = damageRoll + modifier + modifiersFromHooks;
                const actualDamage = Math.max(0, rawDamage - prev.enemy.armour);
                newEnemyHealth = Math.max(0, prev.enemy.health - actualDamage);

                logMsg = `Hero hits for ${rawDamage}${hookLogMsg} (Rolled ${damageRoll} + ${modifier}). Enemy armour absorbs ${prev.enemy.armour}. 💥 ${actualDamage} Damage!`;
                type = 'damage-enemy';
            } else {
                const modifier = Math.max(prev.enemy.brawn, prev.enemy.magic);
                const rawDamage = damageRoll + modifier;
                const actualDamage = Math.max(0, rawDamage - hero.stats.armour);
                newHeroHealth = Math.max(0, prev.heroHealth - actualDamage);

                logMsg = `Enemy hits for ${rawDamage} (Rolled ${damageRoll} + ${modifier}). Hero armour absorbs ${hero.stats.armour}. 💔 ${actualDamage} Damage taken!`;
                type = 'damage-hero';
            }

            // Apply end-of-round passives via hooks
            let passiveLogMsg = '';

            // Temporary state for hooks to see valid health
            let currentStateForHooks = {
                ...prev,
                heroHealth: newHeroHealth,
                enemy: { ...prev.enemy!, health: newEnemyHealth }
            } as CombatState;

            prev.activeAbilities.forEach(ability => {
                const def = getAbilityDefinition(ability.name);
                if (def && def.onRoundEnd) {
                    const updates = def.onRoundEnd(currentStateForHooks, hero);

                    if (updates.enemy) {
                        newEnemyHealth = updates.enemy.health;
                        currentStateForHooks.enemy = updates.enemy;
                    }
                    if (updates.heroHealth !== undefined) {
                        newHeroHealth = updates.heroHealth;
                        currentStateForHooks.heroHealth = newHeroHealth;
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
                heroHealth: newHeroHealth,
                enemy: { ...prev.enemy, health: newEnemyHealth },
                phase: nextPhase,
                damageRolls: rolls,
                logs
            };
        });
    };

    const nextRound = () => {
        setCombat(prev => {
            // Update modifiers (decrease duration, remove expired)
            // If just starting combat, don't decrement yet as the ability was just used
            const shouldDecrement = prev.phase !== 'combat-start';

            const activeModifiers = prev.modifiers
                .map(m => shouldDecrement ? { ...m, duration: m.duration - 1 } : m)
                .filter(m => m.duration > 0);

            return {
                ...prev,
                round: prev.round + 1,
                winner: null,
                heroSpeedRolls: undefined,
                enemySpeedRolls: undefined,
                damageRolls: undefined,
                phase: 'speed-roll',
                modifiers: activeModifiers,
                logs: [...prev.logs, { round: prev.round + 1, message: `Round ${prev.round + 1}`, type: 'info' }]
            };
        });
    };

    return {
        combat,
        startCombat,
        endCombat,
        nextRound,
        activateAbility,
        resolveSpeedRound,
        resolveDamageAndArmour,
        addLog
    };
}
