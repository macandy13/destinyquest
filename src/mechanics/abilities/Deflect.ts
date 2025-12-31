import { registerAbility } from '../abilityRegistry';
import { createDamageBlockerAbility } from './abilityFactories';

registerAbility(createDamageBlockerAbility({
    name: 'Deflect',
    type: 'combat',
    description: 'Stops an opponent\'s damage after they win a round and automatically inflicts 2 damage dice (ignoring armour) to them.',
    counterDamageDice: 2
}));
