import { CombatState, DiceRoll } from '../types/combat';
import { Target } from '../types/stats';


export interface AbilityHooks {
    // For active abilities: returns partial state or null if activation failed/invalid
    onActivate?: (state: CombatState) => Partial<CombatState> | null;

    // Checks if ability can be activated in current state
    canActivate?: (state: CombatState) => boolean;

    onCombatStart?: (state: CombatState, target: Target) => Partial<CombatState>;

    // Triggered after speed dice are rolled
    onSpeedRoll?: (state: CombatState, rolls: DiceRoll[]) => Partial<CombatState>;

    // Returns the modifier amount to add to speed total
    onSpeedCalculate?: (state: CombatState) => number;

    // Triggered after damage dice are rolled
    onDamageRoll?: (state: CombatState, rolls: DiceRoll[]) => Partial<CombatState>;

    // Returns the modifier amount to add to damage total
    onDamageCalculate?: (state: CombatState, damage: { total: number, rolls: DiceRoll[] }) => number;

    // Returns partial state updates (e.g. log messages, health updates)
    onDamageDealt?: (state: CombatState, target: Target, damageDealt: number) => Partial<CombatState>;

    // Returns partial state updates (e.g. passive damage at end of round)
    onRoundEnd?: (state: CombatState, target: Target) => Partial<CombatState>;

    // Handles reroll interactions. Returns state updates.
    onReroll?: (state: CombatState, dieIndex: number) => Partial<CombatState>;
}

export type AbilityType = 'passive' | 'speed' | 'combat' | 'modifier';

export interface AbilityDefinition extends AbilityHooks {
    name: string;
    description: string;
    type: AbilityType,
    icon?: string;
}

export const ABILITY_REGISTRY: Record<string, AbilityDefinition> = {};

export function registerAbility(definition: AbilityDefinition) {
    ABILITY_REGISTRY[definition.name] = definition;
}

export function getAbilityDefinition(name: string): AbilityDefinition | undefined {
    return ABILITY_REGISTRY[name];
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
        default: return '✨';
    }
}
