import { registerAbility } from '../../abilityRegistry';
import { appendEffect } from '../../../types/combatState';
import { getOpponent } from '../../../types/character';

registerAbility({
    name: 'Swamp Legs',
    type: 'speed',
    description: "Reduce opponent's speed by 1 for one round.",
    onActivate: (state, { owner }) => {
        return appendEffect(state, getOpponent(owner), {
            stats: { speed: -1 },
            source: 'Swamp Legs',
            target: getOpponent(owner),
            duration: 1
        });
    }
});
