export interface Stats {
    speed: number;
    brawn: number;
    magic: number;
    armour: number;
    health: number;
    maxHealth: number;
    speedDice?: number; // Default 2
    damageDice?: number; // Default 1
    damageModifier?: number; // Flat bonus to damage
}

export interface StatsModification {
    stats: Partial<Stats>;
    source: string; // The name of the ability or item causing the modification
    target: 'hero' | 'enemy'; // Who the modification applies to
}
