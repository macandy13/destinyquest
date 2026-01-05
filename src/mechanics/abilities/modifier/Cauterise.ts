import { registerAbility } from '../../abilityRegistry';
import { removeEffect } from '../../../types/combatState';

registerAbility({
    name: 'Cauterise',
    type: 'modifier',
    description: 'Remove all venom, bleed, and disease effects currently on your hero.',
    onActivate: (state, { owner }) => {
        const effectsToRemove = ['Venom', 'Bleed', 'Disease'];
        let newState = state;
        // Inefficient loop but safe
        for (const effect of effectsToRemove) {
            newState = removeEffect(newState, owner, effect);
        }
        return newState;
    }
});
