import { registerAbility } from '../../abilityRegistry';
import { createSpeedDiceModifier } from '../abilityFactories';

registerAbility(createSpeedDiceModifier({
    name: "Cat's Speed",
    description: 'Roll an extra die to determine attack speed for one round.',
    target: 'owner',
    speedModifier: 1,
    duration: 1,
}));
