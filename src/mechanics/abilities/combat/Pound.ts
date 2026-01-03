import { registerAbility } from '../../abilityRegistry';
import { addLogs } from '../../../utils/statUtils';

registerAbility({
    name: 'Pound',
    type: 'combat',
    description: 'Increase damage score by 3, but lower your speed by 1 in the next round.',
    onActivate: (state) => {
        return {
            modifications: [
                ...state.modifications,
                { modification: { stats: { damageModifier: 3 }, source: 'Pound', target: 'hero' }, id: `pound-dmg-${state.round}`, duration: 1 },
                { modification: { stats: { speed: -1 }, source: 'Pound', target: 'hero' }, id: `pound-speed-${state.round}`, duration: 2 }
            ],
            logs: addLogs(state.logs, { round: state.round, message: "Used ability: Pound.", type: 'info' })
        };
    }
});
