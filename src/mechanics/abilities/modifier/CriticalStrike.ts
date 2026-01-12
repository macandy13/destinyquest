import { modifyDamageRolls } from '../../../types/combatState';
import { deterministicRoll } from '../../../types/dice';
import { registerAbility } from '../../abilityRegistry';
import { canModifyDamage } from '../abilityFactories';

registerAbility({
    name: 'Critical Strike',
    type: 'modifier',
    description: 'All 6s',
    canActivate: canModifyDamage,
    onActivate: (state) => {
        const damageRoll = deterministicRoll(
            new Array(state.damage!.damageRolls.length)
                .fill(6));
        return modifyDamageRolls(state, damageRoll, 'Critical Strike');
    }
});
