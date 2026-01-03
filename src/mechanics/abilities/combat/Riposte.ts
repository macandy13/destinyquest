import { registerAbility, AbilityContext } from '../../abilityRegistry';
import { rollDice, sumDice } from '../../../types/Dice';
import { dealDamage, CombatState } from '../../../types/CombatState';
import { getOpponent } from '../../../types/Character';

registerAbility({
    name: 'Riposte',
    type: 'combat',
    description: 'When taking health damage, inflict 1 damage die back (ignoring armour).',
    onDamageDealt: (state: CombatState, { owner, target }: AbilityContext, _source: string, amount: number) => {
        if (owner !== target || amount <= 0) return state;

        const val = sumDice(rollDice(1));
        const opponent = getOpponent(owner);
        return dealDamage(state, 'Riposte', opponent, val);
    }
});
