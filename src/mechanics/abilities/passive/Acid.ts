import { registerAbility } from '../../abilityRegistry';

registerAbility({
    name: 'Acid',
    type: 'passive',
    description: 'Add 1 to the result of each die you roll for your damage score.',
    reviewed: true,
    onDamageCalculate: (state) => {
        // Add 1 per die rolled
        return state.damage?.damageRolls.length ?? 0;
    },
});
