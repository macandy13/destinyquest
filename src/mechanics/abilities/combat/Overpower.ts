import { registerAbility } from '../../abilityRegistry';
import { createReactionAbility } from '../abilityFactories';

registerAbility(createReactionAbility({
    name: 'Overpower',
    type: 'combat',
    description: 'Stop an opponent\'s damage after they win a round and automatically inflict 2 damage dice (ignoring armour).',
    damageDice: 2, // Renamed from counterDamageDice
}));
