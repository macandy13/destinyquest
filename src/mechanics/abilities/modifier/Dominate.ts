import { modifyDamageRolls } from '../../../types/combatState';
import { registerAbility } from '../../abilityRegistry';

registerAbility({
    name: 'Dominate',
    type: 'modifier',
    description: "Change the result of one damage die to a [6].",
    onDamageRoll: (state) => {
        // TODO: Add interaction
        const minIndex = state.damage!.damageRolls.reduce((iMin, x, i, arr) => x.value < arr[iMin].value ? i : iMin, 0);

        const newRolls = [...state.damage!.damageRolls];
        newRolls[minIndex] = { ...newRolls[minIndex], value: 6 };
        return modifyDamageRolls(state, newRolls, 'Dominate');
    }
});
