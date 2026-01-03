import { registerAbility, AbilityContext } from '../../abilityRegistry';
import { createDamageBlockerAbility, isOpponentDamageRollPhase } from '../abilityFactories';
import { CombatState } from '../../../types/CombatState';
import { CharacterType } from '../../../types/Character';

registerAbility(createDamageBlockerAbility({
    name: 'Vanish',
    type: 'combat',
    description: 'Avoid damage after losing a round (still affected by passive damage like bleed/venom).',
    blockMessage: 'Disappeared from sight!',
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
