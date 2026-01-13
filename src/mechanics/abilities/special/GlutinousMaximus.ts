import { AbilityDefinition, registerAbility } from '../../abilityRegistry';
import { appendEffect, hasEffect } from '../../../types/combatState';

export const GlutinousMaximus: AbilityDefinition = {
    name: 'Glutinous maximus',
    type: 'special',
    description: "Every time you win a combat round, you are reduced to 1 speed die for the next attack roll. Cannot be avoided.",
    reviewed: false,
    onDamageRoll: (state) => {
        // If hero wins, apply speed reduction for next round
        if (state.winner !== 'hero') return state;
        // Remove any existing effect first
        if (hasEffect(state, 'hero', 'Glutinous maximus')) {
            return state;
        }
        // Apply -1 speedDice (assuming base is 2, this reduces to 1)
        // The effect lasts for 2 rounds (current + next)
        return appendEffect(state, 'hero', {
            stats: { speedDice: -1 },
            source: 'Glutinous maximus',
            target: 'hero',
            duration: 2,
            description: 'Reduced to 1 speed die'
        });
    }
};

registerAbility(GlutinousMaximus);
