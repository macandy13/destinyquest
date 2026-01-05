import { registerAbility } from '../../abilityRegistry';
import { addLogs, appendEffect, getCombatant } from '../../../types/combatState';
import { getOpponent } from '../../../types/character';
import { canModifyArmour } from '../abilityFactories';

registerAbility({
    name: 'Fatal Blow',
    type: 'combat',
    description: "Ignore half of your opponent's armour (rounding up).",
    canActivate: (state) => canModifyArmour(state),
    onActivate: (state, { owner }) => {
        const opponent = getOpponent(owner);
        const opponentChar = getCombatant(state, opponent);
        const armour = opponentChar.stats.armour || 0;
        const reduction = -Math.ceil(armour / 2);
        state = appendEffect(state, opponent, {
            stats: { armour: reduction },
            source: 'Fatal Blow',
            target: opponent,
            duration: 1
        });
        return addLogs(state, {
            message: "Used ability: Fatal Blow."
        });
    },
});
