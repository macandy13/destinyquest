import { registerAbility } from '../../abilityRegistry';
import { addLogs } from '../../../utils/statUtils';
import { CombatState } from '../../../types/combat';
import { CharacterType } from '../../../types/stats';

function canActivate(state: CombatState, _owner: CharacterType): boolean {
    // TODO: Handle for hero as well
    return state.winner === 'enemy';
}

registerAbility({
    name: 'Hamstring',
    type: 'combat',
    description: "Cancel an opponent's dodge (e.g., evade, sidestep) and roll for damage as normal.",
    canActivate: canActivate,
    onActivate: (state, owner) => {
        if (!canActivate(state, owner)) return null;
        return {
            modifications: [
                ...state.modifications,
                {
                    modification: { stats: {}, source: 'Hamstring', target: 'enemy' },
                    id: `hamstring-${state.round}`,
                    duration: 1
                }
            ],
            logs: addLogs(state.logs, { round: state.round, message: "Used ability: Hamstring. Opponent cannot dodge!", type: 'info' })
        };
    }
});
