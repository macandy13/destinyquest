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

/* =========================================
   ABILITY IMPLEMENTATIONS
   ========================================= */

// --- PASSIVE ABILITIES ---

registerAbility({
    name: 'Acid',
    type: 'passive',
    description: 'Add 1 to the result of each die you roll for your damage score.',
    onDamageCalculate: (_state, { rolls }) => {
        // Add 1 per die rolled
        return rolls.length;
    },
    icon: '🔥'
});

registerAbility({
    name: 'Barbs',
    type: 'passive',
    description: 'At the end of every combat round, automatically inflict 1 damage to all opponents.',
    onRoundEnd: (state) => {
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
    name: 'Charm',
    type: 'modifier',
    description: 'Re-roll one of your hero\'s dice; you must accept the second result.',
    icon: '🎲',
    canActivate: (state) => {
        // Can reroll speed if rolls exist (allows backtracking if we lost or want to improve before damage)
        if (state.heroSpeedRolls && state.phase !== 'combat-end') return true;
        // Can reroll damage if hero won and rolled damage
        if (state.phase === 'round-end' && state.winner === 'hero' && state.damageRolls) return true;
        return false;
    },
    onActivate: (state) => {
        let target: 'damage' | 'hero-speed' | null = null;

        // Prioritize damage reroll if available and valid (Hero won)
        if (state.winner === 'hero' && state.damageRolls) {
            target = 'damage';
        } else if (state.heroSpeedRolls) {
            target = 'hero-speed';
        }

        if (!target) return null;

        return {
            rerollState: {
                source: 'Charm',
                target
            },
            logs: [...state.logs, { round: state.round, message: `Select a ${target === 'damage' ? 'damage' : 'speed'} die to re-roll.`, type: 'info' }]
        };
    },
    onReroll: (state, index) => {
        if (state.rerollState?.target === 'hero-speed' && state.heroSpeedRolls) {
            const currentRoll = state.heroSpeedRolls[index];
            if (currentRoll.isRerolled) return {}; // Already rerolled

            const newRollVal = Math.floor(Math.random() * 6) + 1;
            const newRolls = [...state.heroSpeedRolls];
            newRolls[index] = { value: newRollVal, isRerolled: true };

            return {
                heroSpeedRolls: newRolls,
                rerollState: undefined, // Clear reroll state after use? Plan said "max 1 reroll per die" implies we might keep state open? 
                // Wait, "Every die can only be rerolled once".
                // "The whole pendingInteraction handling is complicated, we need something easier".
                // If I clear rerollState, the user can only reroll ONE die total.
                // Text says "Re-roll one of your hero's dice". ONE. Singular.
                // So yes, clear state.
                logs: [...state.logs, { round: state.round, message: `Re-rolled die ${index + 1} to ${newRollVal}.`, type: 'info' }]
            };
        } else if (state.rerollState?.target === 'damage' && state.damageRolls) {
            const currentRoll = state.damageRolls[index];
            if (currentRoll.isRerolled) return {};

            const newRollVal = Math.floor(Math.random() * 6) + 1;
            const newRolls = [...state.damageRolls];
            newRolls[index] = { value: newRollVal, isRerolled: true };

            return {
                damageRolls: newRolls,
                rerollState: undefined,
                logs: [...state.logs, { round: state.round, message: `Re-rolled damage die to ${newRollVal}.`, type: 'info' }]
            };
        }
        return {};
    }
});

registerAbility({
    name: 'Adrenaline',
    type: 'speed',
    description: 'Increase your speed by 2 for two combat rounds.',
    onActivate: (state) => {
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
    onActivate: (state) => {
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
    onActivate: (state) => {
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
    canActivate: (state) => {
        return state.phase === 'damage-roll' && state.winner === 'enemy';
    },
    icon: '🛡️',
    onActivate: (state) => {
        // Can only be used in damage-roll phase if enemy won
        if (state.phase === 'damage-roll' && state.winner === 'enemy') {
            return {
                phase: 'round-end',
                damageRolls: [{ value: 0, isRerolled: false }], // No damage
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
    icon: '❤️',
    canActivate: (state) => {
        if (!state.hero) return false;
        return state.hero.stats.health < state.hero.stats.maxHealth;
    },
    onActivate: (state) => {
        if (!state.hero) return null;
        const currentHealth = state.hero.stats.health;
        const newHealth = Math.min(state.hero.stats.maxHealth, currentHealth + 4);

        return {
            hero: { ...state.hero, stats: { ...state.hero.stats, health: newHealth } },
            logs: [...state.logs, { round: state.round, message: 'Used ability: Heal. Restored 4 health.', type: 'info' }]
        };
    }
});

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
