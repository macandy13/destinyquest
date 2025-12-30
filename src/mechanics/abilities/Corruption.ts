import { registerAbility } from '../abilityRegistry';
import { addLog } from '../../utils/statUtils';
import { CombatState } from '../../types/combat';

function canActivate(state: CombatState): boolean {
    // Can activate if we just dealt damage this round
    return state.damageDealt.some(d => d.target === 'enemy' && d.amount > 0 && d.source !== 'Corruption');
}

registerAbility({
    name: 'Corruption',
    type: 'combat',
    description: "If you cause health damage, reduce the opponent's brawn or magic by 2 for the remainder of the combat.",
    canActivate: canActivate,
    onActivate: (state) => {
        if (!canActivate(state)) return null;
        return {
            modifications: [
                ...state.modifications,
                {
                    modification: { stats: { brawn: -2, magic: -2 }, source: 'Corruption', target: 'enemy' }, // "Remainder of combat" -> no duration? Or indefinitely? Assuming infinite.
                    id: `corruption-${state.round}`,
                    duration: undefined
                }
            ],
            logs: addLog(state.logs, { round: state.round, message: "Used ability: Corruption. Enemy weakened!", type: 'info' })
        };
    }
});
