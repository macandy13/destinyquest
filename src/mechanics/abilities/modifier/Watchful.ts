import { registerAbility } from '../../abilityRegistry';
import { modifySpeedRolls } from '../abilityFactories';
import { getOpponent } from '../../../types/character';

registerAbility({
    name: 'Watchful',
    type: 'modifier',
    description: "Change an opponent's [6] result to a [1].",
    onSpeedRoll: (state, { owner }) => {
        // Assuming applies to Speed roll? Or Damage? Description doesn't specify.
        // Assuming Speed based on similar "Watchful" context (preventing crits/speed wins).
        // If it means damage, it would be "Change an opponent's [6] damage die".
        // Let's assume Speed for now as it's common for these types.

        // Actually, could be both? "Change an opponent's [6] result".
        // I'll implement for Speed for now.
        return modifySpeedRolls(state, getOpponent(owner), (rolls) => {
            // Change ALL 6s or just one? "Change an opponent's [6] result" (singular).
            // Change the first 6 found.
            const index = rolls.findIndex(r => r.value === 6);
            if (index === -1) return rolls;

            const newRolls = [...rolls];
            newRolls[index].value = 1;
            return newRolls;
        });
    }
});
