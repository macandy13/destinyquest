import { dealDamage } from '../../../types/combat';
import { getOpponent } from '../../../types/stats';
import { registerAbility } from '../../abilityRegistry';

registerAbility({
    name: 'Barbs',
    type: 'passive',
    description: 'At the end of every combat round, automatically inflict 1 damage to all opponents.',
    onRoundEnd: (state, owner) => {
        return dealDamage(state, 'Barbs', getOpponent(owner), 1);
    }
});
