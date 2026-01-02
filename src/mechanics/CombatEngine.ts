/**
 * CombatEngine.ts
 * 
 * This file contains the pure domain logic for the combat system.
 * It is designed to be functional and side-effect free (mostly, barring Math.random within helpers).
 * 
 * Key Concepts:
 * - CombatState: The immutable state object representing the entire combat encounter.
 * - State Transitions: Functions like initCombat, activateAbility, nextRound take a State and return a new State.
 * - Ability Hooks: Abilities are registered in a registry and defined by hooks (onCombatStart, onSpeedRoll, etc.)
 *   that calculate modifiers or return partial state updates.
 * 
 * Flow:
 * 1. initCombat: Sets up the initial state, applies onCombatStart hooks.
 * 2. Speed Phase:
 *    - generateSpeedRolls / resolveSpeedRolls: Calculates speed, rolls dice.
 *    - commitSpeedResult: user confirms speed rolls, transitions to Damage Phase.
 * 3. Damage Phase:
 *    - resolveDamageRolls: Rolls damage dice.
 *    - commitDamageResult: Calculates total damage, applies hooks (onDamageCalculate), updates health.
 *    - resolveEndOfRoundDamage: Calculates total damage, applies hooks (onDamageCalculate), updates health.
 *    - Checks for win/loss conditions.
 * 4. nextRound: Resets for the next round, handling cooldowns and duration ticks.
 */

import { CombatState, Enemy, CombatLog, ActiveAbility, DiceRoll, dealDamage } from '../types/combat';
import { Combatant } from '../types/combatant';
import { sumDice, rollDice, rerollDice } from '../utils/dice';
import { Hero, HeroStats, BackpackItem } from '../types/hero';
import { getAbilityDefinition } from './abilityRegistry';
import { calculateEffectiveStatsForType } from '../utils/stats';
import { addLogs, getDamageType } from '../utils/statUtils';
import { CharacterType, Stats, getOpponent } from '../types/stats';
import './allAbilities'; // Ensure abilities are registered

export const INITIAL_STATE: CombatState = {
    round: 0,
    phase: 'combat-start',
    enemy: null,
    hero: null,
    winner: null,
    damageDealt: [],
    activeAbilities: [],
    activeEffects: [],
    modifications: [],
    backpack: [],
    logs: []
};

// Default easy enemy for testing or fallback
export const MOCK_ENEMY: Enemy = {
    name: 'Training Dummy',
    type: 'enemy',
    stats: {
        speed: 2,
        brawn: 2,
        magic: 0,
        armour: 0,
        health: 20,
        maxHealth: 20,
    },
    bookRef: { book: 'Tutorial', act: 0 },
    abilities: []
};

/**
 * Initializes a new combat session using the original stats of the hero and enemy.
 * Applies onCombatStart hooks.
 * @param heroInput The hero object (or combatant wrapper)
 * @param initialEnemy Optional enemy to fight. Defaults to MOCK_ENEMY.
 */
export function initCombat(hero: Hero | Combatant<Hero>, initialEnemy?: Enemy | Combatant<Enemy>): CombatState {
    let logs: CombatLog[] = addLogs([], {
        round: 1,
        message: 'Combat started',
        type: 'info'
    });

    const heroCombatant: Combatant<Hero> =
        'original' in hero ? hero : {
            type: 'hero',
            id: 'hero',
            name: hero.name,
            stats: { ...hero.stats },
            original: { ...hero }
        };

    const abilities: ActiveAbility[] = [];
    Object.values(heroCombatant.original.equipment).forEach(item => {
        if (!item) return;
        item.abilities?.forEach(abilityName => {
            abilities.push({
                name: abilityName,
                source: item.name,
                owner: 'hero',
                used: false,
                def: getAbilityDefinition(abilityName) ?? {
                    name: abilityName,
                    type: 'combat',
                    description: 'Unknown ability'
                },
            });
        });
    });
    if (abilities.length > 0) {
        logs = addLogs(logs, {
            round: 1,
            message: `Active hero abilities: ${abilities.map(a => a.name).join(', ')}`,
            type: 'info'
        });
    }

    initialEnemy = initialEnemy || MOCK_ENEMY;
    const enemyCombatant: Combatant<Enemy> =
        'original' in initialEnemy ? initialEnemy :
            {
                type: 'hero',
                id: 'hero',
                name: initialEnemy!.name,
                stats: { ...initialEnemy!.stats },
                original: { ...initialEnemy }
            };

    enemyCombatant.original.abilities.forEach(abilityName => {
        abilities.push({
            name: abilityName,
            source: 'Enemy Special Ability',
            owner: 'enemy',
            used: false,
            def: getAbilityDefinition(abilityName) ?? {
                name: abilityName,
                type: 'combat',
                description: 'Unknown ability'
            },
        });
    });
    if (abilities.filter(a => a.owner === 'enemy').length > 0) {
        logs = addLogs(logs, {
            round: 1,
            message: `Active enemy abilities: ${abilities.filter(a => a.owner === 'enemy').map(a => a.name).join(', ')}`,
            type: 'info'
        });
    }
    let state: CombatState = {
        ...INITIAL_STATE,
        enemy: enemyCombatant,
        hero: heroCombatant,
        activeAbilities: abilities,
        backpack: heroCombatant.original.backpack.filter(i => i?.uses && i.uses > 0) as BackpackItem[],
        logs,
    };

    state.activeAbilities.forEach(ability => {
        const def = getAbilityDefinition(ability.name);
        if (def?.onCombatStart) {
            const updates = def.onCombatStart(state, ability.owner);
            state = { ...state, ...updates };
        }
    });

    return { ...state, round: 1 };
}

