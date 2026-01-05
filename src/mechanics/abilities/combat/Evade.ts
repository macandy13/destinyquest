import { registerAbility, AbilityContext } from '../../abilityRegistry';
import { CombatState, skipDamagePhase, hasEffect } from '../../../types/combatState';
import { isOpponentDamageRollPhase } from '../abilityFactories';

function canActivate(state: CombatState, context: AbilityContext): boolean {
    const cancellationEffects = ['Ensnare', 'Hamstring'];
    // Check if ANY cancellation effect is active on the owner
    const isRestricted = cancellationEffects.some(effectSource => hasEffect(state, context.owner, effectSource));

    return isOpponentDamageRollPhase(state, context) && !isRestricted;
}

registerAbility({
    name: 'Evade',
    type: 'combat',
    description: 'Avoid damage after losing a round (still affected by passive damage like bleed/venom).',
    canActivate: canActivate,
    onActivate: (state, context) => {
        if (!canActivate(state, context)) return state;

        return skipDamagePhase(state, "Used ability: Evade. Avoided attack!");
    }
});
