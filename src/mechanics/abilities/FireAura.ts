import { dealDamage } from '../../types/combat';
import { getOpponent } from '../../types/stats';
import { registerAbility } from '../abilityRegistry';

registerAbility({
    name: 'Fire Aura',
    type: 'passive',
    description: 'All opponents take 1 damage (ignoring armour) at the end of every round.',
    onRoundEnd: (state, owner) => {
        return dealDamage(state, 'Fire Aura', getOpponent(owner), 1);
    }
});
