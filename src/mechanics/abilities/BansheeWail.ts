import { registerAbility } from '../abilityRegistry';
import { CombatState } from '../../types/combat';

function canActivate(state: CombatState): boolean {
    return state.phase === 'damage-roll' && state.winner === 'enemy';
}

registerAbility({
    name: 'Banshee Wail',
    type: 'combat',
    description: 'Stop your opponent from rolling for damage when they have won a round.',
    canActivate: canActivate,
    onActivate: (state) => {
        if (!canActivate(state)) return null;

        return {
            phase: 'round-end',
            damageRolls: [{ value: 0, isRerolled: false }],
            logs: [...state.logs, { round: state.round, message: "Used ability: Banshee Wail. Opponent's attack silenced!", type: 'info' }]
        };
    }
});
