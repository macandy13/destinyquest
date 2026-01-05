import { registerAbility } from '../../abilityRegistry';
import { addLogs } from '../../../types/combatState';
import { isOpponentDamageRollPhase } from '../abilityFactories';


registerAbility({
    name: 'Command',
    type: 'combat',
    description: 'When an opponent wins a round, halt their attack and roll for damage yourself as if you had won the round.',
    canActivate: isOpponentDamageRollPhase,
    onActivate: (state, { owner }) => {
        state = {
            ...state,
            winner: owner,
        };
        return addLogs(state, {
            message: "Used ability: Command. Seized the initiative!",
        });
    }
});
