import { AbilityContext, registerAbility } from '../../abilityRegistry';
import { isEnemyDamageRollPhase } from '../abilityFactories';
import { CombatState, hasEffect, skipDamagePhase } from '../../../types/combatState';

registerAbility({
    name: 'Dodge',
    type: 'combat',
    description: 'Avoid taking damage from an opponent after losing a round (still affected by passive damage like bleed/venom).',
    canActivate: (state: CombatState, { owner }: AbilityContext) => {
        const isDisabled = hasEffect(state, owner, 'Ensnare') || hasEffect(state, owner, 'Hamstring');
        return !isDisabled && isEnemyDamageRollPhase(state);
    },
    onActivate: (state: CombatState) => {
        return skipDamagePhase(state, 'Dodge');
    },
});
