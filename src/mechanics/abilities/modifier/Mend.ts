import { registerAbility } from '../../abilityRegistry';
import { healDamage } from '../../../types/combatState';

registerAbility({
    name: 'Mend',
    type: 'modifier',
    description: 'Heal yourself or an ally for 15 health.',
    onActivate: (state, { owner }) => {
        return healDamage(state, 'Mend', owner, 15);
    }
});
