import { registerAbility } from '../../abilityRegistry';
import { dealDamage, hasEffect } from '../../../types/combatState';
import { getOpponent } from '../../../types/character';

registerAbility({
    name: 'Burn',
    type: 'passive',
    description: 'Opponents damaged by ignite lose 1 health (ignoring armour) at the end of every round.',
    onPassiveAbility: (state, { owner }) => {
        const opponent = getOpponent(owner);
        if (hasEffect(state, opponent, 'Ignite')) {
            const damage = hasEffect(state, owner, 'Embers') ? 2 : 1;
            return dealDamage(state, 'Burn', opponent, damage);
        }
        return state;
    }
});
