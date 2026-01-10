import { registerAbility } from '../../abilityRegistry';
import { appendEffect, getCombatant } from '../../../types/combatState';
import { getOpponent } from '../../../types/character';

registerAbility({
    name: 'Piercing',
    type: 'combat',
    description: 'Ignore armour',
    reviewed: true,
    onActivate: (state, { owner }) => {
        const opponent = getOpponent(owner);
        const opponentChar = getCombatant(state, opponent);
        const reduction = -(opponentChar.stats.armour || 0);
        // TODO: Set the armour to 0
        return appendEffect(state, opponent, {
            stats: { armour: reduction },
            source: 'Piercing',
            target: opponent,
            duration: 1
        });
    }
});
