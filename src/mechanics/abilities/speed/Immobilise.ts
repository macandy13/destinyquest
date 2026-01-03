import { registerAbility } from '../../abilityRegistry';
import { createStatModifierAbility, canModifySpeed } from '../abilityFactories';

registerAbility(createStatModifierAbility({
    name: 'Immobilise',
    type: 'speed',
    description: "Reduce opponent's speed dice by 1 for one round.",
    target: 'opponent',
    stats: { speedDice: -1 },
    duration: 1,
    canActivate: canModifySpeed,
}));
