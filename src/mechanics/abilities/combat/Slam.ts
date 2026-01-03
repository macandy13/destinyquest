import { registerAbility } from '../../abilityRegistry';
import { addLogs, appendEffect } from '../../../types/CombatState';
import { CombatState } from '../../../types/CombatState';
import { CharacterType, getOpponent } from '../../../types/Character';

function canActivate(state: CombatState, owner: CharacterType): boolean {
    // Check if opponent is winner.
    // Slam: "Stop opponent's damage after they win a round"
    return state.phase === 'damage-roll' && state.winner === getOpponent(owner);
}

registerAbility({
    name: 'Slam',
    type: 'combat',
    description: "Stop opponent's damage after they win a round; reduce their speed by 1 in the next round.",
    canActivate: (state, { owner }) => canActivate(state, owner),
    onActivate: (state, { owner }) => {
        if (!canActivate(state, owner)) return state;

        const opponent = getOpponent(owner);
        let newState = appendEffect(state, opponent, {
            stats: { speed: -1 },
            source: 'Slam',
            target: opponent,
            duration: 2
        });

        // Block damage
        newState = {
            ...newState,
            phase: 'round-end',
            damage: {
                damageRolls: [],
                modifiers: []
            },
            logs: addLogs(newState.logs, { round: state.round, message: "Used ability: Slam. Blocked attack and slowed opponent.", type: 'info' })
        };
        return newState;
    }
});
