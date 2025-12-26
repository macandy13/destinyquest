import { Stats, StatsModification } from '../types/stats';

export function applyStatsModification(base: Stats, modification: StatsModification): Stats {
    // If modification targets something else, ignore (though specific targeting should happen before calling this)
    // But this function just takes base stats and a modification. logic dictates it applies.

    const newStats = { ...base };
    const modStats = modification.stats;

    if (modStats.speed !== undefined) newStats.speed += modStats.speed;
    if (modStats.brawn !== undefined) newStats.brawn += modStats.brawn;
    if (modStats.magic !== undefined) newStats.magic += modStats.magic;
    if (modStats.armour !== undefined) newStats.armour += modStats.armour;
    if (modStats.health !== undefined) newStats.health += modStats.health;
    if (modStats.maxHealth !== undefined) newStats.maxHealth += modStats.maxHealth;

    // For dice, usually additions.
    if (modStats.speedDice !== undefined) newStats.speedDice = (newStats.speedDice ?? 2) + modStats.speedDice;
    if (modStats.damageDice !== undefined) newStats.damageDice = (newStats.damageDice ?? 1) + modStats.damageDice;
    if (modStats.damageModifier !== undefined) newStats.damageModifier = (newStats.damageModifier ?? 0) + modStats.damageModifier;

    return newStats;
}

export function calculateEffectiveStats(base: Stats, modifications: StatsModification[]): Stats {
    return modifications.reduce((currentStats, mod) => {
        return applyStatsModification(currentStats, mod);
    }, base);
}


export function calculateEffectiveStatsForType(base: Stats, modifications: StatsModification[], type: 'hero' | 'enemy'): Stats {
    return modifications.reduce((currentStats, mod) => {
        if (mod.target !== type) return currentStats;
        return applyStatsModification(currentStats, mod);
    }, base);
}
