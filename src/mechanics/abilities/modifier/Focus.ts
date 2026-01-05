import { registerAbility } from '../../abilityRegistry';
import { createStatModifierAbility } from '../abilityFactories';

registerAbility(createStatModifierAbility({
    name: 'Focus',
    type: 'modifier',
    description: 'Raise magic by 3 for one round.',
    stats: {
        magic: 3
    },
    duration: 1
}));
