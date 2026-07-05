import { defineAbility, modifyStat } from '../builders';

defineAbility({
    name: 'Bright Shield',
    type: 'modifier',
    description: 'Raise your armour by 4 for one combat round.',
    effect: modifyStat({ armour: 4 }, 'owner', { duration: 1 }),
});
