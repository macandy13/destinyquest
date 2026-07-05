import { defineAbility, modifyStat } from '../builders';

defineAbility({
    name: 'Ice Shield',
    type: 'modifier',
    description: 'Add 1 die to your armour score for one round.',
    // TODO: This should be determined by a die.
    effect: modifyStat({ armour: 3 }, 'owner', { duration: 1 }),
});
