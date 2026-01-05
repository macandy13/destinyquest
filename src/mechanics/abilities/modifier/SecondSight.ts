import { registerAbility } from '../../abilityRegistry';
import { modifyDamageRolls } from '../abilityFactories';
import { getOpponent } from '../../../types/character';

registerAbility({
    name: 'Second Sight',
    type: 'modifier',
    description: "Lower all opponent's damage dice by 2.",
    onDamageRoll: (state, { owner }) => {
        const opponent = getOpponent(owner);
        return modifyDamageRolls(state, opponent, (rolls) => {
            return rolls.map(r => ({
                ...r,
                value: Math.max(1, r.value - 2),
            }));
        });
    }
});
