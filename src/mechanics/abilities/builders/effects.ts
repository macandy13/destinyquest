import {
    appendEffect,
    CombatState,
    dealDamage as dealDamageState,
    healDamage,
    addLogs,
    getCombatant,
} from '../../../types/combatState';
import { CharacterType, getOpponent } from '../../../types/character';
import { Stats } from '../../../types/stats';

export type TargetType =
    | 'hero'
    | 'enemy'
    | 'owner'
    | 'opponent';

/**
 * Resolves a TargetType to a concrete CharacterType given
 * the ability owner in the current state.
 */
export function resolveEffectTarget(
    _state: CombatState,
    owner: CharacterType,
    target: TargetType,
): CharacterType {
    switch (target) {
        case 'hero': return 'hero';
        case 'enemy': return 'enemy';
        case 'owner': return owner;
        case 'opponent': return getOpponent(owner);
    }
}

/**
 * An Effect is a function that transforms combat state.
 * It is produced by effect creators and passed to defineAbility.
 *
 * @param state       Current combat state.
 * @param source      Name of the ability triggering this effect.
 * @param owner       The character that owns the ability.
 * @param damageDealt When fired from an onDamageDealt hook,
 *                    the amount of damage already applied.
 */
export type Effect = (
    state: CombatState,
    source: string,
    owner: CharacterType,
    damageDealt?: number,
) => CombatState;

/** Deals a fixed amount of damage to the resolved target. */
export function dealDamage(
    amount: number,
    target: TargetType,
): Effect {
    return (state, source, owner) => {
        const resolved = resolveEffectTarget(state, owner, target);
        return dealDamageState(
            state,
            source,
            resolved,
            amount,
            `${source}: ${amount} damage`,
        );
    };
}

/** Heals a fixed amount of health on the resolved target. */
export function heal(
    amount: number,
    target: TargetType = 'owner',
): Effect {
    return (state, source, owner) => {
        const resolved = resolveEffectTarget(state, owner, target);
        return healDamage(
            state,
            source,
            resolved,
            amount,
            `${source}: +${amount} health`,
        );
    };
}

export interface ModifyStatOptions {
    /** How many rounds the effect lasts. Undefined = permanent. */
    duration?: number;
    /**
     * Maximum stat values. If any affected stat already meets or
     * exceeds its cap the effect is not applied.
     */
    max?: Partial<Stats>;
}

/**
 * Applies a stat modifier to the resolved target, with an optional
 * duration and per-stat max cap.
 */
export function modifyStat(
    stats: Partial<Stats>,
    target: TargetType,
    options?: ModifyStatOptions,
): Effect {
    return (state, source, owner) => {
        const resolved = resolveEffectTarget(state, owner, target);

        if (options?.max) {
            const combatant = getCombatant(state, resolved);
            for (const [key, maxVal] of Object.entries(options.max)) {
                const current =
                    (combatant.stats as Record<string, number>)[key] ?? 0;
                if (current >= (maxVal as number)) return state;
            }
        }

        return appendEffect(state, resolved, {
            stats,
            source,
            target: resolved,
            duration: options?.duration,
        });
    };
}

/**
 * Cancels (reverses) damage that was already applied to the
 * ability owner. Used for immunity abilities.
 * Must be paired with an onDamageTaken trigger.
 */
export function cancelDamage(): Effect {
    return (state, source, owner, damageDealt) => {
        if (!damageDealt || damageDealt <= 0) return state;
        state = healDamage(
            state,
            source,
            owner,
            damageDealt,
            'Immune',
        );
        return addLogs(state, {
            message: `${owner} is immune to ${source}.`,
        });
    };
}
