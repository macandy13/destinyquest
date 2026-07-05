import { defineAbility, modifyStat } from '../builders';

defineAbility({
    name: 'Might of Stone',
    type: 'modifier',
    description: 'Increase armour by 3 for one round.',
    effect: modifyStat({ armour: 3 }, 'owner', { duration: 1 }),
});
