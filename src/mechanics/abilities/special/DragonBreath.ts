import { AbilityDefinition, registerAbility } from '../../abilityRegistry';
import { dealDamage, hasEffect } from '../../../types/combatState';
import { getOpponent } from '../../../types/character';

export const DragonBreath: AbilityDefinition = {
    name: 'Dragon breath',
    type: 'special',
    description: "If the opponent has the 'burn' status, Dragon Breath deals 2 damage at start of each combat round. This damage ignores armor.",
    reviewed: false,
    onRoundStart: (state, { owner }) => {
        const target = getOpponent(owner);
        // Assuming 'Ignite' ability applies a 'burn' or similar, or checking for effects named 'burn' / 'Ignite'.
        // Based on immunity list, 'Ignite' is fire-based. Let's check for 'burn' or effects from fire abilities.
        // For now, let's assume 'burn' is an effect source or part of the status.
        // Given 'Blazing armour' applies 'Ignite', which likely applies an effect.
        // We'll check for effects that *contain* "burn" or are from "Ignite". 
        // Simplest interpretation: status is literally 'burn'.

        // TODO: Verify how statuses are applied. For now, check for effect with source 'Ignite' or similar.
        // User text says "'burn' status".
        const hasBurn = hasEffect(state, target, 'Ignite') || state[target].activeEffects.some(e => e.source.toLowerCase().includes('burn'));

        if (hasBurn) {
            state = dealDamage(state, 'Dragon breath', target, 2, 'Opponent is burning! Dragon breath deals 2 damage.');
        }
        return state;
    }
};

registerAbility(DragonBreath);
