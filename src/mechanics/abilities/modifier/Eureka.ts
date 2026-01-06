import { registerAbility } from '../../abilityRegistry';
import { createStatModifierAbility } from '../abilityFactories';

registerAbility(createStatModifierAbility({
    name: 'Eureka',
    type: 'modifier',
    description: 'Raise speed, brawn, or magic by 1 for one round. Used once per combat.',
    // TODO: Implement choice. Defaulting to Brawn.
    stats: {
        brawn: 1
    },
    duration: 1
}));
