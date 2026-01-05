import { registerAbility } from '../../abilityRegistry';
import { createStatModifierAbility } from '../abilityFactories';

registerAbility(createStatModifierAbility({
    name: 'Might of Stone',
    type: 'modifier',
    description: 'Increase armour by 3 for one round.',
    stats: {
        armour: 3
    },
    duration: 1
}));
