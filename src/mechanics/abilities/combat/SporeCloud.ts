import { registerAbility } from '../../abilityRegistry';
import { createRetaliationAbility } from '../abilityFactories';

registerAbility(createRetaliationAbility({
    name: 'Spore Cloud',
    type: 'combat',
    description: 'When taking health damage, inflict 2 damage dice back (ignoring armour).',
    damageDice: 2,
}));
