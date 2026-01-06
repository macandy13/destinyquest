import { registerAbility } from '../../abilityRegistry';
import { modifySpeedRolls } from '../abilityFactories';
import { getOpponent } from '../../../types/character';

registerAbility({
    name: 'Watchful',
    type: 'modifier',
    description: "Change an opponent's [6] result to a [1].",
    onSpeedRoll: (state, { owner }) => {
        // TODO: Make a pending interaction
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
