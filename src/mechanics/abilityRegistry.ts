import { CombatState, DiceRoll } from '../types/combat';
import { CharacterType } from '../types/stats';

export interface AbilityHooks {
    // Checks if ability can be activated in current state
    canActivate?: (state: CombatState, owner: CharacterType) => boolean;

    // For active abilities: returns partial state or null if activation failed/invalid
    onActivate?: (state: CombatState, owner: CharacterType) => Partial<CombatState> | null;

    onCombatStart?: (state: CombatState, owner: CharacterType) => Partial<CombatState>;

    // Triggered after speed dice are rolled
    onSpeedRoll?: (state: CombatState, source: CharacterType, rolls: DiceRoll[]) => Partial<CombatState>;

    // Returns the modifier amount to add to speed total
    onSpeedCalculate?: (state: CombatState) => number;

    // Triggered after damage dice are rolled
    onDamageRoll?: (state: CombatState, source: CharacterType, rolls: DiceRoll[]) => Partial<CombatState>;

    // Returns the modifier amount to add to damage total
    onDamageCalculate?: (state: CombatState, owner: CharacterType, target: CharacterType, damage: { total: number, rolls: DiceRoll[] }) => number;

    // Called after damage from the attack has been assigned
    onDamageDealt?: (state: CombatState, owner: CharacterType, target: CharacterType, damageDealt: number) => Partial<CombatState>;

    // Called when damage phase is over and passive abilities are triggered.
    onRoundEnd?: (state: CombatState, owner: CharacterType) => Partial<CombatState>;

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
