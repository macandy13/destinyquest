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

import {
    CombatState,
    Combatant,
    ActiveAbility,
    addLogs,
    applyEffect,
    forEachActiveAbility,
    dealDamage,
    AttackSource,
    setDamageRoll,
    InteractionResponse,
    addAbility,
    requireAbilityDefinition,
    useAbility
} from '../types/combatState';
import { sumDice, rollDice, formatDice, DiceRoll } from '../types/dice';
import { Hero, HeroStats, BackpackItem } from '../types/hero';
import { getAbilityDefinition, toCanonicalName } from './abilityRegistry';
import { calculateEffectiveStatsForType, Effect } from '../types/effect';
import { getOpponent, Enemy, CharacterType } from '../types/character';
import { Stats } from '../types/stats';
import { resolveSpawns } from './enemyRegistry';
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
        item?.abilities?.forEach(rawAbilityName => {
            const def = requireAbilityDefinition(rawAbilityName);
            addAbility(combatant, def, item);
        });
    });
    return combatant;
}

function createEnemyCombatant(
    character: Enemy | Combatant<Enemy>,
    index: number = 0
): Combatant<Enemy> {
    const enemy: Enemy = 'original' in character ? character.original : character;
    const combatant: Combatant<Enemy> = {
        type: enemy.type,
        id: `enemy-${index}`,
        name: enemy.name,
        stats: { ...enemy.stats },
        original: { ...enemy },
        activeAbilities: new Map<string, ActiveAbility>(),
        activeEffects: []
    };
    Object.values(enemy.abilities).forEach(rawAbilityName => {
        const def = requireAbilityDefinition(rawAbilityName);
        addAbility(combatant, def);
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
export function calculateEffectiveStats(
    state: CombatState,
): { hero: HeroStats, enemy: Stats } {
    const enemy = state.enemies[state.activeEnemyIndex];
    const effectiveHeroStats = calculateEffectiveStatsForType(
        state.hero.stats,
        state.hero.activeEffects,
        'hero') as HeroStats;
    const effectiveEnemyStats = calculateEffectiveStatsForType(
        enemy.stats,
        enemy.activeEffects,
        'enemy');
    return { hero: effectiveHeroStats, enemy: effectiveEnemyStats };
}

function runCombatStartHook(state: CombatState): CombatState {
    forEachActiveAbility(state, (ability, def) => {
        if (def?.onCombatStart) {
            state = def.onCombatStart(state, { ability, owner: ability.owner });
        }
    });
    return state;
}

export function startCombat(hero: Hero, initialEnemies: Enemy[]): CombatState {
    const enemies = resolveSpawns(initialEnemies);
    const enemyCombatants = enemies.map((e, i) => createEnemyCombatant(e, i));
    let state: CombatState = {
        phase: 'combat-start',
        round: 0,
        hero: createHeroCombatant(hero),
        enemies: enemyCombatants,
        activeEnemyIndex: 0,
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
    // Log abilities for all enemies
    state.enemies.forEach((enemy, _idx) => {
        if (enemy.activeAbilities.size > 0) {
            state = addLogs(state, {
                message: `Active ${enemy.name} abilities: ${printActiveAbilities(enemy.activeAbilities)}`,
            });
        }
    });
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
        usedAbilities: [],
    };
    // Execute onRoundStart hooks
    forEachActiveAbility(state, (ability, def) => {
        if (def.onRoundStart) {
            state = def.onRoundStart(state, { ability, owner: ability.owner });
        }
    });
    return addLogs(state, { message: 'Round started.', });
}

export function activateAbility(state: CombatState, rawAbilityName: string): CombatState {
    const abilityName = toCanonicalName(rawAbilityName);
    const ability = state.hero.activeAbilities.get(abilityName);
    if (!ability || !ability.uses || ability.uses <= 0) return state;

    const definition = getAbilityDefinition(abilityName);
    if (!definition || !definition.onActivate) return state;

    // Check usage limits, some types can only be used once per round.
    // TODO: Look-up the rule for that again.
    if (['speed', 'combat'].includes(definition.type)) {
        const used = state.usedAbilities || [];
        if (used.some(a => a.type === definition.type)) {
            return state;
        }
    }

    state = definition.onActivate(state, { owner: ability.owner, ability });
    if (state.pendingInteraction) {
        return state;
    }

    state = useAbility(state, 'hero', abilityName);

    // Track usage
    if (['speed', 'combat'].includes(definition.type)) {
        state = {
            ...state,
            usedAbilities: [...(state.usedAbilities || []), { name: abilityName, type: definition.type }]
        };
    }

    return checkForCombatEnd(state);
}

export function resolveInteraction(state: CombatState, data: InteractionResponse[]): CombatState {
    if (!state.pendingInteraction) {
        console.error('No pending interaction to resolve');
        return state;
    }

    const { requests, ability, callback } = state.pendingInteraction;
    state = { ...state, pendingInteraction: undefined };
    state = callback(state, data);

    // Decrement uses via useAbility helper to ensure immutability
    // We assume the ability name in pendingInteraction matches the one in activeAbilities
    // Note: pendingInteraction.ability is a snapshot, so we use its name to look up and decrement the current state's version.
    if (ability.uses) {
        state = useAbility(state, ability.owner, ability.name);
    }

    // Track usage for interactions (as they were delayed activations)
    const definition = getAbilityDefinition(ability.name);
    if (definition && ['speed', 'combat'].includes(definition.type)) {
        state = {
            ...state,
            usedAbilities: [...(state.usedAbilities || []), { name: ability.name, type: definition.type }]
        };
    }

    if (requests.some(r => r.type === 'dice')) {
        if (state.phase === 'speed-roll') {
            state = updateWinner(state);
        } else if (state.phase === 'damage-roll') {
            state = setDamageRoll(state, state.damage?.damageRolls);
        }
    }
    return checkForCombatEnd(state);
}

export function cancelInteraction(state: CombatState): CombatState {
    return {
        ...state,
        pendingInteraction: undefined
    };
}

function reduceBackpackItem(state: CombatState, idx: number): CombatState {
    const originalItem = state.backpack[idx];
    // Clone item to avoid mutation
    const item = { ...originalItem };
    if (item.uses !== undefined) {
        item.uses -= 1;
    }

    // Create new backpack array with updated item
    const newBackpack = [...state.backpack];
    newBackpack[idx] = item;

    state = {
        ...state,
        // Filter out if uses are depleted (assumes logic: 0 uses = remove)
        backpack: newBackpack.filter(i => i && (i.uses === undefined || i.uses > 0))
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
    forEachActiveAbility(state, (ability, def) => {
        if (def.onBackpackItemUse) {
            state = def.onBackpackItemUse(state, { ability, owner: ability.owner }, item);
        }
    });
    if (state.phase === 'speed-roll') {
        state = updateWinner(state);
    }
    return checkForCombatEnd(state);
}

function runOnSpeedRollHooks(state: CombatState): CombatState {
    forEachActiveAbility(state, (ability, def) => {
        if (def?.onSpeedRoll) {
            state = def.onSpeedRoll(state, { ability, owner: ability.owner });
        }
    });
    return state;
}

function updateWinner(state: CombatState): CombatState {
    const heroRoll = sumDice(state.heroSpeedRolls || []);
    const enemyRoll = sumDice(state.enemySpeedRolls || []);

    const effectiveStats = calculateEffectiveStats(state);

    const heroTotal = Number(heroRoll) + Number(effectiveStats.hero.speed);
    const enemyTotal = Number(enemyRoll) + Number(effectiveStats.enemy.speed);
    let winner: 'hero' | 'enemy' | null | undefined;

    let modText = '';
    if (effectiveStats.hero.speed !== state.hero!.stats.speed) {
        const diff = effectiveStats.hero.speed - state.hero!.stats.speed;
        modText += diff > 0 ? ` (+${diff} mod)` : ` (${diff} mod)`;
    }
    let message = `Speed: Hero ${heroTotal}${modText} vs Enemy ${enemyTotal}.`;
    if (heroTotal > enemyTotal) {
        winner = 'hero';
        message += ' Hero wins speed round';
    } else if (enemyTotal > heroTotal) {
        winner = 'enemy';
        message += ' Enemy wins speed round';
    } else {
        winner = null;
        message += ' Draw. No damage this round';
    }

    state = {
        ...state,
        winner,
    };
    state = addLogs(state, { message });
    return state;
}

export interface PassivePreview {
    owner: CharacterType;
    abilityName: string;
    description: string;
    changes: {
        target: CharacterType;
        type: 'damage' | 'heal' | 'info';
        amount: number;
        message: string;
    }[];
}

export function getPassiveAbilityPreview(state: CombatState): { previews: PassivePreview[], finalState: CombatState } {
    const previews: PassivePreview[] = [];
    let tempState = state;

    forEachActiveAbility(state, (ability, def) => {
        if (def.onPassiveAbility) {
            const beforeState = tempState;
            tempState = def.onPassiveAbility(tempState, { ability, owner: ability.owner });

            if (tempState !== beforeState) {
                const changes: PassivePreview['changes'] = [];

                // Check health changes
                const heroHealthDiff = tempState.hero.stats.health - beforeState.hero.stats.health;
                if (heroHealthDiff !== 0) {
                    changes.push({
                        target: 'hero',
                        type: heroHealthDiff > 0 ? 'heal' : 'damage',
                        amount: Math.abs(heroHealthDiff),
                        message: `${heroHealthDiff > 0 ? 'Heals' : 'Deals'} ${Math.abs(heroHealthDiff)} damage to Hero`
                    });
                }

                // Check health changes for all enemies
                tempState.enemies.forEach((enemy, idx) => {
                    const beforeEnemy = beforeState.enemies[idx];
                    if (beforeEnemy) {
                        const enemyHealthDiff = enemy.stats.health - beforeEnemy.stats.health;
                        if (enemyHealthDiff !== 0) {
                            changes.push({
                                target: 'enemy',
                                type: enemyHealthDiff > 0 ? 'heal' : 'damage',
                                amount: Math.abs(enemyHealthDiff),
                                message: `${enemyHealthDiff > 0 ? 'Heals' : 'Deals'} ${Math.abs(enemyHealthDiff)} damage to ${beforeEnemy.name}`
                            });
                        }
                    }
                });

                // Check for new effects (simplified check)
                // We're iterating active abilities, so 'ability.owner' is the source.

                previews.push({
                    owner: ability.owner,
                    abilityName: ability.name,
                    description: ability.def.description,
                    changes
                });
            }
        }
    });

    return { previews, finalState: tempState };
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
 * Describes the components of the total damage calculation.
 */
export interface DamageBreakdown {
    diceTotal: number;
    skill: number;
    skillName: string;
    modifiers: { source: string; amount: number }[];
    modifiersTotal: number;
    armour: number;
    totalDamage: number;
}

/**
 * Calculates the breakdown of the damage that would be applied based on the current state.
 */
export function calculateDamageBreakdown(state: CombatState): DamageBreakdown | null {
    if (!state.damage || !state.winner) {
        return null;
    }

    const effectiveStats = calculateEffectiveStats(state);
    const totalDiceValue = sumDice(state.damage!.damageRolls);
    const winnerType = state.winner!;
    const winnerStats = winnerType === 'hero' ? effectiveStats.hero : effectiveStats.enemy;

    const useBrawn = winnerStats.brawn >= winnerStats.magic;
    const skill = useBrawn ? winnerStats.brawn : winnerStats.magic;
    const skillName = useBrawn ? 'brawn' : 'magic';

    const modifiers = state.damage!.modifiers;
    const totalModifiersValue = modifiers.reduce((a, b) => a + b.amount, 0);
    const victim = getOpponent(winnerType);
    const victimStats = victim === 'hero' ? effectiveStats.hero : effectiveStats.enemy;
    const armour = victimStats.armour;
    const totalDamage = Math.max(0,
        totalDiceValue
        + skill
        + totalModifiersValue
        - armour);

    return {
        diceTotal: totalDiceValue,
        skill,
        skillName,
        modifiers,
        modifiersTotal: totalModifiersValue,
        armour,
        totalDamage
    };
}

/**
 * Applies all collected damage to the victim after subtracting the armour.
 */
export function applyDamage(state: CombatState): CombatState {
    const breakdown = calculateDamageBreakdown(state);
    if (!breakdown) {
        // TODO: Handle errors
        console.log('ERROR: No damage found in state');
        return state;
    }

    state = { ...state, phase: 'apply-damage' };
    const winnerType = state.winner!;
    const victim = getOpponent(winnerType);
    state = dealDamage(
        state,
        AttackSource,
        victim,
        breakdown.totalDamage,
        `Total attack damage to ${victim}: ${breakdown.totalDamage} = ${breakdown.diceTotal} + ${breakdown.skill} + ${breakdown.modifiersTotal} - ${breakdown.armour}`
    );
    return checkForCombatEnd(state);
}

function runOnPassiveAbilityHooks(state: CombatState): CombatState {
    forEachActiveAbility(state, (ability, def) => {
        if (def.onPassiveAbility) {
            state = def.onPassiveAbility(state, { ability, owner: ability.owner });
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
        enemies: state.enemies.map(enemy => ({
            ...enemy,
            activeEffects: updateEffects(enemy.activeEffects)
        }))
    };

    state = addLogs(state, { message: 'Round ended' });
    return state;
}

export function checkForCombatEnd(state: CombatState): CombatState {
    if (state.phase === 'combat-end') return state;
    if (state.hero.stats.health <= 0) {
        return endCombat(state);
    }
    // Check if master enemy is dead (instant win)
    const masterDead = state.enemies.some(
        e => e.original.isMaster && e.stats.health <= 0
    );
    // Or all enemies are dead
    const allDead = !state.enemies.some(e => e.stats.health > 0);
    if (masterDead || allDead) {
        return endCombat(state);
    }
    return state;
}

function runOnCombatEndHooks(state: CombatState): CombatState {
    forEachActiveAbility(state, (ability, def) => {
        if (def.onCombatEnd) {
            state = def.onCombatEnd(state, { ability, owner: ability.owner });
        }
    });
    return state;
}

/**
 * Transitions to 'combat-end'.
 */
export function endCombat(state: CombatState): CombatState {
    state = { ...state, phase: 'combat-end' };
    state = runOnCombatEndHooks(state);
    if (state.phase !== 'combat-end') return state;
    state = addLogs(state, { message: 'Combat ended' });
    state.hero.original.backpack = state.backpack;
    state.hero.original.backpack = state.hero.original.backpack.fill(null, state.backpack.length, 5);
    // TODO: Update hero health if auto-healing is disabled
    return state;
}

