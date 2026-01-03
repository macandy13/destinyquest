import { registerAbility } from '../../abilityRegistry';
import { rollDice, sumDice } from '../../../types/Dice';
import { dealDamage } from '../../../types/CombatState';
import { getOpponent } from '../../../types/Character';

registerAbility({
    name: 'Sideswipe',
    type: 'combat',
    description: 'When taking health damage, inflict 1 damage die back (ignoring armour).',
    onDamageDealt: (state, { owner, target }, _source, amount) => {
        if (owner !== target || amount <= 0) return state;

        const val = sumDice(rollDice(1));
        const opponent = getOpponent(owner);

        return dealDamage(state, 'Sideswipe', opponent, val);
    }
});
