import { registerAbility } from '../../abilityRegistry';
import { createDamageBlockerAbility } from '../abilityFactories';

registerAbility(createDamageBlockerAbility({
    name: 'Parry',
    type: 'combat',
    description: 'Stop an opponent from rolling for damage after they win a round.',
    icon: '🛡️'
}));
