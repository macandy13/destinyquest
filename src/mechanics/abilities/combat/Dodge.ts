import { registerAbility } from '../../abilityRegistry';
import { createDamageBlockerAbility, isEnemyDamageRollPhase } from '../abilityFactories';
import { CombatState } from '../../../types/combat';
import { CharacterType } from '../../../types/stats';

registerAbility(createDamageBlockerAbility({
    name: 'Dodge',
    type: 'combat',
    description: 'Avoid taking damage from an opponent after losing a round (still affected by passive damage like bleed/venom).',
    blockMessage: 'Evaded attack!',
    canActivate: (state: CombatState, _owner: CharacterType) => {
        const isDisabled = state.activeEffects.some(e => e.modification.source === 'Ensnare' || e.modification.source === 'Hamstring');
        return !isDisabled && isEnemyDamageRollPhase(state);
    }
}));
