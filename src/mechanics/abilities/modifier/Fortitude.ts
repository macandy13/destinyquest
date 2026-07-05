import { defineAbility, modifyStat } from '../builders';

defineAbility({
    name: 'Fortitude',
    type: 'modifier',
    description: 'Raise brawn or armour by 3 for one round.',
    // TODO: Implement choice. Defaulting to Brawn for now.
    effect: modifyStat({ brawn: 3 }, 'owner', { duration: 1 }),
});
