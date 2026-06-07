import { registerAbility } from '../../abilityRegistry';
import { AbilityDefinition } from '../../abilityRegistry';

export interface NoopAbilityConfig {
    name: string;
    description: string;
}

/**
 * Creates an ability definition with no game mechanics.
 * Displayed to the user but has no effect during combat.
 * Used for abilities that are not yet implemented or require
 * special multi-enemy handling.
 */
export function createNoopAbility(
    config: NoopAbilityConfig,
): AbilityDefinition {
    return {
        name: config.name,
        type: 'special',
        description: config.description,
        icon: '🚫',
        reviewed: false,
    };
}

/** Registers a noop ability directly. */
export function defineNoopAbility(config: NoopAbilityConfig): void {
    registerAbility(createNoopAbility(config));
}
