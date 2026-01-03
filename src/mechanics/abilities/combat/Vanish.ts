import { registerAbility } from '../../abilityRegistry';
import { createDamageBlockerAbility, isOpponentDamageRollPhase } from '../abilityFactories';
import { CombatState } from '../../../types/combat';
import { CharacterType } from '../../../types/stats';

registerAbility(createDamageBlockerAbility({
    name: 'Vanish',
    type: 'combat',
    description: 'Avoid damage after losing a round (still affected by passive damage like bleed/venom).',
    blockMessage: 'Disappeared from sight!',
    canActivate: (state: CombatState, owner: CharacterType) => {
        const cancellationEffects = ['Ensnare', 'Hamstring'];
        const isDisabled = state.activeEffects
            .some(e => e.modification.target === owner &&
                cancellationEffects.includes(e.modification.source));
        return !isDisabled && isOpponentDamageRollPhase(state, owner);
    }
}));
