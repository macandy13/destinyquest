import { registerAbility } from '../../abilityRegistry';
import { canModifySpeed, createStatModifierAbility } from '../abilityFactories';

registerAbility(createStatModifierAbility({
    name: 'Windblast',
    type: 'speed',
    description: "Reduce opponent's speed dice by 1 for one round.",
    stats: { speedDice: -1 },
    duration: 1,
    target: 'opponent',
    canActivate: canModifySpeed,
}));
