import { dealDamage } from '../../../types/combatState';
import { registerAbility } from '../../abilityRegistry';
import { getOpponent } from '../../../types/character';

registerAbility({
    name: 'Thorns',
    type: 'passive',
    description: 'Inflict 1 damage (ignoring armour) to all opponents at end of every round.',
    onPassiveAbility: (state, { owner }) => {
        const opponent = getOpponent(owner);
        return dealDamage(state, 'Thorns', opponent, 1)
    }
});
