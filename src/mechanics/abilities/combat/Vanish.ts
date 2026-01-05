import { registerAbility, AbilityContext } from '../../abilityRegistry';
import { createReactionAbility, isOpponentDamageRollPhase } from '../abilityFactories';
import { CombatState } from '../../../types/CombatState';

registerAbility(createReactionAbility({
    name: 'Vanish',
    type: 'combat',
    description: 'Avoid damage after losing a round (still affected by passive damage like bleed/venom).',
    blockAttack: true,
    canActivate: (state: CombatState, { owner }: AbilityContext) => {
        const cancellationEffects = ['Ensnare', 'Hamstring'];
        const agent = state[owner];
        if (!agent) return false;

        const isDisabled = agent.activeEffects
            .some(e => e.target === owner &&
                cancellationEffects.includes(e.source));
        return !isDisabled && isOpponentDamageRollPhase(state, { owner });
    }
}));
