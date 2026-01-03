import { Stats, StatsModification } from '../types/stats';

export function applyStatsModification(base: Stats, mod: Partial<Stats>): Stats {
    const newStats = { ...base };
    if (mod.speed !== undefined) newStats.speed += mod.speed;
    if (mod.brawn !== undefined) newStats.brawn += mod.brawn;
    if (mod.magic !== undefined) newStats.magic += mod.magic;
    if (mod.armour !== undefined) newStats.armour += mod.armour;
    if (mod.maxHealth !== undefined) newStats.maxHealth += mod.maxHealth;
    if (mod.health !== undefined) newStats.health = Math.min(newStats.maxHealth, newStats.health + mod.health);
    if (mod.speedDice !== undefined) newStats.speedDice = (newStats.speedDice ?? 2) + mod.speedDice;
    if (mod.damageDice !== undefined) newStats.damageDice = (newStats.damageDice ?? 1) + mod.damageDice;
    if (mod.damageModifier !== undefined) newStats.damageModifier = (newStats.damageModifier ?? 0) + mod.damageModifier;
    return newStats;
}

export function calculateEffectiveStats(base: Stats, modifications: StatsModification[]): Stats {
    return modifications.reduce((currentStats, mod) => {
        return applyStatsModification(currentStats, mod.stats);
    }, base);
}

export function calculateEffectiveStatsForType(base: Stats, modifications: StatsModification[], type: 'hero' | 'enemy'): Stats {
    return modifications.reduce((currentStats, mod) => {
        if (mod.target !== type) return currentStats;
        return applyStatsModification(currentStats, mod.stats);
    }, base);
}
