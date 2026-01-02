import { registerAbility } from '../abilityRegistry';
import { addLog } from '../../utils/statUtils';
import { CombatState } from '../../types/combat';
import { CharacterType } from '../../types/stats';

function canActivate(state: CombatState, owner: CharacterType): boolean {
    return state.phase === 'damage-roll' && state.winner === 'enemy';
}

registerAbility({
    name: 'Command',
    type: 'combat',
    description: 'When an opponent wins a round, halt their attack and roll for damage yourself as if you had won the round.',
    canActivate: canActivate,
    onActivate: (state) => {
        if (!canActivate(state)) return null;

        return {
            winner: 'hero',
            logs: addLog(state.logs, { round: state.round, message: "Used ability: Command. Seized the initiative!", type: 'info' })
        };
    }
});
