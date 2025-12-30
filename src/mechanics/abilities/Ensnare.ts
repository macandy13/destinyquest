import { registerAbility } from '../abilityRegistry';
import { addLog } from '../../utils/statUtils';
import { CombatState } from '../../types/combat';

function canActivate(state: CombatState): boolean {
    // Activate anytime? Or specifically when attacking?
    // Usually used when opponent tries to dodge.
    // But since we can't react to opponent usage easily, we use it proactively to prevent dodge.
    // E.g. Activate Ensnare -> Opponent cannot use Dodge.
    return true;
}

registerAbility({
    name: 'Ensnare',
    type: 'combat',
    description: "Cancel an opponent's dodge ability (e.g., evade, vanish) and roll for damage as normal.",
    canActivate: canActivate,
    onActivate: (state) => {
        if (!canActivate(state)) return null;
        return {
            modifications: [
                ...state.modifications,
                {
                    modification: { stats: {}, source: 'Ensnare', target: 'enemy' },
                    id: `ensnare-${state.round}`,
                    duration: 1
                }
            ],
            logs: addLog(state.logs, { round: state.round, message: "Used ability: Ensnare. Opponent cannot dodge!", type: 'info' })
        };
    }
});
