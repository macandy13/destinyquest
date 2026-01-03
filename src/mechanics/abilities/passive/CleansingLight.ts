import { healDamage } from '../../../types/CombatState';
import { registerAbility } from '../../abilityRegistry';

registerAbility({
    name: 'Cleansing Light',
    type: 'passive',
    description: 'Automatically heal for 2 health at the end of each round.',
    onPassiveAbility: (state, { owner }) => {
        return healDamage(state, 'Cleansing Light', owner, 2);
    }
});
