import { registerAbility } from '../abilityRegistry';
import { CombatState } from '../../types/combat';

function canActivate(state: CombatState): boolean {
    return state.phase === 'damage-roll' && state.winner === 'enemy';
}

registerAbility({
    name: 'Parry',
    type: 'combat',
    description: 'Stop an opponent from rolling for damage after they win a round.',
    canActivate: canActivate,
    icon: '🛡️',
    onActivate: (state) => {
        if (!canActivate(state)) return null;

        return {
            phase: 'round-end',
            damageRolls: [{ value: 0, isRerolled: false }], // No damage
            logs: [...state.logs, { round: state.round, message: "Used ability: Parry. Opponent's attack blocked!", type: 'info' }]
        };
    }
});
