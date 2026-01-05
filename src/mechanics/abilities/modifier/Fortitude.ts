import { registerAbility } from '../../abilityRegistry';
import { createStatModifierAbility } from '../abilityFactories';

registerAbility(createStatModifierAbility({
    name: 'Fortitude',
    type: 'modifier',
    description: 'Raise brawn or armour by 3 for one round.',
    // TODO: Implement choice. Defaulting to Brawn for now.
    stats: {
        brawn: 3
    },
    duration: 1
}));
