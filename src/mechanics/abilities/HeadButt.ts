import { registerAbility } from '../abilityRegistry';
import { addLog } from '../../utils/statUtils';
import { CombatState } from '../../types/combat';
import { CharacterType } from '../../types/stats';

function canActivate(state: CombatState, _owner: CharacterType): boolean {
    return state.phase === 'damage-roll' && state.winner === 'enemy';
}

registerAbility({
    name: 'Head Butt',
    type: 'combat',
    description: 'Prevent an opponent from rolling damage, ending the round immediately.',
    canActivate: canActivate,
    onActivate: (state, owner) => {
        if (!canActivate(state, owner)) return null;

        return {
            phase: 'round-end',
            damageRolls: [{ value: 0, isRerolled: false }],
            logs: addLog(state.logs, { round: state.round, message: "Used ability: Head Butt. Stopped attack!", type: 'info' })
        };
    }
});
