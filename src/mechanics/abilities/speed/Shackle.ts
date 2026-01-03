import { registerAbility } from '../../abilityRegistry';
import { appendEffect, hasEffect } from '../../../types/CombatState';
import { getOpponent } from '../../../types/Character';
import { canModifySpeed } from '../abilityFactories';

registerAbility({
    name: 'Shackle',
    type: 'speed',
    description: "Reduce opponent's speed dice by 1 for one round (used once per combat).",
    canActivate: (state, { owner }) => {
        return canModifySpeed(state) && !hasEffect(state, owner, 'used-shackle');
    },
    onActivate: (state, { owner }) => {
        state = appendEffect(state, getOpponent(owner), {
            stats: { speedDice: -1 },
            source: 'Shackle',
            target: getOpponent(owner),
            duration: 1
        });
        state = appendEffect(state, owner, {
            source: 'used-shackle',
            target: owner,
            duration: undefined,
            stats: {},
            visible: false,
        });
        return state;
    }
});
