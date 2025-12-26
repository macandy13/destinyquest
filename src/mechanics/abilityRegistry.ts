import { CombatState, DiceRoll } from '../types/combat';


export interface AbilityHooks {
    // For active abilities: returns partial state or null if activation failed/invalid
    onActivate?: (state: CombatState) => Partial<CombatState> | null;

    // Checks if ability can be activated in current state
    canActivate?: (state: CombatState) => boolean;

    onCombatStart?: (state: CombatState) => Partial<CombatState>;

    // Returns the modifier amount to add to speed total
    onSpeedCalculate?: (state: CombatState) => number;

    // Returns the modifier amount to add to damage total
    onDamageCalculate?: (state: CombatState, damage: { total: number, rolls: DiceRoll[] }) => number;

    // Returns partial state updates (e.g. log messages, health updates)
    onPostDamage?: (state: CombatState, damageDealt: number) => Partial<CombatState>;

    // Returns partial state updates (e.g. passive damage at end of round)
    onRoundEnd?: (state: CombatState) => Partial<CombatState>;

    // Handles reroll interactions. Returns state updates.
    onReroll?: (state: CombatState, dieIndex: number) => Partial<CombatState>;
}

export interface AbilityDefinition extends AbilityHooks {
    name: string;
    description: string;
    type: 'passive' | 'speed' | 'combat' | 'modifier';
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
