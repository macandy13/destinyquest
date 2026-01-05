import { registerAbility } from '../../abilityRegistry';
import { modifySpeedRolls } from '../abilityFactories';
import { rollDice } from '../../../types/dice';

registerAbility({
    name: 'Surefooted',
    type: 'modifier',
    description: "Re-roll all speed dice; you must accept the second result.",
    onSpeedRoll: (state, { owner }) => {
        return modifySpeedRolls(state, owner, (rolls) => {
            // Reroll all
            const count = rolls.length;
            if (count === 0) return rolls;
            const newRolls = rollDice(count);
            return newRolls.map(r => ({
                ...r,
                isRerolled: true
            }));
        });
    }
});
