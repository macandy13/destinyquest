import { registerAbility } from '../../abilityRegistry';
import { createStatModifierAbility } from '../abilityFactories';

registerAbility(createStatModifierAbility({
    name: 'Quicksilver',
    type: 'speed',
    description: 'Increase speed by 2 for one round.',
    stats: { speed: 2 },
    duration: 1,
    target: 'hero'
}));
