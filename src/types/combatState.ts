import { AbilityDefinition, getAbilityDefinition } from '../mechanics/abilityRegistry';
import { AbilityDescription } from './abilityDescription';
import { Character, Enemy, CharacterType, getOpponent } from './character';
import { CombatLog, getDamageType } from './combatLog';
import { DiceRoll, formatDice, sumDice } from './dice';
import { Effect, applyStatsModification, formatEffect } from './effect';
import { Hero, BackpackItem, EquipmentItem } from './hero';
import { Stats } from './stats';

export type CombatPhase = 'combat-start' | 'round-start' | 'speed-roll' | 'damage-roll' | 'apply-damage' | 'passive-damage' | 'round-end' | 'combat-end';

export const AttackSource = 'Attack';

export interface ActiveAbility {
    name: string;
    owner: CharacterType;
    def: AbilityDescription;
    uses?: number,
    // TODO: Needed?
    sources?: EquipmentItem[];
}

export interface Combatant<T extends Character = Character> {
    type: CharacterType;
    id: string; // Unique identifier in combat (e.g. 'hero', 'enemy-1')
    name: string;
    stats: Stats;
    // We retain a reference to the original character object for accessing static data/metadata
    original: T;
    // Maps from ability name to active (non-used) abilities in a combat.
    activeAbilities: Map<string, ActiveAbility>;
    /* Active effects, both buffs and debuffs */
    activeEffects: Effect[];
}

export interface DamageDescriptor {
    source: string;
    target: CharacterType;
    amount: number;
}

export interface AttackDamageDescriptor {
    damageRolls: DiceRoll[];
    modifiers: DamageDescriptor[];
}

export interface CombatState {
    enemy: Combatant<Enemy>;
    hero: Combatant<Hero>;

    round: number;
    phase: CombatPhase;
    logs: CombatLog[];

    // Available items in the backpack (hero.original.backpack will not be modified).
    backpack: BackpackItem[];

    /* 
     * Speed rolls of the hero and the enemy.
     * Always set beginning with the speed-roll phase.
     */
    heroSpeedRolls?: DiceRoll[];
    enemySpeedRolls?: DiceRoll[];

    /* 
     * Winner of the current speed round. 
     * Will be determined beginning with the speed-roll phase. 
     */
    winner?: CharacterType | null;

    /* 
     * Damage rolls of the winner of the round.
     * Will be set beginning with the damage-roll phase.
     */
    damage?: AttackDamageDescriptor;

    /* Damage dealt during the current round */
    damageDealt: DamageDescriptor[];

    /* Used to allow the user to select dice to be re-rolled */
    rerollState?: {
        source: string; // Ability name (e.g. 'Charm')
        target: 'hero-speed' | 'enemy-speed' | 'damage';
    };
}

export function forEachActiveAbility(state: CombatState, callback: (ability: AbilityDefinition, owner: CharacterType) => void) {
    [
        ...state.hero.activeAbilities.values(),
        ...state.enemy.activeAbilities.values()
    ].forEach(ability => {
        const def = getAbilityDefinition(ability.name);
        if (!def) return;
        callback(def, ability.owner);
    });
}

export function runOnDamageDealtHooks(state: CombatState, victim: CharacterType, source: string, amount: number): CombatState {
    forEachActiveAbility(state, (def, owner) => {
        if (def.onDamageDealt) {
            state = def.onDamageDealt(state, { owner, target: victim }, source, amount);
        }
    });
    return state;
}

function setStats(state: CombatState, target: CharacterType, stats: Partial<Stats>): CombatState {
    const char = getCombatant(state, target);
    const newChar = {
        ...char,
        stats: {
            ...char.stats,
            ...stats
        }
    };
    return updateCombatant(state, target, newChar);
}

function runOnDamageRollHooks(state: CombatState): CombatState {
    const looser = getOpponent(state.winner!);
    forEachActiveAbility(state, (def, owner) => {
        if (def.onDamageRoll && state.damage?.damageRolls) {
            state = def.onDamageRoll(state, { owner, target: looser });
        }
    });
    return state;
}

function runOnDamageCalculateHooks(state: CombatState,): CombatState {
    const victim = getOpponent(state.winner!);
    forEachActiveAbility(state, (def, owner) => {
        if (def.onDamageCalculate && state.damage?.damageRolls) {
            const mod = def.onDamageCalculate(state, { owner, target: victim });
            if (mod) {
                state.damage.modifiers.push({
                    amount: mod,
                    source: def.name,
                    target: victim
                });
                state = addLogs(state, {
                    message: `Added damage modifier ${mod} from ${def.name}`,
                });
            }
        }
    });
    return state;
}

export function setDamageRoll(state: CombatState, damageRolls: DiceRoll[]): CombatState {
    state = {
        ...state,
        phase: 'damage-roll',
        damage: {
            damageRolls,
            modifiers: [],
        }
    };
    state = addLogs(state, {
        message: `Damage rolled ${formatDice(state.damage!.damageRolls!)}=${sumDice(state.damage!.damageRolls!)}`,
    });
    state = runOnDamageRollHooks(state);
    state = runOnDamageCalculateHooks(state);
    return state;
}

