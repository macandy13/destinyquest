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

    /**
     * Internal State Helpers (Pure-ish)
     * These calculate the next state based on inputs, without setting state directly.
     */

    const _initCombat = (initialEnemy?: Enemy): CombatState => {
        const abilities: ActiveAbility[] = [];
        Object.values(hero.equipment).forEach(item => {
            if (item && item.abilities && item.abilities.length > 0) {
                item.abilities.forEach(abilityName => {
                    if (abilityName !== 'None') {
                        abilities.push({ name: abilityName, source: item.name, used: false });
                    }
                });
            }
        });

        const enemyToUse = initialEnemy || MOCK_ENEMY;

        return {
            round: 1,
            phase: 'combat-start',
            enemy: { ...enemyToUse },
            hero: { ...hero },
            winner: null,
            activeAbilities: abilities,
            modifiers: [],
            logs: [{ round: 1, message: 'Combat started', type: 'info' }]
        };
    };

    const _generateSpeedRolls = (state: CombatState) => {
        const heroDice = hero.stats.speedDice ?? 2;
        const speedDiceModifiers = state.modifiers
            .filter(m => m.type === 'speed-dice')
            .reduce((sum, m) => sum + m.value, 0);
        const totalHeroDice = Math.max(1, heroDice + speedDiceModifiers);
        const enemyDice = state.enemy?.speedDice ?? 2;

        return {
            ...state,
            phase: 'speed-roll' as const,
            heroSpeedRolls: rollDice(totalHeroDice),
            enemySpeedRolls: rollDice(enemyDice)
        };
    };

    const _calculateWinner = (state: CombatState): CombatState => {
        if (!state.enemy) return state;

        const heroRoll = sumDice(state.heroSpeedRolls || []);
        const enemyRoll = sumDice(state.enemySpeedRolls || []);

        const speedModifiers = state.modifiers
            .filter(m => m.type === 'speed-bonus')
            .reduce((sum, m) => sum + m.value, 0);

        const heroTotal = heroRoll + hero.stats.speed + speedModifiers;
        const enemyTotal = enemyRoll + state.enemy.speed;
        let winner: 'hero' | 'enemy' | null = null;

        let modText = speedModifiers > 0 ? ` (+${speedModifiers} mod)` : '';
        let message = `Speed: Hero ${heroTotal}${modText} vs Enemy ${enemyTotal}. `;

        if (heroTotal > enemyTotal) {
            winner = 'hero';
            message += 'Hero wins speed round';
        } else if (enemyTotal > heroTotal) {
            winner = 'enemy';
            message += 'Enemy wins speed round';
        } else {
            message += 'Draw. No damage this round';
        }

        return {
            ...state,
            winner,
            logs: [...state.logs, { round: state.round, message, type: 'info' }]
        };
    };

    const _generateDamageRolls = (state: CombatState): CombatState => {
        const diceCount = state.winner === 'hero'
            ? (state.hero?.stats.damageDice ?? 1)
            : (state.enemy?.damageDice ?? 1);
        const rolls = rollDice(diceCount);
        return {
            ...state,
            damageRolls: rolls,
            phase: 'damage-roll',
            logs: [...state.logs, { round: state.round, message: `Damage dice rolled ${rolls.join(' + ')} = ${sumDice(rolls)}`, type: 'info' }]
        };
    };

    const _processDamagePhase = (state: CombatState, rolls: DiceRoll[]): CombatState => {
        if (!state.enemy || !state.winner || !state.hero) return state;

        let logMsg = '';
        let currentHero = { ...state.hero };
        currentHero.stats = { ...currentHero.stats };
        let currentEnemy = { ...state.enemy };

        let newHeroHealth = currentHero.stats.health;
        let newEnemyHealth = currentEnemy.health;
        let type: CombatLog['type'] = 'info';

        // Hook call for Acid and other damage modifiers
        let modifiersFromHooks = 0;
        let hookLogMsg = '';

        const rollTotal = sumDice(rolls);
        if (state.winner === 'hero') {
            const skill = Math.max(hero.stats.brawn, hero.stats.magic);
            const damageModifiers = state.modifiers
                .filter(m => m.type === 'damage-bonus')
                .reduce((sum, m) => sum + m.value, 0);
            const rawDamage = rollTotal + skill + modifiersFromHooks + damageModifiers;

            state.activeAbilities.forEach(ability => {
                const def = getAbilityDefinition(ability.name);
                if (def && def.onDamageCalculate) {
                    const mod = def.onDamageCalculate(state, { total: rawDamage, rolls });
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
        let currentStateForHooks = {
            ...state,
            hero: currentHero,
            enemy: currentEnemy,
            phase: 'round-end'
        } as CombatState;

        state.activeAbilities.forEach(ability => {
            const def = getAbilityDefinition(ability.name);
            if (def && def.onRoundEnd) {
                const updates = def.onRoundEnd(currentStateForHooks);

                // Merge updates into our temporary tracking variables
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
                        if (l.round === state.round) passiveLogMsg += ' ' + l.message;
                    });
                }
            }
        });

        const isFinished = newHeroHealth <= 0 || newEnemyHealth <= 0;
        const nextPhase = isFinished ? 'combat-end' : 'round-end';

        const logs = [...state.logs, { round: state.round, message: logMsg + passiveLogMsg, type }];

        if (newHeroHealth <= 0) logs.push({ round: state.round, message: 'Hero Defeated!', type: 'loss' });
        if (newEnemyHealth <= 0) logs.push({ round: state.round, message: 'Enemy Defeated!', type: 'win' });

        return {
            ...state,
            hero: currentHero,
            enemy: currentEnemy,
            phase: nextPhase,
            damageRolls: rolls,
            logs
        };
    };

    const _activateAbility = (state: CombatState, abilityName: string) => {
        const ability = state.activeAbilities.find(a => a.name === abilityName && !a.used);
        if (!ability) return state;

        const definition = getAbilityDefinition(abilityName);
        if (!definition || !definition.onActivate) return state;

        const updates = definition.onActivate(state);
        if (!updates) return state;

        // Mark ability as used
        const abilityIndex = state.activeAbilities.indexOf(ability);
        const newActiveAbilities = [...state.activeAbilities];
        if (abilityIndex !== -1) {
            newActiveAbilities[abilityIndex] = { ...ability, used: true };
        }

        const nextState = {
            ...state,
            ...updates,
            activeAbilities: newActiveAbilities,
        };

        // If ability affects speed or rolls immediately, we might need to re-evaluate winner
        // But usually abilities are used in specific phases.
        // If we are in speed-roll phase and rolls exist, re-check winner?
        if (nextState.phase === 'speed-roll' && nextState.heroSpeedRolls && nextState.enemySpeedRolls) {
            return _calculateWinner(nextState);
        }
        return nextState;
    };

    const _startNewRound = (state: CombatState): CombatState => {
        // 1. Decrement modifiers
        const activeModifiers = state.modifiers
            .map(m => { return { ...m, duration: m.duration - 1 }; })
            .filter(m => m.duration > 0);

        // 2. Setup new round state
        return {
            ...state,
            round: state.round + 1,
            phase: 'speed-roll',
            modifiers: activeModifiers,
            rerollState: undefined,
            heroSpeedRolls: undefined,
            enemySpeedRolls: undefined,
            damageRolls: undefined,
            winner: null,
        };
    };

    /**
     * Exported Actions which trigger state updates
     */

    const startCombat = useCallback((initialEnemy?: Enemy) => {
        setCombat(_initCombat(initialEnemy));
    }, [hero]);

    const endCombat = () => {
        setCombat(prev => ({
            ...prev,
            phase: 'combat-end',
            logs: [...prev.logs, { round: prev.round, message: 'Combat ended.', type: 'info' }]
        }));
    };

    const activateAbility = (abilityName: string) => {
        setCombat(prev => {
            return _activateAbility(prev, abilityName);
        });
    };

    const generateSpeedRolls = () => {
        setCombat(prev => {
            return _calculateWinner(_generateSpeedRolls(prev));
        });
    };

    // For testing or manual injection if needed, but mostly internal consumption
    const resolveSpeedRolls = ({ heroRolls, enemyRolls }: { heroRolls: DiceRoll[], enemyRolls: DiceRoll[] }) => {
        setCombat(prev => {
            return _calculateWinner({
                ...prev,
                phase: 'speed-roll' as const,
                heroSpeedRolls: heroRolls,
                enemySpeedRolls: enemyRolls,
            });
        });
    };

    const commitSpeedResult = () => {
        setCombat(prev => {
            if (!prev.winner) {
                return {
                    ...prev,
                    phase: 'round-end',
                    logs: [...prev.logs, { round: prev.round, message: 'Speed round ended.', type: 'info' }]
                };
            }
            return _generateDamageRolls(prev);
        });
    };

    const generateDamageRolls = () => {
        // This acts as a re-roll or manual trigger for damage
        setCombat(prev => _generateDamageRolls(prev));
    };

    const resolveDamageRolls = (rolls: DiceRoll[]) => {
        setCombat(prev => ({
            ...prev,
            damageRolls: rolls,
            phase: 'damage-roll',
            logs: [...prev.logs, { round: prev.round, message: `Damage dice rolled ${rolls.join(' + ')} = ${sumDice(rolls)}`, type: 'info' }]
        }));
    };

    const commitDamageResult = () => {
        setCombat(prev => {
            if (!prev.damageRolls) return prev;
            return _processDamagePhase(prev, prev.damageRolls);
        });
    };

    const nextRound = () => {
        setCombat(prev => {
            return _calculateWinner(_generateSpeedRolls(_startNewRound(prev)));
        });
    };

    const handleReroll = (dieIndex: number) => {
        setCombat(prev => {
            if (!prev.rerollState) return prev;

            const def = getAbilityDefinition(prev.rerollState.source);
            if (!def || !def.onReroll) return prev;

            const updates = def.onReroll(prev, dieIndex);

            const nextState = { ...prev, ...updates, rerollState: undefined };

            // Recalculate winner if speed rolls changed
            if (updates.heroSpeedRolls && nextState.enemySpeedRolls) {
                return _calculateWinner(nextState);
            }
            return nextState;
        });
    };

    return {
        combat,
        startCombat,
        activateAbility,
        generateSpeedRolls,
        resolveSpeedRolls,
        commitSpeedResult,
        generateDamageRolls,
        resolveDamageRolls,
        commitDamageResult,
        handleReroll,
        nextRound,
        endCombat,
    };
}
