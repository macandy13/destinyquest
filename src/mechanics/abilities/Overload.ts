import { registerAbility } from '../abilityRegistry';
import { addLog } from '../../utils/statUtils';

registerAbility({
    name: 'Overload',
    type: 'combat',
    description: 'Roll an extra die for your damage score.',
    onActivate: (state) => {
        return {
            modifications: [
                ...state.modifications,
                {
                    modification: {
                        stats: { damageDice: 1 },
                        source: 'Overload',
                        target: 'hero'
                    },
                    id: `overload-${state.round}`,
                    duration: 1
                }
            ],
            logs: addLog(state.logs, {
                round: state.round,
                message: "Used ability: Overload.",
                type: 'info'
            })
        };
    }
});
