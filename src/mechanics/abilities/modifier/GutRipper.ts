import { modifyDamageRolls } from '../../../types/combatState';
import { registerAbility } from '../../abilityRegistry';

registerAbility({
    name: 'Gut Ripper',
    type: 'modifier',
    description: "Change all damage dice results to [6].",
    onDamageRoll: (state) => {
        const newRolls = state.damage?.damageRolls.map(r => ({ ...r, value: 6 }));
        return modifyDamageRolls(state, newRolls!, 'Gut Ripper');
    }
});
