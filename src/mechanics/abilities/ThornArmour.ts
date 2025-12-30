import { registerAbility } from '../abilityRegistry';
import { addLog } from '../../utils/statUtils';
import { rollDice } from '../../utils/dice';

registerAbility({
    name: 'Thorn Armour',
    type: 'combat',
    description: 'Raise armour by 3 and inflict 1 damage die (ignoring armour) to all opponents.',
    onActivate: (state) => {
        const val = rollDice(1)[0].value;
        return {
            modifications: [
                ...state.modifications,
                { modification: { stats: { armour: 3 }, source: 'Thorn Armour', target: 'hero' }, id: `thorn-armour-${state.round}`, duration: 1 }
            ],
            damageDealt: [...state.damageDealt, { target: 'enemy', amount: val, source: 'Thorn Armour' }],
            logs: addLog(state.logs, { round: state.round, message: `Thorn Armour active! Armour +3, inflicted ${val} damage.`, type: 'info' })
        };
    }
});
