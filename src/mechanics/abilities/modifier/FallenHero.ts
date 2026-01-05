import { registerAbility } from '../../abilityRegistry';
import { healDamage, appendEffect } from '../../../types/combatState';

registerAbility({
    name: 'Fallen Hero',
    type: 'modifier',
    description: 'Raise brawn by 3 for one round and heal 10 health.',
    onActivate: (state, { owner }) => {
        state = healDamage(state, 'Fallen Hero', owner, 10);
        return appendEffect(state, owner, {
            stats: { brawn: 3 },
            source: 'Fallen Hero',
            target: owner,
            duration: 1
        });
    }
});
