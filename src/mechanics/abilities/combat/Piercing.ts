import { registerAbility } from '../../abilityRegistry';
import { appendEffect } from '../../../types/CombatState';
import { getOpponent } from '../../../types/Character';

registerAbility({
    name: 'Piercing',
    type: 'combat',
    description: 'Ignore armour',
    onActivate: (state, { owner }) => {
        const opponent = getOpponent(owner);
        const reduction = -(state[opponent].stats.armour || 0);
        return appendEffect(state, opponent, {
            stats: { armour: reduction },
            source: 'Piercing',
            target: opponent,
            duration: 1
        });
    }
});