function _dealDamage(state: CombatState, target: CharacterType, damage: number) {
    let newState = {
        ...state,
        ...dealDamage(state, 'Attack', target, damage)
    };
    newState.activeAbilities
        .forEach(ability => {
            if (ability.owner !== target) return;
            const def = getAbilityDefinition(ability.name);
            const updates = def?.onDamageDealt?.(state, ability.owner, target, damage);
            if (updates) {
                newState = { ...newState, ...updates };
            }
        });
    return newState;
}

/**
 * Applies damage to the losing combatant based on the winner's stats and damage roll.
 * Transitions phase to 'round-end'.
 */
export function applyDamageResult(state: CombatState): CombatState {
    if (!state.enemy || !state.winner || !state.hero || !state.damageRolls) return state;

    const rollTotal = sumDice(state.damageRolls);

    const effectiveStats = calculateEffectiveStats(state);
    const effectiveWinnerStats = effectiveStats[state.winner]!;
    const skill = Math.max(effectiveWinnerStats.brawn, effectiveWinnerStats.magic);
    const damageModifiers = effectiveWinnerStats.damageModifier ?? 0;
    const victimType = getOpponent(state.winner);
    const victim = state[victimType]!;
    const effectiveVictimStats = effectiveStats[victimType]!;
    let logs = state.logs;
    let modifiersFromHooks = 0;
    state.activeAbilities
        .forEach(ability => {
            const def = getAbilityDefinition(ability.name);
            const currentTotal = rollTotal + skill + modifiersFromHooks + damageModifiers;
            const mod = def?.onDamageCalculate?.(state, ability.owner, victimType, {
                total: currentTotal,
                rolls: state.damageRolls!
            });
            if (mod && mod !== 0) {
                modifiersFromHooks += mod;
                logs = addLogs(logs, {
                    round: state.round,
                    message: `Damage bonus: +${mod} ${ability.name}`,
                    type: getDamageType(state.winner!)
                });
            }
        });

    // Damage must never be able to heal, so limit it to 0.
    const totalDamage = Math.max(0, rollTotal + skill + modifiersFromHooks + damageModifiers);
    const actualDamage = Math.max(0, totalDamage - effectiveVictimStats.armour);
    const damageAmount = Math.min(victim.stats.health, actualDamage);
    logs = addLogs(logs, {
        round: state.round,
        message: `Total damage: ${damageAmount} = ${rollTotal} (${state.damageRolls!.length}d6) + ${skill} + ${modifiersFromHooks} + ${damageModifiers} - ${effectiveVictimStats.armour}`,
        type: getDamageType(state.winner!)
    });
    return _dealDamage({ ...state, logs }, victimType, damageAmount);
}

export function applyEndOfRoundDamage(state: CombatState): CombatState {
    if (!state.hero || !state.enemy) return state;

    state.activeAbilities.forEach(ability => {
        const def = getAbilityDefinition(ability.name);
        const updates = def?.onRoundEnd ? def.onRoundEnd(state, ability.owner) : {};
        state = {
            ...state, ...updates,
        };
    });

    let isFinished = state.hero.stats.health <= 0 || state.enemy.stats.health <= 0;
    if (state.hero!.stats.health <= 0) {
        state = {
            ...state,
            logs: addLogs(state.logs, {
                round: state.round,
                message: 'Hero Defeated!',
                type: 'loss'
            })
        };
        isFinished = true;
    }
    if (state.enemy!.stats.health <= 0) {
        state = {
            ...state,
            logs: addLogs(state.logs, {
                round: state.round,
                message: 'Enemy Defeated!',
                type: 'win'
            })
        };
        isFinished = true;
    }

    return {
        ...state,
        phase: isFinished ? 'combat-end' : 'round-end',
        logs: addLogs(state.logs, {
            round: state.round,
            message: `Round ended, Hero: ${state.hero!.stats.health}, Enemy: ${state.enemy!.stats.health}`, type: 'info'
        })
    };
}

