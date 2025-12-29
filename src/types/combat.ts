import { Hero, BackpackItem } from './hero';
import { StatsModification, Target } from './stats';
import { Character } from './character';
import { Combatant } from './combatant';

export interface Enemy extends Character {
    name: string;
    abilities: string[]; // Placeholder for special rules
    preventHealing?: boolean;
    entry?: string;
}


export interface CombatLog {
    round: number;
    message: string;
    type: 'info' | 'damage-hero' | 'damage-enemy' | 'win' | 'loss';
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
    target: Target;
    used: boolean;
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
    target: Target;
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
    heroSpeedRolls?: DiceRoll[];
    enemySpeedRolls?: DiceRoll[];
    winner: 'hero' | 'enemy' | null; // Winner of the current speed round
    damageRolls?: DiceRoll[];
    damageDealt: DamageDealtDescriptor[];
    activeAbilities: ActiveAbility[];
    activeEffects: Modification[];
    modifications: Modification[];
    backpack: BackpackItem[];
    logs: CombatLog[];
    additionalEnemyDamage?: AdditionalDamageDescriptor[];
    rerollState?: {
        source: string; // Ability name (e.g. 'Charm')
        target: 'hero-speed' | 'damage';
    };
}

export interface DiceRoll {
    value: number;
    isRerolled: boolean;
}
