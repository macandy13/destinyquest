import { registerAbility } from '../../abilityRegistry';
import { createStatModifierAbility } from '../abilityFactories';

registerAbility(createStatModifierAbility({
    name: 'Savagery',
    type: 'modifier',
    description: 'Raise brawn or magic by 2 for one round.',
    // TODO: Implement choice. Defaulting to Brawn.
    stats: {
        brawn: 2
    },
    duration: 1
}));
