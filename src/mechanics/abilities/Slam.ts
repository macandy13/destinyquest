import { registerAbility } from '../abilityRegistry';
import { addLog } from '../../utils/statUtils';
import { CombatState } from '../../types/combat';
import { CharacterType } from '../../types/stats';

function canActivate(state: CombatState, _owner: CharacterType): boolean {
    return state.phase === 'damage-roll' && state.winner === 'enemy';
}

registerAbility({
    name: 'Slam',
    type: 'combat',
    description: "Stop opponent's damage after they win a round; reduce their speed by 1 in the next round.",
    canActivate: canActivate,
    onActivate: (state, owner) => {
        if (!canActivate(state, owner)) return null;

        return {
            phase: 'round-end',
            damageRolls: [{ value: 0, isRerolled: false }],
            modifications: [
                ...state.modifications,
                { modification: { stats: { speed: -1 }, source: 'Slam', target: 'enemy' }, id: `slam-speed-${state.round}`, duration: 2 }
            ],
            logs: addLog(state.logs, { round: state.round, message: "Used ability: Slam. Blocked attack and slowed opponent.", type: 'info' })
        };
    }
});
