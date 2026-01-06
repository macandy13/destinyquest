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

import { CombatState, Combatant, ActiveAbility, addLogs, applyEffect, forEachActiveAbility, dealDamage, AttackSource, setDamageRoll, getCombatant } from '../types/combatState';
import { sumDice, rollDice, formatDice, DiceRoll } from '../types/dice';
import { Hero, HeroStats, BackpackItem } from '../types/hero';
import { getAbilityDefinition } from './abilityRegistry';
import { calculateEffectiveStatsForType, Effect } from '../types/effect';
import { getOpponent, Enemy } from '../types/character';
import { Stats } from '../types/stats';
import './allAbilities'; // Ensure abilities are registered

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

function createHeroCombatant(character: Hero | Combatant<Hero>): Combatant<Hero> {
    const hero: Hero = 'original' in character ? character.original : character;
    const combatant: Combatant<Hero> = {
        type: hero.type,
        id: 'hero',
        name: hero.name,
        stats: { ...hero.stats },
        original: { ...hero },
        activeAbilities: new Map<string, ActiveAbility>(),
        activeEffects: []
    };
    Object.values(hero.equipment).forEach(item => {
        item?.abilities?.forEach(abilityName => {
            let ability = combatant.activeAbilities.get(abilityName);
            if (!ability) {
                const def = getAbilityDefinition(abilityName) ?? {
                    name: abilityName,
                    type: 'combat',
                    description: 'Unknown hero ability'
                };
                ability = {
                    name: abilityName,
                    owner: combatant.type,
                    def,
                    sources: [],
                    uses: ['speed', 'combat', 'modifier'].includes(def.type) ? 0 : undefined,
                };
                combatant.activeAbilities.set(abilityName, ability!);
            }
            switch (ability!.def.type) {
                case 'speed':
                case 'combat':
                case 'modifier':
                    ability!.uses! += 1;
                    break;
                case 'passive':
                case 'special':
                    break;
            }
            ability!.sources!.push(item);
        });
    });
    return combatant;
}

function createEnemyCombatant(character: Enemy | Combatant<Enemy>): Combatant<Enemy> {
    const enemy: Enemy = 'original' in character ? character.original : character;
    const combatant: Combatant<Enemy> = {
        type: enemy.type,
        id: 'enemy',
        name: enemy.name,
        stats: { ...enemy.stats },
        original: { ...enemy },
        activeAbilities: new Map<string, ActiveAbility>(),
        activeEffects: []
    };
    Object.values(enemy.abilities).forEach(abilityName => {
        combatant.activeAbilities.set(abilityName, {
            name: abilityName,
            owner: 'enemy',
            def: getAbilityDefinition(abilityName) ?? {
                name: abilityName,
                type: 'special',
                description: 'Unknown enemy ability'
            },
            uses: undefined,
            sources: []
        });
    });
    return combatant;
}

function printActiveAbilities(activeAbilities: Map<string, ActiveAbility>) {
    return Array.from(activeAbilities.values())
        .map(ability =>
            `${ability.name}` + ((ability.sources?.length ?? 0) > 1
                ? ` (${ability.sources?.length})`
                : ''))
        .join(', ');
}

/**
 * Calculates the current effective stats for both combatants, taking into account
 * all active modifications (buffs/debuffs) currently in the state.
 */
export function calculateEffectiveStats(state: CombatState): { hero: HeroStats, enemy: Stats } {
    const effectiveHeroStats = calculateEffectiveStatsForType(
        state.hero.stats,
        state.hero.activeEffects,
        'hero') as HeroStats;
    const effectiveEnemyStats = calculateEffectiveStatsForType(
        state.enemy.stats,
        state.enemy.activeEffects,
        'enemy');
    return { hero: effectiveHeroStats, enemy: effectiveEnemyStats };
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
    const nextState = { ...updates, rerollState: undefined };

    if (nextState.heroSpeedRolls && nextState.enemySpeedRolls) {
        return updateWinner(nextState);
    }
    return nextState;
}

function runCombatStartHook(state: CombatState): CombatState {
    forEachActiveAbility(state, (def, owner) => {
        if (def?.onCombatStart) {
            state = def.onCombatStart(state, { owner });
        }
    });
    return state;
}

