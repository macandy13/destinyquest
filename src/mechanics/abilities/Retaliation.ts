import { registerAbility } from '../abilityRegistry';
import { addLog } from '../../utils/statUtils';
import { rollDice } from '../../utils/dice';

registerAbility({
    name: 'Retaliation',
    type: 'combat',
    description: 'When taking health damage, inflict 1 damage die back (ignoring armour).',
    onDamageDealt: (state, target, amount) => {
        if (target !== 'hero' || amount <= 0) return {};

        const val = rollDice(1)[0].value;

        return {
            damageDealt: [...state.damageDealt, { target: 'enemy', amount: val, source: 'Retaliation' }],
            logs: addLog(state.logs, { round: state.round, message: `Retaliation! Inflicted ${val} damage back.`, type: 'damage-enemy' })
        };
    }
});
