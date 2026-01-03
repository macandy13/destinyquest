import { registerAbility } from '../../abilityRegistry';
import { createSpeedDiceModifier } from '../abilityFactories';

registerAbility(createSpeedDiceModifier({
    name: 'Adrenaline',
    description: 'Increase your speed by 2 for two combat rounds.',
    target: 'owner',
    speedModifier: 2,
    duration: 2,
}));
