import {
    appendEffect,
    CombatState,
    hasEffect,
} from '../../../types/combatState';
import { CharacterType } from '../../../types/character';
import { AbilityType } from '../../../types/abilityDescription';
import { AbilityContext, registerAbility, AbilityHooks } from '../../abilityRegistry';
import { Effect, resolveEffectTarget } from './effects';
import { DamageContext, Trigger } from './triggers';

export interface AbilityConfig extends Partial<AbilityHooks> {
    name: string;
    description: string;
    icon?: string;
    type?: AbilityType;
    trigger?: Trigger;
    effect?: Effect;
}

/**
 * Declares an ability using composable triggers and effect functions.
 * Registers it in the global ability registry.
 */
export function defineAbility(config: AbilityConfig): void {
    const { name, description, icon, trigger, effect, ...customHooks } = config;

    function runEffect(
        state: CombatState,
        owner: CharacterType,
        damageDealt?: number,
    ): CombatState {
        if (!effect) return state;
        return effect(state, name, owner, damageDealt);
    }

    let hookName: string | undefined;
    let activationPattern: any | undefined;
    let primaryCondition: any | undefined;

    if (trigger) {
        hookName = trigger.hook;
        activationPattern = trigger.activationPattern;

        primaryCondition = activationPattern
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
    }

    function applyPrimaryHook(
        state: CombatState,
        context: AbilityContext,
        extra?: DamageContext,
    ): CombatState {
        if (!primaryCondition) return state;
        const { triggered, state: newState } = primaryCondition(
            state,
            context,
            extra,
        );
        if (!triggered) return newState;
        return runEffect(newState, context.owner, extra?.damageDealt);
    }

    let onDamageDealt: any | undefined;

    if (trigger) {
        if (hookName === 'onDamageDealt') {
            onDamageDealt = (
                state: CombatState,
                context: AbilityContext,
                source: string,
                damageDealt: number,
            ) => {
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
            onDamageDealt = (
                state: CombatState,
                context: AbilityContext,
                source: string,
                damageDealt: number,
            ) => {
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
    }

    const onActivate =
        !trigger && effect
            ? (state: CombatState, context: AbilityContext): CombatState => {
                  if (config.canActivate && !config.canActivate(state, context)) {
                      return state;
                  }
                  return effect(state, name, context.owner);
              }
            : undefined;

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

        onSpeedRoll:
            hookName === 'onSpeedRoll'
                ? (state, context) => applyPrimaryHook(state, context)
                : undefined,

        onDamageRoll:
            hookName === 'onDamageRoll'
                ? (state, context) => applyPrimaryHook(state, context)
                : undefined,

        onDamageDealt,
        onActivate,

        ...customHooks,
    });
}
