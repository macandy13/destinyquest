import { registerAbility } from '../../abilityRegistry';
import { createStatModifierAbility } from '../abilityFactories';

registerAbility(createStatModifierAbility({
    name: 'Bright Shield',
    type: 'modifier',
    description: 'Raise your armour by 4 for one combat round.',
    stats: {
        armour: 4
    },
    duration: 1
}));
