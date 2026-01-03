import { Hero, BackpackItem } from './hero';
import { StatsModification, CharacterType } from './stats';
import { Character } from './character';
import { Combatant } from './combatant';
import { BookRef } from './book';
import { addLogs, getDamageType } from '../utils/statUtils';
import { applyStatsModification } from '../utils/stats';

export interface Enemy extends Character {
    name: string;
    abilities: string[]; // Placeholder for special rules
    preventHealing?: boolean;
    bookRef: BookRef;
}

export type CombatLogType = 'info' | 'damage-hero' | 'damage-enemy' | 'win' | 'loss' | 'warning';

export interface CombatLog {
    round: number;
    message: string;
    type: CombatLogType;
}

export type AbilityType = 'speed' | 'combat' | 'modifier' | 'passive';

export interface AbilityDefinition {
    name: string;
    type: AbilityType;
    description: string;
}

export interface ActiveAbility {
    name: string;
    source: string; // Item name
    owner: CharacterType;
    used: boolean;
    def: AbilityDefinition;
}

export interface CombatModifier {
    name: string;
    source: string;
    type: 'speed-bonus' | 'speed-dice' | 'damage-bonus' | 'armour-bonus'; // Add more as needed
    value: number;
    duration: number; // rounds remaining
}

export type CombatPhase = 'combat-start' | 'speed-roll' | 'damage-roll' | 'passive-damage' | 'round-end' | 'combat-end';

export interface AdditionalDamageDescriptor {
    type: 'damage-hero' | 'damage-enemy';
    amount: number;
    source: string;
}

export interface DamageDealtDescriptor {
    target: CharacterType;
    amount: number;
    source: string;
}

export interface Modification {
    id: string;
    modification: StatsModification;
    duration?: number; // undefined means infinite
}

export interface CombatState {
    round: number;
    phase: CombatPhase;
    enemy: Combatant<Enemy> | null;
    hero: Combatant<Hero> | null;

    /* Speed rolls of the hero and the enemy */
    heroSpeedRolls?: DiceRoll[];
    enemySpeedRolls?: DiceRoll[];

    /* Winner of the current speed round */
    winner?: CharacterType | null;

    /* Damage rolls of the winner of the round */
    damageRolls?: DiceRoll[];

    /* Damage dealt during the current round */
    damageDealt: DamageDealtDescriptor[];

    /* All active abilities, both targeting hero and enemey */
    activeAbilities: ActiveAbility[];

    /* Active effects, both buffs and debuffs */
    activeEffects: Modification[];

    /* Permanent modifications */
    modifications: Modification[];

    /* Backpack of the hero */
    backpack: BackpackItem[];

    /* Full logs of the combat, tracks all changes to the health of the combatants */
    logs: CombatLog[];

    /* 
    * Additional damage reported at the end of the round. 
    * Only used for displaying additioal information at the end of the round. 
    */
    additionalEnemyDamage?: AdditionalDamageDescriptor[];

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
        damageDealt: [
            ...state.damageDealt,
            {
                target: target,
                amount: amount,
                source: source
            }],
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
        activeAbilities: appendArray(state.activeAbilities, updates.activeAbilities),
        activeEffects: appendArray(state.activeEffects, updates.activeEffects),
        modifications: appendArray(state.modifications, updates.modifications),
        backpack: updates.backpack ?? state.backpack,
        logs: appendArray(state.logs, updates.logs),
        additionalEnemyDamage: appendArray(state.additionalEnemyDamage, updates.additionalEnemyDamage),
        rerollState: updates.rerollState ?? state.rerollState,
    };
}
