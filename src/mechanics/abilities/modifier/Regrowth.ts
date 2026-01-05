import { registerAbility } from '../../abilityRegistry';
import { healDamage } from '../../../types/combatState';

registerAbility({
    name: 'Regrowth',
    type: 'modifier',
    description: 'Instantly restore 6 health. Multiple items can each be used once.',
    onActivate: (state, { owner }) => {
        return healDamage(state, 'Regrowth', owner, 6);
    }
});
