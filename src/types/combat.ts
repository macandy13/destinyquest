import { Hero } from './hero';

export interface Enemy {
    name: string;
    speed: number;
    brawn: number;
    magic: number;
    armour: number;
    health: number;
    maxHealth: number;
    speedDice?: number; // Default 2
    damageDice?: number; // Default 1
    abilities: string[]; // Placeholder for special rules
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

export interface CombatState {
    round: number;
    phase: CombatPhase;
    enemy: Enemy | null;
    hero: Hero | null;
    heroSpeedRolls?: DiceRoll[];
    enemySpeedRolls?: DiceRoll[];
    winner: 'hero' | 'enemy' | null; // Winner of the current speed round
    damageRolls?: DiceRoll[];
    activeAbilities: ActiveAbility[];
    modifiers: CombatModifier[];
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
