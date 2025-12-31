import { registerAbility } from '../abilityRegistry';
import { createStatModifierAbility } from './abilityFactories';

registerAbility(createStatModifierAbility({
    name: 'Courage',
    type: 'speed',
    description: 'Increase speed by 4 for one combat round.',
    stats: { speed: 4 },
    duration: 1,
    target: 'hero'
}));
