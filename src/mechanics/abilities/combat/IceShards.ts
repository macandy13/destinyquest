import { registerAbility, AbilityContext } from '../../abilityRegistry';
import { CombatState, dealDamage } from '../../../types/CombatState';

function canActivate(state: CombatState, _context: AbilityContext): boolean {
    // TODO: Should this be possible on round-end? Does this trigger the right things?
    return (state.phase === 'damage-roll' || state.phase === 'round-end') && state.winner === 'hero';
}

registerAbility({
    name: 'Ice Shards',
    type: 'combat',
    description: 'After winning a round, automatically inflict damage equal to your magic score (ignoring armour) to one opponent.',
    canActivate: canActivate,
    onActivate: (state, context) => {
        if (!canActivate(state, context)) return state;

        const enemy = state.enemy;
        if (!enemy) return state;

        const magic = state.hero?.stats.magic || 0;

        return dealDamage(state, 'Ice Shards', 'enemy', magic);
    }
});
