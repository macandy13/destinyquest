import {
    appendEffect,
    CombatState,
    hasEffect,
} from '../../../types/combatState';
import { CharacterType } from '../../../types/character';
import { AbilityType } from '../../../types/abilityDescription';
import { AbilityContext, registerAbility } from '../../abilityRegistry';
import { Effect, resolveEffectTarget } from './effects';
import { DamageContext, Trigger } from './triggers';

export interface AbilityConfig {
    name: string;
    description: string;
    icon?: string;
    type?: AbilityType;
    trigger: Trigger;
    effect: Effect;
}

/**
 * Declares a special ability using a trigger and an effect function.
 * Registers it in the global ability registry.
 *
 * @example
 * defineAbility({
 *   name: 'Hellfire',
 *   description: '...',
 *   trigger: onRoundEnd(always()),
 *   effect: dealDamage(2, 'hero'),
 * });
 */
export function defineAbility(config: AbilityConfig): void {
    const { name, description, icon, trigger, effect } = config;

    function runEffect(
        state: CombatState,
        owner: CharacterType,
        damageDealt?: number,
    ): CombatState {
        return effect(state, name, owner, damageDealt);
    }

    const hookName = trigger.hook;
    const { activationPattern } = trigger;

    // ----- Build the primary hook body -----

    // When an activationPattern is present, the primary hook (always
    // onPassiveAbility) should check for the presence of the marker
    // effect instead of the user-supplied condition.
    const primaryCondition = activationPattern
        ? (state: CombatState, context: AbilityContext): {
              triggered: boolean;
              state: CombatState;
          } => {
              const resolved = resolveEffectTarget(
                  state,
                  context.owner,
                  activationPattern.markerTarget,
              );
              return hasEffect(state, resolved, name)
                  ? { triggered: true, state }
                  : { triggered: false, state };
          }
        : trigger.condition;

    function applyPrimaryHook(
        state: CombatState,
        context: AbilityContext,
        extra?: DamageContext,
    ): CombatState {
        const { triggered, state: newState } = primaryCondition(
            state,
            context,
            extra,
        );
        if (!triggered) return newState;
        return runEffect(newState, context.owner, extra?.damageDealt);
    }

    // ----- Build the onDamageDealt hook -----
    // This is needed for:
    //   (a) onDamageTaken trigger (immunity, retaliation)
    //   (b) activationPattern marker-setting
    // Both may be needed simultaneously in the future but currently
    // activationPattern always pairs with onPassiveAbility, not
    // onDamageDealt as primary.

    let onDamageDealt:
        | ((
              state: CombatState,
              context: AbilityContext,
              source: string,
              damageDealt: number,
          ) => CombatState)
        | undefined;

    if (hookName === 'onDamageDealt') {
        onDamageDealt = (state, context, source, damageDealt) => {
            const extra: DamageContext = {
                damageDealt,
                source,
                target: context.target!,
            };
            return applyPrimaryHook(state, context, extra);
        };
    }

    if (activationPattern) {
        const { activationCondition, markerTarget } = activationPattern;
        onDamageDealt = (state, context, source, damageDealt) => {
            const extra: DamageContext = {
                damageDealt,
                source,
                target: context.target!,
            };
            const { triggered, state: s } = activationCondition(
                state,
                context,
                extra,
            );
            if (!triggered) return s;

            const resolved = resolveEffectTarget(s, context.owner, markerTarget);
            if (hasEffect(s, resolved, name)) return s;

            return appendEffect(s, resolved, {
                stats: {},
                source: name,
                target: resolved,
                duration: undefined,
                visible: false,
            });
        };
    }

    registerAbility({
        name,
        description,
        icon,
        type: config.type ?? 'special',
        reviewed: true,

        onCombatStart:
            hookName === 'onCombatStart'
                ? (state, context) => applyPrimaryHook(state, context)
                : undefined,

        onRoundStart:
            hookName === 'onRoundStart'
                ? (state, context) => applyPrimaryHook(state, context)
                : undefined,

        onPassiveAbility:
            hookName === 'onPassiveAbility'
                ? (state, context) => applyPrimaryHook(state, context)
                : undefined,

        onDamageDealt,
    });
}