/**
 * Starts a new round, resetting the state and applying duration ticks to modifications and active effects.
 */
export function startNewRound(state: CombatState): CombatState {
    const activeModifications = state.modifications
        .map(m => { return { ...m, duration: m.duration ? m.duration - 1 : undefined }; })
        .filter(m => m.duration === undefined || m.duration > 0);

    const activeEffects = (state.activeEffects || [])
        .map(e => ({ ...e, duration: e.duration ? e.duration - 1 : undefined }))
        .filter(e => e.duration === undefined || e.duration > 0);

    return {
        ...state,
        round: state.round + 1,
        phase: 'speed-roll',
        modifications: activeModifications,
        rerollState: undefined,
        heroSpeedRolls: undefined,
        enemySpeedRolls: undefined,
        damageRolls: undefined,
        additionalEnemyDamage: undefined,
        winner: null,
        damageDealt: [],
        activeEffects,
    };
}

/**
 * Calculates the current effective stats for both combatants, taking into account
 * all active modifications (buffs/debuffs) currently in the state.
 */
export function calculateEffectiveStats(state: CombatState): { hero: HeroStats, enemy: Stats } {
    if (!state.hero || !state.enemy) {
        // Fallback if accessed prematurely
        return {
            hero: (state.hero?.stats || {}) as HeroStats,
            enemy: (state.enemy?.stats || {}) as Stats
        }
    }
    const effectiveHeroStats = calculateEffectiveStatsForType(state.hero.stats, state.modifications.map(m => m.modification), 'hero') as HeroStats;
    const effectiveEnemyStats = calculateEffectiveStatsForType(state.enemy.stats, state.modifications.map(m => m.modification), 'enemy');
    return { hero: effectiveHeroStats, enemy: effectiveEnemyStats };
}

/**
 * Activates a specific ability by name.
 * Checks validity/usages, applies onActivate hooks, and updates the state.
 */
export function activateAbility(state: CombatState, abilityName: string): CombatState {
    const ability = state.activeAbilities.find(a => a.name === abilityName && !a.used);
    if (!ability) return state;

    const definition = getAbilityDefinition(abilityName);
    if (!definition || !definition.onActivate) return state;

    const updates = definition.onActivate(state, ability.owner);
    if (!updates) return state;

    const abilityIndex = state.activeAbilities.indexOf(ability);
    const newActiveAbilities = [...state.activeAbilities];
    if (abilityIndex !== -1) {
        newActiveAbilities[abilityIndex] = { ...ability, used: true };
    }

    const newState = {
        ...state,
        ...updates,
        activeAbilities: newActiveAbilities,
    };

    // Any automatic dice-rerolling should be done now.
    const effectiveStats = calculateEffectiveStats(newState);
    if (newState.phase === 'speed-roll') {
        let diceWereRerolled = false;
        if (newState.hero!.stats.speed !== effectiveStats.hero.speed) {
            newState.heroSpeedRolls = rerollDice(
                newState.heroSpeedRolls || [], effectiveStats.hero.speed);
            diceWereRerolled = true;
        }
        if (newState.enemy!.stats.speed !== effectiveStats.enemy.speed) {
            newState.enemySpeedRolls = rerollDice(
                newState.enemySpeedRolls || [], effectiveStats.enemy.speed);
            diceWereRerolled = true;
        }
        if (newState.heroSpeedRolls && newState.enemySpeedRolls && diceWereRerolled) {
            return setSpeedRolls(newState, newState.heroSpeedRolls, newState.enemySpeedRolls);
        }
    }
    if (newState.phase === 'damage-roll' && newState.winner) {
        if (newState[newState.winner]!.stats.damageDice !== effectiveStats[newState.winner].damageDice) {
            newState.damageRolls = rerollDice(
                newState.damageRolls || [], effectiveStats[newState.winner].damageDice ?? 0);
            return setDamageRolls(newState, newState.damageRolls);
        }
    }
    return newState;
}

/**
 * Uses a backpack item.
 * Applies immediate effects (healing, buffs) and decrements item usage count.
 */
