import { healDamage } from '../../types/combat';
import { registerAbility } from '../abilityRegistry';

registerAbility({
    name: 'Cleansing Light',
    type: 'passive',
    description: 'Automatically heal for 2 health at the end of each round.',
    onRoundEnd: (state, owner) => {
        const beneficiary = state[owner];
        if (!beneficiary) return {};

        return healDamage(state, 'Cleansing Light', owner, 2);
    }
});
