import { useState, useCallback } from 'react';
import { CombatState, Enemy, CombatLog, ActiveAbility } from '../types/combat';
import { Hero } from '../types/hero';
import { getAbilityDefinition } from '../mechanics/abilityDefinitions';

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
            const ability = prev.activeAbilities.find(a => a.name === abilityName);
            if (!ability || ability.used) return prev; // Cannot use

            const definition = getAbilityDefinition(abilityName);
            if (!definition || !definition.onActivate) return prev; // No active effect defined

            const updates = definition.onActivate(prev);
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

    const resolveDamageAndArmour = (rolls: Array<number>) => {
        if (!combat.enemy || !combat.winner || !combat.hero) return;

        setCombat(prev => {
            if (!prev.enemy || !prev.winner || !prev.hero) return prev;

            let logMsg = '';
            // We drive logic from these local vars, then apply to objects at the end or incrementally
            let currentHero = { ...prev.hero! }; // Shallow, but we'll update stats deeply if needed
            // Deep clone stats to be safe for mutations
            currentHero.stats = { ...currentHero.stats };

            let currentEnemy = { ...prev.enemy };

            let newHeroHealth = currentHero.stats.health;
            let newEnemyHealth = currentEnemy.health;
            let type: CombatLog['type'] = 'info';

            // Hook call for Acid and other damage modifiers
            let modifiersFromHooks = 0;
            let hookLogMsg = '';

            const rollTotal = rolls.reduce((a, b) => a + b, 0);
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

            // Temporary state for hooks to see valid health
            let currentStateForHooks = {
                ...prev,
                hero: currentHero,
                enemy: currentEnemy
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

    const handleReroll = (dieIndex: number) => {
        if (!combat.pendingInteraction) return;
        const def = getAbilityDefinition(combat.pendingInteraction.abilityName);
        if (!def || !def.onReroll) return;

        // Use current combat state
        const updates = def.onReroll(combat, dieIndex);

        // Apply updates
        setCombat(prev => ({ ...prev, ...updates, pendingInteraction: undefined }));

        // Re-resolve if needed - using the NEW rolls from updates
        if (updates.heroSpeedRolls && combat.enemySpeedRolls) {
            resolveSpeedRound({ heroRolls: updates.heroSpeedRolls, enemyRolls: combat.enemySpeedRolls });
        } else if (updates.damageRolls) {
            resolveDamageAndArmour(updates.damageRolls);
        }
    };

    const handleInteraction = (data: any) => {
        if (!combat.pendingInteraction) return;
        const def = getAbilityDefinition(combat.pendingInteraction.abilityName);
        if (!def || !def.onInteraction) return;

        setCombat(prev => {
            if (!def.onInteraction) return prev; // Type guard
            const updates = def.onInteraction(prev, data);
            const nextState = { ...prev, ...updates };

            // Re-resolve if rolls changed
            // We can't call resolve functions here as they set state.
            // But we can trigger immediate effects by returning a state that *looks* like it needs resolution?
            // No, easiest way is to apply roll updates, AND THEN invoke the logic.
            // But we are inside setCombat.

            // Solution: We update the state with new rolls.
            // THEN, we detect this change in an effect? Or just manually trigger the next step?
            // Since we can't chain state updates easily, we will do:
            // 1. Calculate new rolls.
            // 2. Return new state with new rolls AND cleared pendingInteraction.
            return nextState;
        });

        // After state update, we might need to re-resolve.
        // But we don't know the new rolls outside setCombat easily without race conditions.
        // Actually, onInteraction returns the updates. We can capture them!

        // Let's rely on the fact that we can call setCombat(updater).
        // But to re-resolve, we need the *result* of the update.

        // BETTER APPROACH for this hook:
        // Don't put handleInteraction inside setCombat.
        // Read current state (closure might be stale, but typically OK for click handlers).
        // OR better: use functional update to get state, compute updates, then decides what to do.

        // For now, let's just use the `combat` from state. It should be fresh enough for a click handler.
        const updates = def.onInteraction(combat, data);

        // Apply updates
        setCombat(prev => ({ ...prev, ...updates, pendingInteraction: undefined }));

        // Re-resolve if needed
        if (updates.heroSpeedRolls && combat.enemySpeedRolls) {
            resolveSpeedRound({ heroRolls: updates.heroSpeedRolls, enemyRolls: combat.enemySpeedRolls });
        } else if (updates.damageRolls) {
            resolveDamageAndArmour(updates.damageRolls);
        }
    };

    return {
        combat,
        startCombat,
        endCombat,
        nextRound,
        activateAbility,
        resolveSpeedRound,
        resolveDamageAndArmour,
        handleReroll,
        addLog
    };
}
