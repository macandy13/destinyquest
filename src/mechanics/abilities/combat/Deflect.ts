import { registerAbility } from '../../abilityRegistry';
import { createReactionAbility } from '../abilityFactories';

registerAbility(createReactionAbility({
    name: 'Deflect',
    type: 'combat',
    description: 'Stops an opponent\'s damage after they win a round and automatically inflicts 2 damage dice (ignoring armour) to them.',
    damageDice: 2
}));
