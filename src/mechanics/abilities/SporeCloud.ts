import { registerAbility } from '../abilityRegistry';
import { addLog } from '../../utils/statUtils';
import { rollDice, sumDice } from '../../utils/dice';

registerAbility({
    name: 'Spore Cloud',
    type: 'combat',
    description: 'When taking health damage, inflict 2 damage dice back (ignoring armour).',
    onDamageDealt: (state, target, amount) => {
        if (target !== 'hero' || amount <= 0) return {};

        const dmgRolls = rollDice(2);
        const dmg = sumDice(dmgRolls);
        const rolls = dmgRolls.map(r => r.value);

        return {
            damageDealt: [...state.damageDealt, { target: 'enemy', amount: dmg, source: 'Spore Cloud' }],
            logs: addLog(state.logs, { round: state.round, message: `Spore Cloud! Inflicted ${dmg} damage back (${rolls.join('+')}).`, type: 'damage-enemy' })
        };
    }
});
