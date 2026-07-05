import { defineAbility, modifyStat } from '../builders';

defineAbility({
    name: 'Iron Will',
    type: 'modifier',
    description: 'Increase armour by 3 for one round.',
    effect: modifyStat({ armour: 3 }, 'owner', { duration: 1 }),
});
