import { registerAbility } from '../../abilityRegistry';
import { createStatModifierAbility } from '../abilityFactories';

registerAbility(createStatModifierAbility({
    name: 'Vanquish',
    type: 'modifier',
    description: 'Raise brawn by 2 for one round.',
    stats: {
        brawn: 2
    },
    duration: 1
}));
