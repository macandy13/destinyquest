import { registerAbility } from '../../abilityRegistry';
import { appendEffect } from '../../../types/combatState';

registerAbility({
    name: 'Pound',
    type: 'combat',
    description: 'Increase damage score by 3, but lower your speed by 1 in the next round.',
    onActivate: (state, { owner }) => {
        state = appendEffect(state, owner, {
            stats: { damageModifier: 3 },
            source: 'Pound (Damage)',
            target: owner,
            duration: 1
        });
        return appendEffect(state, owner, {
            stats: { speed: -1 },
            source: 'Pound (Speed)',
            target: owner,
            duration: 2
        });
    }
});