export function useBackpackItem(state: CombatState, index: number): CombatState {
    if (!state.hero) return state;

    const item = state.hero.original.backpack[index];
    if (!item) return state;

    let newState = { ...state };
    let logMessage = `Used ${item.name}: `;

    if (item.stats?.health) {
        const oldHealth = newState.hero!.stats.health;
        const newHealth = Math.min(newState.hero!.stats.maxHealth, oldHealth + item.stats.health);
        newState.hero = {
            ...newState.hero!,
            stats: { ...newState.hero!.stats, health: newHealth }
        };
        logMessage += `Healed ${newHealth - oldHealth} HP. `;
    }

    if (item.duration !== undefined && item.duration >= 1 && item.stats) {
        newState.modifications = [
            ...newState.modifications,
            {
                modification: {
                    source: item.name,
                    target: 'hero',
                    stats: item.stats || {}
                }, duration: item.duration, id: `backpack-${item.id}-${state.round}`
            }
        ];
        logMessage += `${item.effect || item.modifier}. `;
    }

    const newBackpack = [...newState.hero!.original.backpack];
    if (item.uses !== undefined) {
        newBackpack[index] = {
            ...item,
            uses: item.uses - 1
        };
        if (newBackpack[index].uses === 0) {
            newBackpack[index] = null;
        }
    }
    newState.hero!.original.backpack = newBackpack;
    newState.backpack = newBackpack.filter(i => i?.uses && i.uses > 0) as BackpackItem[];

    newState.logs = [...newState.logs, { round: newState.round, message: logMessage, type: 'info' }];
    return newState;
}

/**
 * Resolves speed rolls with provided values (useful for tests or specific overrides).
 * Transitions phase to 'speed-roll'.
 */
function _resolveSpeedRolls(state: CombatState): CombatState {
    state.activeAbilities.forEach(ability => {
        const def = getAbilityDefinition(ability.name);
        if (def?.onSpeedRoll) {
            if (ability.owner == 'hero' && state.heroSpeedRolls) {
                const updates = def.onSpeedRoll(state, 'hero', state.heroSpeedRolls);
                state = { ...state, ...updates };
            }
            if (ability.owner == 'enemy' && state.enemySpeedRolls) {
                const updates = def.onSpeedRoll(state, 'enemy', state.enemySpeedRolls);
                state = { ...state, ...updates };
            }
        }
    });

    return applySpeedResult(state);
}
/**
 * Generates initial random speed rolls for both combatants and calculates the winner.
 * Transitions phase to 'speed-roll'.
 */
export function generateSpeedRolls(state: CombatState): CombatState {
    const { hero, enemy } = calculateEffectiveStats(state);

    const totalHeroDice = Math.max(1, hero.speedDice ?? 2);
    const enemyDice = enemy.speedDice ?? 2;

    let newState: CombatState = {
        ...state,
        phase: 'speed-roll' as const,
        heroSpeedRolls: rollDice(totalHeroDice),
        enemySpeedRolls: rollDice(enemyDice)
    };

    return _resolveSpeedRolls(newState);
}

/**
 * Generates initial random speed rolls for both combatants and calculates the winner.
 * Transitions phase to 'speed-roll'.
 */
export function setSpeedRolls(state: CombatState, heroRolls: DiceRoll[], enemyRolls: DiceRoll[]): CombatState {
    return _resolveSpeedRolls({
        ...state,
        phase: 'speed-roll',
        heroSpeedRolls: heroRolls,
        enemySpeedRolls: enemyRolls,
        logs: addLogs(state.logs, {
            round: state.round,
            message: `Hero speed dice set to ${heroRolls.map(r => r.value).join(' + ')} = ${sumDice(heroRolls)}`,
            type: 'info'
        }, {
            round: state.round,
            message: `Enemy speed dice set to ${enemyRolls.map(r => r.value).join(' + ')} = ${sumDice(enemyRolls)}`,
            type: 'info'
        })
    });
}

