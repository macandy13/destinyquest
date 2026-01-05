import { registerAbility } from '../../abilityRegistry';
import { addLogs, appendEffect } from '../../../types/combatState';


registerAbility({
    name: 'Disrupt',
    type: 'combat',
    description: "If you cause health damage, lower the opponent's magic score by 3 for the remainder of the combat.",
    onDamageDealt: (state, { target }, _source, amount) => {
        if (amount <= 0) return state;
        state = appendEffect(state, target!, {
            stats: { magic: -3 },
            source: 'Disrupt',
            target: target!,
            duration: undefined,
        });
        return addLogs(state, {
            message: "Used ability: Disrupt. Enemy weakened!"
        });
    },
});
