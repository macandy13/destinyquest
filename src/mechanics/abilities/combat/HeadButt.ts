import { registerAbility, AbilityContext } from '../../abilityRegistry';
import { CombatState, skipDamagePhase } from '../../../types/combatState';

function canActivate(state: CombatState, _context: AbilityContext): boolean {
    return state.phase === 'damage-roll' && state.winner === 'enemy';
}

registerAbility({
    name: 'Head Butt',
    type: 'combat',
    description: 'Prevent an opponent from rolling damage, ending the round immediately.',
    canActivate: canActivate,
    onActivate: (state, context) => {
        if (!canActivate(state, context)) return state;

        return skipDamagePhase(state, "Used ability: Head Butt. Stopped attack!");
    }
});
