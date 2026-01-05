import { registerAbility } from '../../abilityRegistry';
import { createReactionAbility } from '../abilityFactories';

registerAbility(createReactionAbility({
    name: 'Parry',
    type: 'combat',
    description: 'Stop an opponent from rolling for damage after they win a round.',
    icon: '🛡️'
}));
