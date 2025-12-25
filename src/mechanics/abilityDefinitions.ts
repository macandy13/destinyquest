import { CombatState } from '../types/combat';
import { Hero } from '../types/hero';

export interface AbilityHooks {
    // For active abilities: returns partial state or null if activation failed/invalid
    onActivate?: (state: CombatState, hero: Hero) => Partial<CombatState> | null;

    // Checks if ability can be activated in current state
    canActivate?: (state: CombatState, hero: Hero) => boolean;

    onCombatStart?: (state: CombatState, hero: Hero) => Partial<CombatState>;

    // Returns the modifier amount to add to speed total
    onSpeedCalculate?: (state: CombatState, hero: Hero) => number;

    // Returns the modifier amount to add to damage total
    onDamageCalculate?: (state: CombatState, hero: Hero, damageRoll: number, rolls: number[]) => number;

    // Returns partial state updates (e.g. log messages, health updates)
    onPostDamage?: (state: CombatState, hero: Hero, damageDealt: number) => Partial<CombatState>;

    // Returns partial state updates (e.g. passive damage at end of round)
    onRoundEnd?: (state: CombatState, hero: Hero) => Partial<CombatState>;
}

export interface AbilityDefinition extends AbilityHooks {
    name: string;
    description: string;
    type: 'passive' | 'speed' | 'combat' | 'modifier';
}

export const ABILITY_REGISTRY: Record<string, AbilityDefinition> = {};

export function registerAbility(definition: AbilityDefinition) {
    ABILITY_REGISTRY[definition.name] = definition;
}

export function getAbilityDefinition(name: string): AbilityDefinition | undefined {
    return ABILITY_REGISTRY[name];
}

/* =========================================
   ABILITY IMPLEMENTATIONS
   ========================================= */

// --- PASSIVE ABILITIES ---

registerAbility({
    name: 'Acid',
    type: 'passive',
    description: 'Add 1 to the result of each die you roll for your damage score.',
    onDamageCalculate: (_state, _hero, _damageRoll, rolls) => {
        // Add 1 per die rolled
        return rolls.length;
    }
});

registerAbility({
    name: 'Barbs',
    type: 'passive',
    description: 'At the end of every combat round, automatically inflict 1 damage to all opponents.',
    onRoundEnd: (state, _hero) => {
        if (!state.enemy) return {};
        const newEnemyHealth = Math.max(0, state.enemy.health - 1);
        if (newEnemyHealth < state.enemy.health) {
            return {
                enemy: { ...state.enemy, health: newEnemyHealth },
                logs: [...state.logs, {
                    round: state.round,
                    message: 'Barbs inflicts 1 damage.',
                    type: 'damage-enemy'
                }]
            };
        }
        return {};
    }
});

// Reuse Barbs logic structure for Fire aura and Thorns for now, or implement separately
// They are identical in effect description in the code so far.

// --- SPEED ABILITIES ---

registerAbility({
    name: 'Adrenaline',
    type: 'speed',
    description: 'Increase your speed by 2 for two combat rounds.',
    onActivate: (state, _hero) => {
        const newModifiers = [...state.modifiers, {
            name: 'Adrenaline',
            source: 'Adrenaline', // Ideally source comes from item but we might lose that context here unless passed
            type: 'speed-bonus' as const,
            value: 2,
            duration: 2
        }];
        return {
            modifiers: newModifiers,
            logs: [...state.logs, { round: state.round, message: 'Used ability: Adrenaline', type: 'info' }]
        };
    }
});

registerAbility({
    name: 'Charge',
    type: 'speed',
    description: 'Increase speed by 2 in the first round of combat.',
    onActivate: (state, _hero) => {
        const newModifiers = [...state.modifiers, {
            name: 'Charge',
            source: 'Charge',
            type: 'speed-bonus' as const,
            value: 2,
            duration: 1
        }];
        return {
            modifiers: newModifiers,
            logs: [...state.logs, { round: state.round, message: 'Used ability: Charge', type: 'info' }]
        };
    }
});

registerAbility({
    name: 'Quicksilver',
    type: 'speed',
    description: 'Increase speed by 2 for one round.',
    onActivate: (state, _hero) => {
        const newModifiers = [...state.modifiers, {
            name: 'Quicksilver',
            source: 'Quicksilver',
            type: 'speed-bonus' as const,
            value: 2,
            duration: 1
        }];
        return {
            modifiers: newModifiers,
            logs: [...state.logs, { round: state.round, message: 'Used ability: Quicksilver', type: 'info' }]
        };
    }
});


// --- COMBAT ABILITIES ---

registerAbility({
    name: 'Parry',
    type: 'combat',
    description: 'Stop an opponent from rolling for damage after they win a round.',
    canActivate: (state, _hero) => {
        return state.phase === 'damage-roll' && state.winner === 'enemy';
    },
    onActivate: (state, _hero) => {
        // Can only be used in damage-roll phase if enemy won
        if (state.phase === 'damage-roll' && state.winner === 'enemy') {
            return {
                phase: 'round-end',
                damageRolls: [0], // No damage
                logs: [...state.logs, { round: state.round, message: "Used ability: Parry. Opponent's attack blocked!", type: 'info' }]
            };
        }
        return null; // Invalid usage
    }
});

// --- MODIFIER ABILITIES ---

registerAbility({
    name: 'Heal',
    type: 'modifier',
    description: 'Instantly restore 4 health.',
    canActivate: (state, hero) => {
        return state.heroHealth < hero.stats.maxHealth;
    },
    onActivate: (state, hero) => {
        const newHealth = Math.min(hero.stats.maxHealth, state.heroHealth + 4);
        return {
            heroHealth: newHealth,
            logs: [...state.logs, { round: state.round, message: 'Used ability: Heal. Restored 4 health.', type: 'info' }]
        };
    }
});
