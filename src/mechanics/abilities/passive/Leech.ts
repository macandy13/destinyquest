import { registerAbility } from '../../abilityRegistry';
import { healDamage } from '../../../types/combatState';

registerAbility({
    name: 'Leech',
    type: 'passive',
    description: 'Restore 2 health every time you cause health damage (cannot exceed max health).',
    onDamageDealt: (state, { owner, target }, _source, amount) => {
        if (owner === target || amount <= 0) return state;
        return healDamage(state, 'Leech', owner, 2);
    }
});
