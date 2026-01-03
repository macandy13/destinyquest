import { registerAbility } from '../../abilityRegistry';
import { createStatModifierAbility } from '../abilityFactories';

registerAbility(createStatModifierAbility({
    name: 'Haste',
    type: 'speed',
    description: 'Roll an extra die for attack speed for one round.',
    stats: { speed: 1 },
    duration: 1
}));
