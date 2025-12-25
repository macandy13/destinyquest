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

export interface CombatState {
    isActive: boolean;
    round: number;
    enemy: Enemy | null;
    heroHealth: number;
    logs: CombatLog[];
}
