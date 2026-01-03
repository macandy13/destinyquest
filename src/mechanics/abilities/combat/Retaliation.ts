import { registerAbility } from '../../abilityRegistry';
import { rollDice, sumDice } from '../../../types/Dice';
import { dealDamage } from '../../../types/CombatState';
import { getOpponent } from '../../../types/Character';

registerAbility({
    name: 'Retaliation',
    type: 'combat',
    description: 'When taking health damage, inflict 1 damage die back (ignoring armour).',
    onDamageDealt: (state, context, _source, amount) => {
        const { owner, target } = context;
        if (owner !== target || amount <= 0) return state;

        const opponent = getOpponent(target);
        const val = sumDice(rollDice(1));
        return dealDamage(state, 'Retaliation', opponent, val);
    }
});