export function dealDamage(state: CombatState, source: string, target: CharacterType, amount: number, message?: string): CombatState {
    const targetChar = getCombatant(state, target);
    if (!targetChar) return state;
    if (targetChar.stats.health <= 0) return state;
    const actualDamage = Math.min(amount, targetChar.stats.health);
    state = setStats(state, target, {
        health: targetChar.stats.health - actualDamage,
    });
    // Record damage dealt
    state = {
        ...state,
        damageDealt: [
            ...state.damageDealt,
            { target, source, amount: actualDamage }
        ]
    };
    state = addLogs(state, {
        message: message ?? `${source} dealt ${actualDamage} damage to ${targetChar.name}`,
        type: getDamageType(target)
    });
    state = runOnDamageDealtHooks(state, target, source, actualDamage);
    return state;
}

export function healDamage(state: CombatState, source: string, target: CharacterType, amount: number, message?: string): CombatState {
    const targetChar = getCombatant(state, target);
    if (!targetChar) return state;
    if (targetChar.stats.health === targetChar.stats.maxHealth) return state;
    const actualHealed = Math.min(amount, targetChar.stats.maxHealth - targetChar.stats.health);
    state = setStats(state, target, {
        health: targetChar.stats.health + actualHealed,
    });
    state = addLogs(state, {
        message: message ?? `${source} healed ${actualHealed} health to ${targetChar.name}`,
        type: getDamageType(target)
    });
    return state;
}

export function hasAbility(state: CombatState, target: CharacterType, name: string) {
    return getCombatant(state, target).activeAbilities.keys().some(e => e === name);
}

export function hasEffect(state: CombatState, target: CharacterType, source: string) {
    return getCombatant(state, target).activeEffects.some(e => e.source === source);
}

export function appendEffect(state: CombatState, target: CharacterType, effect: Effect) {
    const char = getCombatant(state, target);
    const newChar = {
        ...char,
        activeEffects: [
            ...char.activeEffects,
            effect,
        ]
    };
    state = updateCombatant(state, target, newChar);
    state = addLogs(state, {
        message: `${effect.source} applied effect ${formatEffect(effect)} to ${state[target].name}`,
    });
    return state;
}

export function applyEffect(state: CombatState, effect: Effect): CombatState {
    const target = effect.target;
    if (effect.duration === undefined || effect.duration > 0) {
        // Indefinite or limited effects are tracked by the effect system
        state = appendEffect(state, target, effect);
    } else if (effect.duration === 0) {
        // One-time effects are applied immediately. Mostly used for health restoration.
        const char = getCombatant(state, target);
        const newChar = {
            ...char,
            stats: applyStatsModification(char.stats, effect.stats)
        };
        state = updateCombatant(state, target, newChar);
        state = addLogs(state, {
            message: `${effect.source} applied effect ${formatEffect(effect)} to ${newChar.name}`,
        });
    }
    return state;
}

export function removeEffect(state: CombatState, target: CharacterType, source: string) {
    const char = getCombatant(state, target);
    const newChar = {
        ...char,
        activeEffects: char.activeEffects.filter(e => e.source !== source),
    };
    state = updateCombatant(state, target, newChar);
    state = addLogs(state, {
        message: `${source} removed from ${newChar.name}`,
    });
    return state;
}

export function skipDamagePhase(state: CombatState, message: string): CombatState {
    return {
        ...state,
        phase: 'passive-damage',
        damage: {
            damageRolls: [],
            modifiers: []
        },
        logs: addLogs(state.logs, { message, type: 'info' })
    };
}

export function addLogs(state: CombatState, ...logs: Partial<CombatLog>[]): CombatState;
export function addLogs(currentLogs: CombatLog[], ...logs: Partial<CombatLog>[]): CombatLog[];
export function addLogs(arg: CombatState | CombatLog[], ...logs: Partial<CombatLog>[]): CombatState | CombatLog[] {
    const fullLogs = logs
        .filter(l => l.message)
        .map(log => {
            const round = !Array.isArray(arg) ? arg.round : log.round!;
            const message = log.message!;
            const type = log.type ?? 'info';
            const fullLog = {
                ...log,
                round,
                message,
                type
            };
            console.log(`${fullLog.round}: ${fullLog.message}`);
            return fullLog;
        });
    if (Array.isArray(arg)) {
        return [...arg, ...fullLogs];
    }
    return { ...arg, logs: [...arg.logs, ...fullLogs] };
}

export function getCombatant(state: CombatState, type: CharacterType): Combatant {
    return type === 'hero' ? state.hero : state.enemy;
}

export function updateCombatant(state: CombatState, type: CharacterType, combatant: Combatant): CombatState {
    if (type === 'hero') {
        return {
            ...state,
            hero: combatant as Combatant<Hero>
        };
    } else {
        return {
            ...state,
            enemy: combatant as Combatant<Enemy>
        };
    }
}
