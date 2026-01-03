import { registerAbility } from '../../abilityRegistry';
import { canModifySpeed, createStatModifierAbility } from '../abilityFactories';

registerAbility(createStatModifierAbility({
    name: 'Courage',
    type: 'speed',
    description: 'Increase speed by 4 for one combat round.',
    target: 'owner',
    stats: { speed: 4 },
    duration: 1,
    canActivate: canModifySpeed,
}));
