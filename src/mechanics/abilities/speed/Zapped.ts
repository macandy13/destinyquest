import { registerAbility } from '../../abilityRegistry';
import { createStatModifierAbility } from '../abilityFactories';
import { canModifySpeed } from '../abilityFactories';

registerAbility(createStatModifierAbility({
    name: 'Zapped!',
    type: 'speed',
    description: "Lower opponent's speed, brawn, and magic by 3 until the end of the round.",
    stats: { speed: -3, brawn: -3, magic: -3 },
    target: 'opponent',
    duration: 1,
    canActivate: canModifySpeed,
}));
