import { registerAbility } from '../../abilityRegistry';
import { dealDamage } from '../../../types/CombatState';
import { getOpponent } from '../../../types/Character';

registerAbility({
    name: 'Lightning',
    type: 'passive',
    description: 'Every time you take health damage, automatically inflict 2 damage back (ignoring armour). Multiple lightning items do not stack.',
    // TODO: Is this really every time, i.e outside of attacks?
    onDamageDealt: (state, { owner, target }, _source, amount) => {
        if (owner !== target || amount <= 0) return state;

        const opponent = getOpponent(target);
        return dealDamage(state, 'Lightning', opponent, 2);
    }
});
