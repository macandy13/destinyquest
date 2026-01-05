import { CharacterType } from "./character";
import { Stats } from "./stats";

export interface Effect {
    stats: Partial<Stats>;
    source: string; // The name of the ability or item causing the modification
    target: CharacterType; // Who the modification applies to
    duration?: number; // undefined means infinite
    visible?: boolean; // If the effect should be presented to the user or if it is an internal states
}

export function formatEffect(effect: Effect): string {
    return Object.entries(effect.stats)
        .map(([stat, value]) => {
            if (!value) return null;
            const statEffect = (value > 0 ? `+${value}` : `${value}`) + ` ${stat}`;
            let effectDescription = '';
            switch (effect.duration) {
                case undefined:
                    effectDescription = statEffect + '/∞';
                    break;
                case 0:
                    effectDescription = statEffect;
                    break;
                default:
                    effectDescription = statEffect + `/${effect.duration}rd`;
            }
            if (!effect.visible) {
                effectDescription = `[${effectDescription}]`;
            }
            return effectDescription;
        })
        .filter(s => s !== null)
        .join(', ');
}

export function applyStatsModification(base: Stats, mod: Partial<Stats>): Stats {
    const newStats = { ...base };
    newStats.speed += mod.speed ?? 0;
    newStats.brawn += mod.brawn ?? 0;
    newStats.magic += mod.magic ?? 0;
    newStats.armour += mod.armour ?? 0;
    newStats.maxHealth += mod.maxHealth ?? 0;
    newStats.health = Math.min(newStats.maxHealth, newStats.health + (mod.health ?? 0));
    newStats.speedDice = (newStats.speedDice ?? 2) + (mod.speedDice ?? 0);
    newStats.damageDice = (newStats.damageDice ?? 1) + (mod.damageDice ?? 0);
    newStats.damageModifier = (newStats.damageModifier ?? 0) + (mod.damageModifier ?? 0);
    return newStats;
}

export function calculateEffectiveStats(base: Stats, modifications: Effect[]): Stats {
    return modifications.reduce((currentStats, mod) => {
        return applyStatsModification(currentStats, mod.stats);
    }, base);
}

export function calculateEffectiveStatsForType(base: Stats, modifications: Effect[], type: 'hero' | 'enemy'): Stats {
    return modifications.reduce((currentStats, mod) => {
        if (mod.target !== type) return currentStats;
        return applyStatsModification(currentStats, mod.stats);
    }, base);
}
