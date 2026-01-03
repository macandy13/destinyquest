import { registerAbility } from '../../abilityRegistry';
import { createDamageDiceModifier } from '../abilityFactories';

registerAbility(createDamageDiceModifier({
    name: 'Deep Wound',
    description: 'Roll an extra die when determining your damage score.',
    target: 'owner',
    damageModifier: 1,
    duration: 1,
}));
