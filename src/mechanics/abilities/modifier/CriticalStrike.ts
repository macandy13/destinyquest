import { addLogs } from '../../../utils/statUtils';
import { registerAbility } from '../../abilityRegistry';

registerAbility({
    name: 'Critical Strike',
    type: 'modifier',
    description: 'All 6s',
    onActivate: (state) => ({
        damageRolls: state.damageRolls!.map(r => ({ ...r, value: 6 })),
        logs: addLogs(state.logs, {
            round: state.round,
            message: `Used ability: Critical strike. ${state.damageRolls!.length}d6 -> 6s`,
            type: 'info'
        })
    })
});
