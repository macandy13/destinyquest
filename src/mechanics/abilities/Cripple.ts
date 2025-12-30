import { registerAbility } from '../abilityRegistry';
import { addLog } from '../../utils/statUtils';
import { CombatState } from '../../types/combat';

function canActivate(state: CombatState): boolean {
    // Active ability triggered after dealing damage
    return state.damageDealt.some(d => d.target === 'enemy' && d.amount > 0);
}

registerAbility({
    name: 'Cripple',
    type: 'combat',
    description: "If you cause health damage, the opponent's speed score is lowered by 1 for the next three rounds.",
    canActivate: canActivate,
    onActivate: (state) => {
        if (!canActivate(state)) return null;
        return {
            modifications: [
                ...state.modifications,
                {
                    modification: { stats: { speed: -1 }, source: 'Cripple', target: 'enemy' },
                    id: `cripple-${state.round}`,
                    duration: 3
                }
            ],
            logs: addLog(state.logs, { round: state.round, message: "Used ability: Cripple. Enemy slowed!", type: 'info' })
        };
    }
});
