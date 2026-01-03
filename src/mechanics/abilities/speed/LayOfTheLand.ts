import { registerAbility } from '../../abilityRegistry';
import { createSpeedDiceModifier } from '../abilityFactories';

registerAbility(createSpeedDiceModifier({
    name: 'Lay of the Land',
    description: 'Add one extra die to attack speed for one round.',
    target: 'owner',
    speedModifier: 1,
    duration: 1,
}));
