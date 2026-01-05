import { registerAbility } from '../../abilityRegistry';

registerAbility({
    name: 'Sear',
    type: 'passive',
    description: 'Add 1 to each damage die for the duration of combat. Multiple sear items do not stack.',
    onDamageCalculate: (state, _context) => {
        // "Add 1 to each damage die".
        // We count number of dice and add that amount.
        return state.damage?.damageRolls?.length ?? 0;
    }
});
