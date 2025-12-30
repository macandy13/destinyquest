import { registerAbility } from '../abilityRegistry';
import { addLog } from '../../utils/statUtils';
import { CombatState } from '../../types/combat';

function canActivate(state: CombatState): boolean {
    return state.damageDealt.some(d => d.target === 'enemy' && d.amount > 0);
}

registerAbility({
    name: 'Disrupt',
    type: 'combat',
    description: "If you cause health damage, lower the opponent's magic score by 3 for the remainder of the combat.",
    canActivate: canActivate,
    onActivate: (state) => {
        if (!canActivate(state)) return null;
        return {
            modifications: [
                ...state.modifications,
                {
                    modification: { stats: { magic: -3 }, source: 'Disrupt', target: 'enemy' },
                    id: `disrupt-${state.round}`,
                    duration: undefined
                }
            ],
            logs: addLog(state.logs, { round: state.round, message: "Used ability: Disrupt. Enemy magic weakened!", type: 'info' })
        };
    }
});
