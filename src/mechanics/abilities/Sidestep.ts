import { registerAbility } from '../abilityRegistry';
import { createStatModifierAbility } from './abilityFactories';

registerAbility(createStatModifierAbility({
    name: 'Sidestep',
    type: 'combat',
    description: 'Avoid damage',
    stats: { armour: 200 },
    duration: 1,
    target: 'hero'
}));
