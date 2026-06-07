import {
    CombatState,
    addLogs,
    getCombatant,
} from '../../../types/combatState';
import { CharacterType, getOpponent } from '../../../types/character';
import { AbilityContext } from '../../abilityRegistry';
import { rollDice, sumDice, formatDice } from '../../../types/dice';
import { resolveEffectTarget, TargetType } from './effects';

// ---------------------------------------------------------------------------
// Core types
// ---------------------------------------------------------------------------

export interface DamageContext {
    damageDealt: number;
    /** Canonical name of the ability or attack source that dealt the damage. */
    source: string;
    target: CharacterType;
}

export interface ConditionResult {
    triggered: boolean;
    /** State possibly updated with log messages from the condition check. */
    state: CombatState;
}

/**
 * A Condition is a pure function that decides whether a trigger
 * should fire. It may add log messages to the state.
 */
export type Condition = (
    state: CombatState,
    context: AbilityContext,
    extra?: DamageContext,
) => ConditionResult;

type LifecycleHook =
    | 'onCombatStart'
    | 'onRoundStart'
    | 'onPassiveAbility'
    | 'onDamageDealt';

/**
 * A Trigger describes when an ability fires and any optional
 * two-phase activation pattern (e.g. "activate on first hit,
 * then fire every round end").
 */
export interface Trigger {
    hook: LifecycleHook;
    condition: Condition;
    /**
     * When set, defineAbility registers an additional hook that
     * sets an invisible activation marker on markerTarget using the
     * ability's name as the effect source. The primary hook then
     * only fires when that marker is present.
     */
    activationPattern?: {
        activationCondition: Condition;
        markerTarget: TargetType;
    };
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function ok(state: CombatState): ConditionResult {
    return { triggered: true, state };
}

function no(state: CombatState): ConditionResult {
    return { triggered: false, state };
}

// ---------------------------------------------------------------------------
// Condition creators
// ---------------------------------------------------------------------------

/** Fires unconditionally. */
export function always(): Condition {
    return (state) => ok(state);
}

/**
 * Fires only when the damage source matches one of the given ability
 * names (case-insensitive). Used for immunity abilities.
 */
export function fromSource(abilityNames: string[]): Condition {
    const lower = abilityNames.map((n) => n.toLowerCase());
    return (state, _context, extra) => {
        if (!extra?.source) return no(state);
        return lower.includes(extra.source.toLowerCase())
            ? ok(state)
            : no(state);
    };
}

// ---------------------------------------------------------------------------
// Roll-based condition builder
// ---------------------------------------------------------------------------

interface RollConditionBuilder {
    /** Fires when the sum of the rolled dice exceeds the target's speed. */
    vs(stat: 'speed'): Condition;
    /** Fires when at least one die shows one of the given face values. */
    faces(values: number[]): Condition;
}

/**
 * Returns a builder that produces a Condition based on a dice roll.
 * The roll happens once each time the condition is evaluated.
 *
 * @example
 *   roll(2).vs('speed')        // roll 2d6, trigger if total > speed
 *   roll(1).faces([1, 2, 3])   // roll 1d6, trigger if result is 1-3
 */
export function roll(diceCount: number): RollConditionBuilder {
    return {
        vs(_stat) {
            return (state, context) => {
                const rolls = rollDice(diceCount);
                const total = sumDice(rolls);
                const rollStr = formatDice(rolls);
                const opponent = getOpponent(context.owner);
                const speed = getCombatant(state, opponent).stats.speed;
                const triggered = total > speed;
                const msg =
                    `Rolled ${rollStr}=${total} vs speed ${speed}: ` +
                    (triggered ? 'triggered' : 'no effect');
                return { triggered, state: addLogs(state, { message: msg }) };
            };
        },
        faces(values) {
            return (state, _context) => {
                const rolls = rollDice(diceCount);
                const triggered = rolls.some((r) =>
                    values.includes(r.value)
                );
                const rollStr = formatDice(rolls);
                const msg =
                    `Rolled ${rollStr}: ` +
                    (triggered ? 'triggered' : 'no effect');
                return { triggered, state: addLogs(state, { message: msg }) };
            };
        },
    };
}

// ---------------------------------------------------------------------------
// Trigger creators
// ---------------------------------------------------------------------------

/** Fires once when combat starts. */
export function onCombatStart(condition: Condition = always()): Trigger {
    return { hook: 'onCombatStart', condition };
}

/** Fires at the start of each round. */
export function onRoundStart(condition: Condition = always()): Trigger {
    return { hook: 'onRoundStart', condition };
}

/**
 * Fires at the end of each round (passive phase).
 * Use for damage-over-time that is always active.
 */
export function onRoundEnd(condition: Condition = always()): Trigger {
    return { hook: 'onPassiveAbility', condition };
}

/**
 * Fires at the end of each round once the ability owner has first
 * taken damage. Internally uses a two-phase pattern:
 *   1. On first hit: sets an invisible marker on damageTarget.
 *   2. Each round end: fires the effect if the marker is present.
 *
 * @param damageTarget Who receives both the marker and the damage
 *                     (default: 'hero').
 */
export function onRoundEndAfterFirstHit(
    damageTarget: TargetType = 'hero',
): Trigger {
    return {
        hook: 'onPassiveAbility',
        // placeholder — defineAbility replaces this with the marker check
        condition: always(),
        activationPattern: {
            activationCondition: (state, context, extra) => {
                if (!extra) return no(state);
                const resolved = resolveEffectTarget(
                    state,
                    context.owner,
                    damageTarget,
                );
                if (
                    extra.target !== resolved ||
                    extra.damageDealt <= 0
                ) {
                    return no(state);
                }
                return ok(state);
            },
            markerTarget: damageTarget,
        },
    };
}

/**
 * Fires when the ability owner takes damage.
 * Used for immunity and retaliation effects.
 *
 * @param condition Optional extra condition (e.g. fromSource([...])).
 */
export function onDamageTaken(condition: Condition = always()): Trigger {
    return {
        hook: 'onDamageDealt',
        condition: (state, context, extra) => {
            if (
                !extra ||
                extra.target !== context.owner ||
                extra.damageDealt <= 0
            ) {
                return no(state);
            }
            return condition(state, context, extra);
        },
    };
}
