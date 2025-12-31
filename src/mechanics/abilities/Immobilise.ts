import { registerAbility } from '../abilityRegistry';
import { createStatModifierAbility } from './abilityFactories';

registerAbility(createStatModifierAbility({
    name: 'Immobilise',
    type: 'speed',
    description: "Reduce opponent's speed dice by 1 for one round.",
    stats: { speed: -1 },
    duration: 1,
    target: 'enemy'
}));
