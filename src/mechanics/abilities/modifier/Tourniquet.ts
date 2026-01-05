import { registerAbility } from '../../abilityRegistry';
import { removeEffect } from '../../../types/combatState';

registerAbility({
    name: 'Tourniquet',
    type: 'modifier',
    description: 'Remove bleed, venom, and disease from yourself or an ally.',
    // Assuming "ally" is not applicable in 1v1, treating as self.
    onActivate: (state, { owner }) => {
        const effectsToRemove = ['Venom', 'Bleed', 'Disease'];
        let newState = state;
        for (const effect of effectsToRemove) {
            newState = removeEffect(newState, owner, effect);
        }
        return newState;
    }
});
