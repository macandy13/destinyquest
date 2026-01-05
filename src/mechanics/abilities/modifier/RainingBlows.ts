import { registerAbility } from '../../abilityRegistry';
import { modifyDamageRolls } from '../abilityFactories';
import { rollDice } from '../../../types/dice';

registerAbility({
    name: 'Raining Blows',
    type: 'modifier',
    description: "Every [6] rolled for damage allows an additional die roll.",
    onDamageRoll: (state, { owner }) => {
        return modifyDamageRolls(state, owner, (rolls) => {
            // Count 6s
            const sixes = rolls.filter(r => r.value === 6).length;
            if (sixes === 0) return rolls;

            const extraRolls = rollDice(sixes);
            return [...rolls, ...extraRolls];
        });
    }
});
