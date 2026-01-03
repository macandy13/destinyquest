import { registerAbility } from '../../abilityRegistry';
import { addLogs } from '../../../utils/statUtils';
import { CombatState } from '../../../types/combat';
import { CharacterType, getOpponent } from '../../../types/stats';

function opponentHasDodge(state: CombatState, opponent: CharacterType): boolean {
    const dodgeAbilities = new Set(['Dodge', 'Evade', 'Vanish']);
    return state.activeAbilities.some(a => a.owner === opponent && dodgeAbilities.has(a.name));
}

registerAbility({
    name: 'Ensnare',
    type: 'combat',
    description: "Cancel an opponent's dodge ability (e.g., evade, vanish) and roll for damage as normal.",
    canActivate: opponentHasDodge,
    onActivate: (state, owner) => {
        if (!opponentHasDodge(state, getOpponent(owner))) return {};
        // TODO: Handle ensnare
        return {
            modifications: [
                ...state.modifications,
                {
                    modification: {
                        source: 'Ensnare',
                        target: getOpponent(owner),
                        stats: {},
                    },
                    id: `ensnare-${state.round}`,
                    duration: 1
                }
            ],
            logs: addLogs(state.logs, {
                round: state.round,
                message: "Used ability: Ensnare. Opponent cannot dodge!",
                type: 'info'
            })
        };
    }
});
