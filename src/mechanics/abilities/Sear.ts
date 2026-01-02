import { registerAbility } from '../abilityRegistry';

registerAbility({
    name: 'Sear',
    type: 'passive',
    description: 'Add 1 to each damage die for the duration of combat. Multiple sear items do not stack.',
    onDamageCalculate: (_state, _target, { rolls }) => {
        // "Add 1 to each damage die".
        // rolls is array of { value, isRerolled }.
        // We count number of dice and add that amount.
        return rolls.length;
    }
});
