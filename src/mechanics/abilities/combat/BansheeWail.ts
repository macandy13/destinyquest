import { registerAbility } from '../../abilityRegistry';
import { addLogs } from '../../../utils/statUtils';
import { isOpponentDamageRollPhase } from '../abilityFactories';


registerAbility({
    name: 'Banshee Wail',
    type: 'combat',
    description: 'Stop your opponent from rolling for damage when they have won a round.',
    canActivate: isOpponentDamageRollPhase,
    onActivate: (state, owner) => {
        if (!isOpponentDamageRollPhase(state, owner)) return null;

        return {
            phase: 'round-end',
            damageRolls: [],
            logs: addLogs(state.logs, {
                round: state.round,
                message: "Used ability: Banshee Wail. Opponent's attack silenced!",
                type: 'info'
            })
        };
    }
});
