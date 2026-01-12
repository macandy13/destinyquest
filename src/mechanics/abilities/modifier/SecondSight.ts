import { modifyDamageRolls } from '../../../types/combatState';
import { registerAbility } from '../../abilityRegistry';

registerAbility({
    name: 'Second Sight',
    type: 'modifier',
    description: "Lower all opponent's damage dice by 2.",
    onDamageRoll: (state, { owner }) => {
        if (state.winner === owner) return state;
        const newRolls = state.damage!.damageRolls.map(r => ({
            ...r,
            value: Math.max(1, r.value - 2),
        }));
        return modifyDamageRolls(state, newRolls, 'Second Sight');
    }
});
