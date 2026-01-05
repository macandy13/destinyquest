import { dealDamage } from '../../../types/combatState';
import { getOpponent } from '../../../types/character';
import { registerAbility } from '../../abilityRegistry';

registerAbility({
    name: 'Fire Aura',
    type: 'passive',
    description: 'All opponents take 1 damage (ignoring armour) at the end of every round.',
    onPassiveAbility: (state, { owner }) => {
        return dealDamage(state, 'Fire Aura', getOpponent(owner), 1);
    }
});
