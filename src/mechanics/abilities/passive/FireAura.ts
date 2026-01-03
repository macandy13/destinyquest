import { dealDamage } from '../../../types/CombatState';
import { getOpponent } from '../../../types/Character';
import { registerAbility } from '../../abilityRegistry';

registerAbility({
    name: 'Fire Aura',
    type: 'passive',
    description: 'All opponents take 1 damage (ignoring armour) at the end of every round.',
    onPassiveAbility: (state, { owner }) => {
        return dealDamage(state, 'Fire Aura', getOpponent(owner), 1);
    }
});