export function startCombat(hero: Hero, enemy: Enemy): CombatState {
    let state: CombatState = {
        phase: 'combat-start',
        round: 0,
        hero: createHeroCombatant(hero),
        enemy: createEnemyCombatant(enemy),
        logs: [],
        backpack: hero.backpack.filter(i => i && (!i?.uses || i.uses > 0)) as BackpackItem[],
        damageDealt: [],
    };

    state = addLogs(state, {
        round: 0,
        message: 'Combat started',
        type: 'info'
    });
    state = runCombatStartHook(state);
    state = checkForCombatEnd(state);
    if (state.hero.activeAbilities.size > 0) {
        state = addLogs(state, {
            message: `Active hero abilities: ${printActiveAbilities(state.hero.activeAbilities)}`,
        });
    }
    if (state.enemy.activeAbilities.size > 0) {
        state = addLogs(state, {
            message: `Active enemy abilities: ${printActiveAbilities(state.enemy.activeAbilities)}`,
        });
    }
    return state;
}

export function startRound(state: CombatState): CombatState {
    state = {
        ...state,
        round: state.round + 1,
        phase: 'round-start',
        heroSpeedRolls: undefined,
        enemySpeedRolls: undefined,
        winner: undefined,
        damage: undefined,
        damageDealt: [],
        rerollState: undefined,
    };
    return addLogs(state, { message: 'Round started.', });
}

export function activateAbility(state: CombatState, abilityName: string): CombatState {
    const ability = state.hero.activeAbilities.get(abilityName);
    if (!ability || !ability.uses || ability.uses <= 0) return state;

    const definition = getAbilityDefinition(abilityName);
    if (!definition || !definition.onActivate) return state;

    state = definition.onActivate(state, { owner: ability.owner });
    if (ability.uses) ability.uses -= 1;
    if (!ability.uses || ability.uses === 0) {
        state.hero.activeAbilities.delete(abilityName);
    }
    return checkForCombatEnd(state);
}

function reduceBackpackItem(state: CombatState, idx: number): CombatState {
    const item = state.backpack[idx];
    if (item.uses !== undefined) {
        item.uses -= 1;
    }
    state = {
        ...state,
        backpack: state.backpack.filter(i => i?.uses && i.uses > 0)
    };
    state = addLogs(state, {
        message: `Used item ${item.name} (${item.description}).` + (item.uses !== undefined ? ` (${item.uses} uses left)` : ''),
    });
    return state;
}

export function useBackpackItem(state: CombatState, idx: number): CombatState {
    const item: BackpackItem | undefined = state.backpack[idx];
    if (!item) {
        state = addLogs(state, {
            message: `No item at index ${idx} found in backpack.`,
            type: 'warning'
        });
        return state;
    }
    state = applyEffect(state, item.effect);
    state = reduceBackpackItem(state, idx);
    return checkForCombatEnd(state);
}

function runOnSpeedRollHooks(state: CombatState): CombatState {
    forEachActiveAbility(state, (def, owner) => {
        if (def?.onSpeedRoll) {
            state = def.onSpeedRoll(state, { owner });
        }
    });
    return state;
}

function updateWinner(state: CombatState): CombatState {
    const heroRoll = sumDice(state.heroSpeedRolls || []);
    const enemyRoll = sumDice(state.enemySpeedRolls || []);

    const effectiveStats = calculateEffectiveStats(state);

    const heroTotal = heroRoll + effectiveStats.hero.speed;
    const enemyTotal = enemyRoll + effectiveStats.enemy.speed;
    let winner: 'hero' | 'enemy' | null | undefined;

    let modText = '';
    if (effectiveStats.hero.speed !== state.hero!.stats.speed) {
        const diff = effectiveStats.hero.speed - state.hero!.stats.speed;
        modText += diff > 0 ? ` (+${diff} mod)` : ` (${diff} mod)`;
    }
    let message = `Speed: Hero ${heroTotal}${modText} vs Enemy ${enemyTotal}.`;
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

    state = {
        ...state,
        winner,
    };
    state = addLogs(state, { message });
    return state;
}

export function rollForSpeed(state: CombatState, heroRolls?: DiceRoll[], enemyRolls?: DiceRoll[]): CombatState {
    const effectiveStats = calculateEffectiveStats(state);
    state = {
        ...state,
        phase: 'speed-roll',
        heroSpeedRolls: heroRolls ?? rollDice(effectiveStats.hero.speedDice ?? 2),
        enemySpeedRolls: enemyRolls ?? rollDice(effectiveStats.enemy.speedDice ?? 2)
    };
    state = addLogs(state, {
        message: `Hero rolled ${formatDice(state.heroSpeedRolls!)}=${sumDice(state.heroSpeedRolls!)}`,
    }, {
        message: `Enemy rolled ${formatDice(state.enemySpeedRolls!)}=${sumDice(state.enemySpeedRolls!)}`,
    });
    state = runOnSpeedRollHooks(state);
    state = updateWinner(state);
    return checkForCombatEnd(state);
}

