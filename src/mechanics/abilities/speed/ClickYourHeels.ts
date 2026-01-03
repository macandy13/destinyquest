import { registerAbility } from '../../abilityRegistry';
import { canModifySpeed, createStatModifierAbility } from '../abilityFactories';

registerAbility(createStatModifierAbility({
    name: 'Click Your Heels',
    type: 'speed',
    description: 'Raise speed by 2 for one combat round.',
    target: 'owner',
    stats: { speed: 2 },
    duration: 1,
    canActivate: canModifySpeed,
}));
