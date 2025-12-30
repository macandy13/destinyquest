import { registerAbility } from '../abilityRegistry';
import { addLog } from '../../utils/statUtils';

registerAbility({
    name: 'Surge',
    type: 'combat',
    description: 'Increase magic by 3, but lower speed by 1 in the next round.',
    onActivate: (state) => {
        return {
            modifications: [
                ...state.modifications,
                { modification: { stats: { magic: 3 }, source: 'Surge', target: 'hero' }, id: `surge-magic-${state.round}`, duration: 1 },
                { modification: { stats: { speed: -1 }, source: 'Surge', target: 'hero' }, id: `surge-speed-${state.round}`, duration: 2 }
            ],
            logs: addLog(state.logs, { round: state.round, message: "Used ability: Surge.", type: 'info' })
        };
    }
});
