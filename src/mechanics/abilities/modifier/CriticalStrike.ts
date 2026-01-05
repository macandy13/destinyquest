import { addLogs, setDamageRoll } from '../../../types/combatState';
import { deterministicRoll, formatDice } from '../../../types/dice';
import { registerAbility } from '../../abilityRegistry';
import { canModifyDamage } from '../abilityFactories';

registerAbility({
    name: 'Critical Strike',
    type: 'modifier',
    description: 'All 6s',
    canActivate: canModifyDamage,
    onActivate: (state) => {
        const damageRoll = deterministicRoll(new Array(state.damage!.damageRolls.length).fill(6));
        state = setDamageRoll(state, damageRoll);
        return addLogs(state, {
            message: `Used ability: Critical strike. New damage roll: ${formatDice(damageRoll)}`,
        })
    }
});
