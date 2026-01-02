import { registerAbility } from '../abilityRegistry';
import { addLog } from '../../utils/statUtils';
import { CombatState } from '../../types/combat';
import { CharacterType } from '../../types/stats';

function canActivate(state: CombatState, _owner: CharacterType): boolean {
    return state.phase === 'round-end'
        && state.winner === 'hero'
        && state.damageDealt.some(d => d.target === 'enemy'
            && d.amount > 0
            && d.source === 'Attack');
}

registerAbility({
    name: 'Corruption',
    type: 'combat',
    description: "If you cause health damage, reduce the opponent's brawn or magic by 2 for the remainder of the combat.",
    canActivate: canActivate,
    onActivate: (state, owner) => {
        if (!canActivate(state, owner)) return null;
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
