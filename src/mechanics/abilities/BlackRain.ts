import { registerAbility } from '../abilityRegistry';
import { addLog } from '../../utils/statUtils';
import { CombatState } from '../../types/combat';

function canActivate(state: CombatState): boolean {
    // TODO: Check for bow in left hand
    return state.phase === 'damage-roll' && state.winner === 'hero';
}

registerAbility({
    name: 'Black Rain',
    type: 'combat',
    description: '(Requires bow in left hand). Instead of rolling damage after winning a round, roll 1 damage die and apply the result to each opponent, ignoring their armour.',
    canActivate: canActivate,
    onActivate: (state) => {
        if (!canActivate(state)) return null;

        // "Apply result to each opponent". Currently supports single enemy, but structure allows multiple if needed.
        // We target 'enemy'.
        // TODO: Handle multiple enemies. With a single enemy we can keep the current damage roll.

        return {
            phase: 'round-end',
            logs: addLog(state.logs, { round: state.round, message: `Black Rain keeps damage rolling.`, type: 'warning' })
        };
    }
});
