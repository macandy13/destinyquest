import { registerAbility } from '../../abilityRegistry';
import { createSpeedDiceModifier } from '../abilityFactories';

registerAbility(createSpeedDiceModifier({
    name: 'Curse',
    description: 'Reduce the number of dice your opponent rolls for attack speed by 1 for one round.',
    target: 'opponent',
    speedModifier: -1,
    duration: 1,
}));
