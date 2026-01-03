import { Hero, BackpackItem, EquipmentItem } from './hero';
import { CharacterType, Stats } from './stats';
import { Character, Modification } from './character';
import { BookRef } from './book';
import { addLogs, getDamageType } from '../utils/statUtils';
import { applyStatsModification } from '../utils/stats';

export interface Enemy extends Character {
    name: string;
    abilities: string[];
    preventHealing?: boolean;
    bookRef: BookRef;
}

export type CombatLogType = 'info' | 'warning' | 'damage-hero' | 'damage-enemy' | 'win' | 'loss';

export interface CombatLog {
    round: number;
    message: string;
    type: CombatLogType;
}

export type AbilityType = 'speed' | 'combat' | 'modifier' | 'passive' | 'special';

export interface AbilityDefinition {
    name: string;
    type: AbilityType;
    description: string;
}

export interface ActiveAbility {
    name: string;
    owner: CharacterType;
    def: AbilityDefinition;
    uses?: number,
    // TODO: Needed?
    sources?: EquipmentItem[];
}

export type CombatPhase = 'combat-start' | 'round-start' | 'speed-roll' | 'damage-roll' | 'apply-damage' | 'passive-damage' | 'round-end' | 'combat-end';

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
    activeEffects: Modification[];
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
    bonusDamage: DamageDescriptor[];

    /* Used to allow the user to select dice to be re-rolled */
    rerollState?: {
        source: string; // Ability name (e.g. 'Charm')
        target: 'hero-speed' | 'damage';
    };
}

export interface DiceRoll {
    value: number;
    isRerolled: boolean;
}

export function dealDamage(state: CombatState, source: string, target: CharacterType, amount: number): Partial<CombatState> {
    const targetChar = state[target];
    if (!targetChar) return {};
    if (targetChar.stats.health <= 0) return {};
    const actualDamage = Math.min(amount, targetChar.stats.health);
    return {
        [target]: {
            ...targetChar, stats: {
                ...targetChar.stats,
                health: Math.max(0, targetChar.stats.health - actualDamage)
            }
        },
        logs: addLogs(state.logs, {
            round: state.round,
            message: `${source} dealt ${actualDamage} damage to ${targetChar.name}`,
            type: getDamageType(target)
        })
    };
}

export function healDamage(state: CombatState, source: string, target: CharacterType, amount: number): Partial<CombatState> {
    const targetChar = state[target];
    if (!targetChar) return {};
    if (targetChar.stats.health === targetChar.stats.maxHealth) return {};
    const actualHealed = Math.min(amount, targetChar.stats.maxHealth - targetChar.stats.health);
    return {
        [target]: {
            ...targetChar, stats: {
                ...targetChar.stats,
                health: Math.min(targetChar.stats.maxHealth, targetChar.stats.health + actualHealed)
            }
        },
        logs: addLogs(state.logs, {
            round: state.round,
            message: `${source} healed ${actualHealed} health to ${targetChar.name}`,
            // TODO: Add a heal type
            type: 'info'
        })
    };
}

function appendArray<T>(array: T[], updates: T[] | undefined): T[];
function appendArray<T>(array: T[] | undefined, updates: T[] | undefined): T[] | undefined;
function appendArray<T>(array: T[] | undefined, updates: T[] | undefined): T[] | undefined {
    if (!array && !updates) return undefined;
    return [...(array ?? []), ...(updates ?? [])];
}

export function applyUpdates(state: CombatState, updates: Partial<CombatState>): CombatState {
    return {
        round: updates.round ?? state.round,
        phase: updates.phase ?? state.phase,
        hero: updates.hero ? {
            ...state.hero!,
            stats: applyStatsModification(state.hero!.stats, updates.hero.stats)
        } : state.hero!,
        enemy: updates.enemy ? {
            ...state.enemy!,
            stats: applyStatsModification(state.enemy!.stats, updates.enemy.stats)
        } : state.enemy,
        heroSpeedRolls: appendArray(state.heroSpeedRolls, updates.heroSpeedRolls),
        enemySpeedRolls: appendArray(state.enemySpeedRolls, updates.enemySpeedRolls),
        winner: updates.winner ?? state.winner,
        damageRolls: updates.damageRolls ?? state.damageRolls,
        damageDealt: appendArray(state.damageDealt, updates.damageDealt),
        backpack: updates.backpack ?? state.backpack,
        logs: appendArray(state.logs, updates.logs),
        pendingDamage: updates.pendingDamage ?? state.pendingDamage,
        rerollState: updates.rerollState ?? state.rerollState,
    };
}

export function appendEffect(state: CombatState, target: CharacterType, effect: Modification) {
    return {
        ...state,
        [target]: {
            ...state[target],
            activeEffects: [...state[target].activeEffects, effect],
        },
    };
}

export function hasEffect(state: CombatState, target: CharacterType, source: string) {
    return state[target].activeEffects.some(e => e.modification.source === source);
}

export function appendBonusDamage(state: CombatState, damage: DamageDescriptor) {
    return {
        ...state,
        bonusDamage: [...state.bonusDamage, damage],
    };
}
