import { registerAbility } from '../abilityRegistry';
import { rollDice, sumDice } from '../../utils/dice';
import { dealDamage } from '../../types/combat';
import { getOpponent } from '../../types/stats';

registerAbility({
    name: 'Retaliation',
    type: 'combat',
    description: 'When taking health damage, inflict 1 damage die back (ignoring armour).',
    onDamageDealt: (state, owner, target, amount) => {
        if (owner !== target || amount <= 0) return {};

        const opponent = getOpponent(target);
        const val = sumDice(rollDice(1));
        return dealDamage(state, 'Retaliation', opponent, val);
    }
});
