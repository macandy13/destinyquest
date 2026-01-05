import { registerAbility } from '../../abilityRegistry';
import { createRetaliationAbility } from '../abilityFactories';

registerAbility(createRetaliationAbility({
    name: 'Riposte',
    type: 'combat',
    description: 'When taking health damage, inflict 1 damage die back (ignoring armour).',
    damageDice: 1,
}));
