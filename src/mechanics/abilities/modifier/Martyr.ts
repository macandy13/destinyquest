import { registerAbility } from '../../abilityRegistry';
import { skipDamagePhase, dealDamage } from '../../../types/combatState';
import { isOpponentDamageRollPhase } from '../abilityFactories';

registerAbility({
    name: 'Martyr',
    type: 'modifier',
    description: 'Choose to lose 5 health instead of taking the result of an opponent\'s damage.',
    canActivate: isOpponentDamageRollPhase,
    onActivate: (state, { owner }) => {
        state = skipDamagePhase(state, "Martyr used: Taking 5 damage instead of roll.");
        return dealDamage(state, 'Martyr', owner, 5);
    }
});
