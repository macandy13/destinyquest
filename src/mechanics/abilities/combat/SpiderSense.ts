import { registerAbility, AbilityContext } from '../../abilityRegistry';
import { createReactionAbility, isOpponentDamageRollPhase } from '../abilityFactories';
import { getCombatant, CombatState } from '../../../types/combatState';

registerAbility(createReactionAbility({
    name: 'Spider sense',
    type: 'combat',
    description: 'Avoid damage after losing a round (still affected by passive damage like bleed/venom).',
    // Logic similar to Vanish/Evade
    canActivate: (state: CombatState, { owner }: AbilityContext) => {
        const cancellationEffects = ['Ensnare', 'Hamstring'];
        const agent = getCombatant(state, owner);
        if (!agent) return false;

        const isDisabled = agent.activeEffects
            .some(effect => cancellationEffects.includes(effect.source));

        if (isDisabled) return false;

        return isOpponentDamageRollPhase(state, { owner });
    }
}));
