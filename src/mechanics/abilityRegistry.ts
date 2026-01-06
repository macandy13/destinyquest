import { CombatState } from '../types/combatState';
import { CharacterType } from '../types/character';
import { AbilityType } from '../types/abilityDescription';

export interface AbilityContext {
    owner: CharacterType;
    target?: CharacterType;
}

export interface AbilityHooks {
    // Checks if ability can be activated in current state
    canActivate?: (state: CombatState, context: AbilityContext) => boolean;

    // For active abilities: returns partial state or null if activation failed/invalid
    onActivate?: (state: CombatState, context: AbilityContext) => CombatState;

    onCombatStart?: (state: CombatState, context: AbilityContext) => CombatState;

    // Triggered after speed dice are rolled
    onSpeedRoll?: (state: CombatState, context: AbilityContext) => CombatState;

    // Returns the modifier amount to add to speed total
    onSpeedCalculate?: (state: CombatState, context: AbilityContext) => number;

    // Triggered after damage dice are rolled
    onDamageRoll?: (state: CombatState, context: AbilityContext) => CombatState;

    // Returns the modifier amount to add to damage total
    onDamageCalculate?: (state: CombatState, context: AbilityContext) => number;

    // Called after damage from the attack has been assigned
    onDamageDealt?: (state: CombatState, context: AbilityContext, source: string, damageDealt: number) => CombatState;

    // Called when damage phase is over and passive abilities are triggered.
    onPassiveAbility?: (state: CombatState, context: AbilityContext) => CombatState;

    // Handles reroll interactions. Returns state updates.
    onReroll?: (state: CombatState, dieIndex: number) => CombatState;
}

export interface AbilityDefinition extends AbilityHooks {
    name: string;
    description: string;
    type: AbilityType,
    icon?: string;
}

export const ABILITY_REGISTRY: Record<string, AbilityDefinition> = {};

export function registerAbility(definition: AbilityDefinition) {
    ABILITY_REGISTRY[toCanonicalName(definition.name)] = definition;
}

export function toCanonicalName(name: string): string {
    return name.replace(/ /g, '-').toLowerCase();
}

export function getAbilityDefinition(name: string): AbilityDefinition | undefined {
    const canonicalName = toCanonicalName(name);
    return canonicalName ? ABILITY_REGISTRY[canonicalName] : undefined;
}

export function getAbilityIcon(definition: AbilityDefinition | undefined): string {
    if (!definition) return '❓';

    const type = definition.type;

    // Check for explicit icon on the definition
    if (definition.icon) return definition.icon;

    // Pure type-based defaults
    switch (type) {
        case 'speed': return '⚡';
        case 'combat': return '⚔️';
        case 'modifier': return '✨';
        case 'passive': return '👁️';
        case 'special': return '👾';
        default: return '✨';
    }
}
