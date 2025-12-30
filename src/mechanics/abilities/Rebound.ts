import { registerAbility } from '../abilityRegistry';
import { addLog } from '../../utils/statUtils';

registerAbility({
    name: 'Rebound',
    type: 'combat',
    description: 'If you take health damage, increase your speed by 2 for the next round.',
    onDamageDealt: (state, target, amount) => {
        if (target !== 'hero' || amount <= 0) return {};

        return {
            modifications: [
                ...state.modifications,
                { modification: { stats: { speed: 2 }, source: 'Rebound', target: 'hero' }, id: `rebound-${state.round}`, duration: 2 }
            ],
            logs: addLog(state.logs, { round: state.round, message: "Rebound triggered! Speed increased for next round.", type: 'info' })
        };
    }
});
