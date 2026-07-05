import { defineAbility, modifyStat } from '../builders';

defineAbility({
    name: 'Eureka',
    type: 'modifier',
    description: 'Raise speed, brawn, or magic by 1 for one round. Used once per combat.',
    // TODO: Implement choice. Defaulting to Brawn.
    effect: modifyStat({ brawn: 1 }, 'owner', { duration: 1 }),
});
