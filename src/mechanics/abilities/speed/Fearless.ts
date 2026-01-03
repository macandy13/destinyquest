import { registerAbility } from '../../abilityRegistry';
import { canModifySpeed, createStatModifierAbility } from '../abilityFactories';

registerAbility(createStatModifierAbility({
    name: 'Fearless',
    type: 'speed',
    description: 'Raise speed by 2 for one round.',
    target: 'owner',
    stats: { speed: 2 },
    duration: 1,
    canActivate: canModifySpeed,
}));
