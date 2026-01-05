import { registerAbility } from '../../abilityRegistry';
import { addLogs, appendEffect, dealDamage } from '../../../types/combatState';
import { rollDice } from '../../../types/dice';
import { getOpponent } from '../../../types/character';

registerAbility({
    name: 'Thorn Armour',
    type: 'combat',
    description: 'Raise armour by 3 and inflict 1 damage die (ignoring armour) to all opponents.',
    onActivate: (state, { owner }) => {
        const val = rollDice(1)[0].value;
        const opponent = getOpponent(owner);

        let newState = appendEffect(state, owner, {
            stats: { armour: 3 },
            source: 'Thorn Armour',
            target: owner,
            duration: 1
        });

        // Inflict damage ignoring armour
        const damageResult = dealDamage(newState, 'Thorn Armour', opponent, val);
        newState = { ...newState, ...damageResult };

        return addLogs(newState, { round: state.round, message: `Thorn Armour active! Armour +3, inflicted ${val} damage.`, type: 'info' });
    }
});
