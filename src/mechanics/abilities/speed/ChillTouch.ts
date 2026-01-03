import { registerAbility } from '../../abilityRegistry';
import { canModifySpeed, createStatModifierAbility } from '../abilityFactories';

registerAbility(createStatModifierAbility({
    name: 'Chill Touch',
    type: 'speed',
    description: "Reduce your opponent's speed by 2 for one round.",
    target: 'opponent',
    stats: { speed: -2 },
    duration: 1,
    canActivate: canModifySpeed,
}));
