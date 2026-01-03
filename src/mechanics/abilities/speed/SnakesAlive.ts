import { registerAbility } from '../../abilityRegistry';
import { createStatModifierAbility, canModifySpeed } from '../abilityFactories';

registerAbility(createStatModifierAbility({
    name: 'Snakes Alive!',
    type: 'speed',
    description: "Lower opponent's speed by 2 for one round.",
    stats: { speed: -2 },
    duration: 1,
    canActivate: canModifySpeed,
}));
