import { registerAbility } from '../abilityRegistry';

registerAbility({
    name: 'Acid',
    type: 'passive',
    description: 'Add 1 to the result of each die you roll for your damage score.',
    onDamageCalculate: (_state, _owner, _target, { rolls }) => {
        // Add 1 per die rolled
        return rolls.length;
    },
});
