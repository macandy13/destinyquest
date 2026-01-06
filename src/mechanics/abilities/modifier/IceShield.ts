import { registerAbility } from '../../abilityRegistry';
import { createStatModifierAbility } from '../abilityFactories';


registerAbility(createStatModifierAbility({
    name: 'Ice Shield',
    type: 'modifier',
    description: 'Add 1 die to your armour score for one round.',
    stats: {
        // TODO: This should be determined by a die.
        armour: 3
    },
    duration: 1
}));
