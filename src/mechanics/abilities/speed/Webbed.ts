import { registerAbility } from '../../abilityRegistry';
import { appendEffect } from '../../../types/CombatState';
import { getOpponent } from '../../../types/Character';

registerAbility({
    name: 'Webbed',
    type: 'speed',
    description: 'Reduce enemy speed dice',
    onActivate: (state, { owner }) => {
        return appendEffect(state, getOpponent(owner), {
            source: 'Webbed',
            target: getOpponent(owner),
            stats: { speedDice: -1 },
            duration: 1 // TODO: Should the be infinite?
        });
    }
});
