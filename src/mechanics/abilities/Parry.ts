import { registerAbility } from '../abilityRegistry';

registerAbility({
    name: 'Parry',
    type: 'combat',
    description: 'Stop an opponent from rolling for damage after they win a round.',
    canActivate: (state) => {
        return state.phase === 'damage-roll' && state.winner === 'enemy';
    },
    icon: '🛡️',
    onActivate: (state) => {
        // Can only be used in damage-roll phase if enemy won
        if (state.phase === 'damage-roll' && state.winner === 'enemy') {
            return {
                phase: 'round-end',
                damageRolls: [{ value: 0, isRerolled: false }], // No damage
                logs: [...state.logs, { round: state.round, message: "Used ability: Parry. Opponent's attack blocked!", type: 'info' }]
            };
        }
        return null; // Invalid usage
    }
});
