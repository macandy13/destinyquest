import { registerAbility } from '../abilityRegistry';
import { createDamageBlockerAbility, isEnemyDamageRollPhase } from './abilityFactories';
import { CombatState } from '../../types/combat';

registerAbility(createDamageBlockerAbility({
    name: 'Vanish',
    type: 'combat',
    description: 'Avoid damage after losing a round (still affected by passive damage like bleed/venom).',
    blockMessage: 'Disappeared from sight!',
    canActivate: (state: CombatState) => {
        const isDisabled = state.activeEffects.some(e => e.modification.source === 'Ensnare' || e.modification.source === 'Hamstring');
        return !isDisabled && isEnemyDamageRollPhase(state);
    }
}));
