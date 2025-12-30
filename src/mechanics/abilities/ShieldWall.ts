import { registerAbility } from '../abilityRegistry';
import { addLog } from '../../utils/statUtils';
import { rollDice } from '../../utils/dice';

registerAbility({
    name: 'Shield Wall',
    type: 'combat',
    description: '(Requires shield in left hand). Double your armour score and inflict 1 damage die (ignoring armour) to the opponent.',
    onActivate: (state) => {
        // Validation of shield left hand?
        const armour = state.hero?.stats.armour || 0;
        // Double means add equal amount.

        const val = rollDice(1)[0].value;

        return {
            modifications: [
                ...state.modifications,
                { modification: { stats: { armour: armour }, source: 'Shield Wall', target: 'hero' }, id: `shield-wall-${state.round}`, duration: 1 }
            ],
            damageDealt: [...state.damageDealt, { target: 'enemy', amount: val, source: 'Shield Wall' }],
            logs: addLog(state.logs, { round: state.round, message: `Used ability: Shield Wall. Armour doubled, inflicted ${val} damage.`, type: 'info' })
        };
    }
});
