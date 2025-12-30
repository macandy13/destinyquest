import { registerAbility } from '../abilityRegistry';
import { addLog } from '../../utils/statUtils';

registerAbility({
    name: 'Judgement',
    type: 'combat',
    description: 'When taking health damage, inflict damage back equal to half your speed score (rounding up), ignoring armour.',
    onDamageDealt: (state, target, amount) => {
        if (target !== 'hero' || amount <= 0) return {};

        const speed = state.hero?.stats.speed || 0;
        const dmgBack = Math.ceil(speed / 2);

        // TODO: Only inflict during Attack
        if (dmgBack <= 0) return {};

        return {
            damageDealt: [...state.damageDealt, { target: 'enemy', amount: dmgBack, source: 'Judgement' }],
            logs: addLog(state.logs, { round: state.round, message: `Judgement passes sentence! Inflicted ${dmgBack} damage back.`, type: 'damage-enemy' })
        };
    }
});
