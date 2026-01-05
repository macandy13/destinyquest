import { registerAbility } from '../../abilityRegistry';
import { modifyDamageRolls } from '../abilityFactories';

registerAbility({
    name: 'Dominate',
    type: 'modifier',
    description: "Change the result of one damage die to a [6].",
    onDamageRoll: (state, { owner }) => {
        return modifyDamageRolls(state, owner, (rolls) => {
            if (rolls.length === 0) return rolls;
            // Simple logic: Change the lowest die to 6.
            const minIndex = rolls.reduce((iMin, x, i, arr) => x.value < arr[iMin].value ? i : iMin, 0);

            const newRolls = [...rolls];
            newRolls[minIndex] = { ...newRolls[minIndex], value: 6, isRerolled: true };
            return newRolls;
        });
    }
});
