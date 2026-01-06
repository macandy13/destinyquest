import { registerAbility } from '../../abilityRegistry';
import { appendEffect, hasEffect } from '../../../types/combatState';

registerAbility({
    name: 'Blood Rage',
    type: 'modifier',
    description: 'If you win two consecutive rounds and cause health damage in both, your brawn increases by 2 for the remainder of the combat.',
    onPassiveAbility: (state, { owner }) => {
        if (state.winner !== owner) return state;
        if (hasEffect(state, owner, 'BloodRageStreak')) {
            state = appendEffect(state, owner, {
                stats: { brawn: 2 },
                source: 'Blood Rage',
                target: owner,
                duration: undefined
            });
        } else {
            return appendEffect(state, owner, {
                stats: {},
                source: 'BloodRageStreak',
                target: owner,
                duration: 1,
                visible: false
            });
        }
        return state;
    }
});
