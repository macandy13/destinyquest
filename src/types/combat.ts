export interface Enemy {
    name: string;
    speed: number;
    brawn: number;
    magic: number;
    armour: number;
    health: number;
    maxHealth: number;
    abilities: string[]; // Placeholder for special rules
}

export interface CombatLog {
    round: number;
    message: string;
    type: 'info' | 'damage-hero' | 'damage-enemy' | 'win' | 'loss';
}

export type CombatPhase = 'speed-roll' | 'damage-roll' | 'passive-damage' | 'round-end' | 'combat-end';

export interface CombatState {
    isActive: boolean;
    round: number;
    phase: CombatPhase;
    enemy: Enemy | null;
    heroHealth: number;
    winner: 'hero' | 'enemy' | null; // Winner of the current speed round
    heroSpeedRolls?: number[];
    enemySpeedRolls?: number[];
    damageRolls?: number[];
    logs: CombatLog[];
}
