import { registerAbility } from '../abilityRegistry';
import { addLogs } from '../../utils/statUtils';

registerAbility({
    name: 'Feral Fury',
    type: 'combat',
    description: 'Roll an extra die for your damage score.',
    onActivate: (state) => {
        return {
            modifications: [
                ...state.modifications,
                {
                    modification: { stats: { damageDice: 1 }, source: 'Feral Fury', target: 'hero' },
                    id: `feral-fury-${state.round}`,
                    duration: 1
                }
            ],
            logs: addLogs(state.logs, { round: state.round, message: "Used ability: Feral Fury.", type: 'info' })
        };
    }
});