export function rollForDamage(state: CombatState, damageRolls?: DiceRoll[]): CombatState {
    if (!state.winner) {
        // TODO: Handle error
        console.log('ERROR: No winner found in state');
        return state;
    }

    const effectiveStats = calculateEffectiveStats(state);
    const diceCount = effectiveStats[state.winner!].damageDice ?? 1;
    if (!damageRolls) {
        damageRolls = rollDice(diceCount);
    }
    // Do not respect changed stats.
    state = setDamageRoll(state, damageRolls);
    return checkForCombatEnd(state);
}

/**
 * Applies all collected damage to the victim after subtracting the armor.
 */
export function applyDamage(state: CombatState): CombatState {
    if (!state.damage) {
        // TODO: Handle errors
        console.log('ERROR: No damage found in state');
        return state;
    }

    state = { ...state, phase: 'apply-damage' };
    const effectiveStats = calculateEffectiveStats(state);
    const totalDiceValue = sumDice(state.damage!.damageRolls);
    const winnerType = state.winner!;
    const winnerStats = winnerType === 'hero' ? effectiveStats.hero : effectiveStats.enemy;

    const skill = Math.max(winnerStats.brawn, winnerStats.magic);
    const totalModifiersValue = state.damage!.modifiers.reduce((a, b) => a + b.amount, 0);
    const victim = getOpponent(winnerType);
    const victimStats = victim === 'hero' ? effectiveStats.hero : effectiveStats.enemy;
    const armor = victimStats.armour;
    const totalDamage = Math.max(0,
        totalDiceValue
        + skill
        + totalModifiersValue
        - armor);
    const victimChar = getCombatant(state, victim);
    const damageAmount = Math.min(victimChar.stats.health, totalDamage);
    state = dealDamage(
        state,
        AttackSource,
        victim,
        damageAmount,
        `Total attack damage to ${victim}: ${damageAmount} (${totalDiceValue} + ${skill} + ${totalModifiersValue} - ${armor})`);
    return checkForCombatEnd(state);
}

function runOnPassiveAbilityHooks(state: CombatState): CombatState {
    forEachActiveAbility(state, (def, owner) => {
        if (def.onPassiveAbility) {
            state = def.onPassiveAbility(state, { owner });
        }
    });
    return state;
}

/**
 * Applies all passive abilites.
 */
export function applyPassiveAbilities(state: CombatState): CombatState {
    state = { ...state, phase: 'passive-damage' };
    state = runOnPassiveAbilityHooks(state);
    state = addLogs(state, { message: 'Passive damage applied.' });
    return checkForCombatEnd(state);
}

/**
 * Transitions to 'round-end'.
 */
export function endRound(state: CombatState): CombatState {
    const updateEffects = (effects: Effect[]) => {
        return effects
            .map(e => e.duration !== undefined ? { ...e, duration: e.duration - 1 } : e)
            .filter(e => e.duration === undefined || e.duration > 0);
    };

    state = {
        ...state,
        phase: 'round-end',
        hero: {
            ...state.hero,
            activeEffects: updateEffects(state.hero.activeEffects)
        },
        enemy: {
            ...state.enemy,
            activeEffects: updateEffects(state.enemy.activeEffects)
        }
    };

    state = addLogs(state, { message: 'Round ended' });
    return state;
}

export function checkForCombatEnd(state: CombatState): CombatState {
    if (state.phase === 'combat-end') return state;
    if (state.hero.stats.health <= 0 || state.enemy.stats.health <= 0) {
        return endCombat(state);
    }
    return state;
}

/**
 * Transitions to 'combat-end'.
 */
export function endCombat(state: CombatState): CombatState {
    state = { ...state, phase: 'combat-end' };
    state = addLogs(state, { message: 'Combat ended' });
    state.hero.original.backpack = state.backpack;
    state.hero.original.backpack = state.hero.original.backpack.fill(null, state.backpack.length, 5);
    // TODO: Update hero health if auto-healing is disabled
    return state;
}

