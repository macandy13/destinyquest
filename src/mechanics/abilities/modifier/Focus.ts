import { defineAbility, modifyStat } from '../builders';

defineAbility({
    name: 'Focus',
    type: 'modifier',
    description: 'Raise magic by 3 for one round.',
    effect: modifyStat({ magic: 3 }, 'owner', { duration: 1 }),
});
