import { dealDamage } from '../../types/combat';
import { registerAbility } from '../abilityRegistry';
import { getOpponent } from '../../types/stats';

registerAbility({
    name: 'Thorns',
    type: 'passive',
    description: 'Inflict 1 damage (ignoring armour) to all opponents at end of every round.',
    onRoundEnd: (state, owner) => {
        const opponent = getOpponent(owner);
        return dealDamage(state, 'Thorns', opponent, 1)
    }
});
