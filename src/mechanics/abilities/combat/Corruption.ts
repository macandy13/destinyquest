import { registerAbility } from '../../abilityRegistry';
import { addLogs, appendEffect } from '../../../types/CombatState';
import { getOpponent } from '../../../types/Character';

registerAbility({
    name: 'Corruption',
    type: 'combat',
    description: "If you cause health damage, reduce the opponent's brawn or magic by 2 for the remainder of the combat.",
    onDamageDealt: (state, { owner }, _source, amount) => {
        if (amount <= 0) return state;
        const opponent = getOpponent(owner);
        state = appendEffect(state, opponent, {
            stats: { brawn: -2, magic: -2 },
            source: 'Corruption',
            target: opponent,
            duration: undefined
        });
        return addLogs(state, {
            message: "Used ability: Corruption. Enemy weakened!"
        });
    }
});
