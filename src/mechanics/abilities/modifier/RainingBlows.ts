import { registerAbility } from '../../abilityRegistry';
import { rollDice } from '../../../types/dice';
import { modifyDamageRolls } from '../../../types/combatState';

registerAbility({
    name: 'Raining Blows',
    type: 'modifier',
    description: "Every [6] rolled for damage allows an additional die roll.",
    onDamageRoll: (state) => {
        // Count 6s
        const sixes = state.damage!.damageRolls.filter(r => r.value === 6).length;
        if (sixes === 0) return state;

        const extraRolls = rollDice(sixes);
        const newRolls = [...state.damage!.damageRolls, ...extraRolls];
        return modifyDamageRolls(state, newRolls, 'Raining Blows');
    }
});
