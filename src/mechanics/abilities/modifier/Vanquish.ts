import { defineAbility, modifyStat } from '../builders';

defineAbility({
    name: 'Vanquish',
    type: 'modifier',
    description: 'Raise brawn by 2 for one round.',
    effect: modifyStat({ brawn: 2 }, 'owner', { duration: 1 }),
});