export function applySpeedResult(state: CombatState): CombatState {
    if (!state.enemy || !state.hero) return state;

    const heroRoll = sumDice(state.heroSpeedRolls || []);
    const enemyRoll = sumDice(state.enemySpeedRolls || []);

    const { hero: effectiveHeroStats, enemy: effectiveEnemyStats } = calculateEffectiveStats(state);

    const heroTotal = heroRoll + effectiveHeroStats.speed;
    const enemyTotal = enemyRoll + effectiveEnemyStats.speed;
    let winner: 'hero' | 'enemy' | null | undefined;

    let modText = '';
    if (effectiveHeroStats.speed !== state.hero.stats.speed) {
        const diff = effectiveHeroStats.speed - state.hero.stats.speed;
        modText += diff > 0 ? ` (+${diff} mod)` : ` (${diff} mod)`;
    }
    let message = `Speed: Hero ${heroTotal}${modText} vs Enemy ${enemyTotal}. `;

    if (heroTotal > enemyTotal) {
        winner = 'hero';
        message += 'Hero wins speed round';
    } else if (enemyTotal > heroTotal) {
        winner = 'enemy';
        message += 'Enemy wins speed round';
    } else {
        winner = null;
        message += 'Draw. No damage this round';
    }

    return {
        ...state,
        winner,
        logs: addLogs(state.logs, {
            round: state.round,
            message,
            type: 'info' as const
        })
    };
}

/**
 * Commits the current speed results, effectively ending the speed phase.
 * If a winner is decided, transitions to 'damage-roll' and automatically rolls damage dice.
 * If a draw, transitions to 'round-end'.
 */
export function commitSpeedResult(state: CombatState): CombatState {
    if (state.winner === undefined) {
        state = applySpeedResult(state);
    }
    if (state.winner === null) {
        return {
            ...state,
            phase: 'round-end',
            logs: addLogs(state.logs, {
                round: state.round,
                message: 'Speed round ended.',
                type: 'info'
            })
        };
    }
    return {
        ...state,
        phase: 'damage-roll',
    };
}

export function generateDamageRolls(state: CombatState): CombatState {
    const { hero: effectiveHeroStats, enemy: effectiveEnemyStats } = calculateEffectiveStats(state);

    const diceCount = state.winner === 'hero'
        ? (effectiveHeroStats.damageDice ?? 1)
        : (effectiveEnemyStats?.damageDice ?? 1);
    const rolls = rollDice(diceCount);
    return setDamageRolls(state, rolls);
}

/**
 * Resolves damage rolls with provided values.
 * Transitions phase to 'damage-roll'.
 */
export function setDamageRolls(state: CombatState, rolls: DiceRoll[]): CombatState {
    if (!state.winner) return state;

    state = {
        ...state,
        damageRolls: rolls,
        phase: 'damage-roll',
        logs: addLogs(state.logs, {
            round: state.round,
            message: `Damage dice set to ${rolls.map(r => r.value).join(' + ')} = ${sumDice(rolls)}`,
            type: 'info'
        })
    };

    const loser = getOpponent(state.winner!);
    state.activeAbilities.forEach(ability => {
        const def = getAbilityDefinition(ability.name);
        if (def?.onDamageRoll && ability.owner === state.winner) {
            const updates = def.onDamageRoll(state, loser, state.damageRolls!);
            state = { ...state, ...updates };
        }
    });
    return state;
}

/**
 * Commits damage results, applying damage calculations, armour, and ability hooks (onDamageCalculate).
 * Updates health and checks for defeat.
 * Transitions to 'round-end' or 'combat-end'.
 */
export function commitDamageResult(state: CombatState): CombatState {
    if (!state.damageRolls) return state;
    return { ...applyDamageResult(state), phase: 'round-end' };
}


/**
 * Commits damage results, applying damage calculations, armour, and ability hooks (onDamageCalculate).
 * Updates health and checks for defeat.
 * Transitions to 'round-end' or 'combat-end'.
 */
export function endRound(state: CombatState): CombatState {
    return applyEndOfRoundDamage(state);
}

/**
 * Advances the combat to the next round.
 * Decrements temporary modification durations.
 * Resets per-round flags.
 * Automatically generates new speed rolls for the new round.
 */
export function nextRound(state: CombatState): CombatState {
    return startNewRound(state);
}

/**
 * Handles reroll logic for a specific die.
 * Requires `state.rerollState` to be set (usually by an ability's onActivate).
 * Calls the ability's `onReroll` hook to get the new roll value.
 */
export function handleReroll(state: CombatState, dieIndex: number): CombatState {
    if (!state.rerollState) return state;

    const def = getAbilityDefinition(state.rerollState.source);
    if (!def || !def.onReroll) return state;

    const updates = def.onReroll(state, dieIndex);

    const nextState = { ...state, ...updates, rerollState: undefined };

    if (updates.heroSpeedRolls && nextState.enemySpeedRolls) {
        return applySpeedResult(nextState);
    }
    return nextState;
}

/**
 * Explicitly ends the combat session.
 */
export function endCombat(state: CombatState): CombatState {
    return {
        ...state,
        phase: 'combat-end',
        logs: addLogs(state.logs, { round: state.round, message: 'Combat ended.', type: 'info' })
    };
}

