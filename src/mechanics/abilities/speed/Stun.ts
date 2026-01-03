import { getOpponent } from '../../../types/Character';
import { appendEffect, hasEffect } from '../../../types/CombatState';
import { registerAbility } from '../../abilityRegistry';
import { canModifySpeedDice } from '../abilityFactories';

registerAbility({
    name: 'Stun',
    type: 'speed',
    description: "Reduce opponent's speed dice by 1 for one round (used once per combat).",
    canActivate: (state, { owner }) => {
        return canModifySpeedDice(state) && !hasEffect(state, owner, 'used-stun');
    },
    onActivate: (state, { owner }) => {
        state = appendEffect(state, getOpponent(owner), {
            stats: { speedDice: -1 },
            source: 'Stun',
            target: getOpponent(owner),
            duration: 1
        });
        state = appendEffect(state, owner, {
            source: 'used-stun',
            target: owner,
            duration: undefined,
            stats: {},
            visible: false,
        });
        return state;
    }
});
