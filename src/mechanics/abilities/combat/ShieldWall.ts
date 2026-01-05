import { registerAbility } from '../../abilityRegistry';
import { addLogs, dealDamage, getCombatant } from '../../../types/combatState';
import { rollDice, sumDice } from '../../../types/dice';
import { appendEffect } from '../../../types/combatState';
import { getOpponent } from '../../../types/character';

registerAbility({
    name: 'Shield Wall',
    type: 'combat',
    description: '(Requires shield in left hand). Double your armour score and inflict 1 damage die (ignoring armour) to the opponent.',
    canActivate: (state, { owner }) => {
        // TODO: Validation of shield left hand?
        return !!state.winner
            && state.winner !== owner
            && !['passive-damage', 'round-end', 'combat-end'].includes(state.phase);
    },
    onActivate: (state, { owner }) => {
        const char = getCombatant(state, owner);
        const armour = char.stats.armour || 0;
        state = appendEffect(state, owner, {
            stats: { armour: armour },
            source: 'Shield Wall',
            target: owner,
            duration: 1
        });

        const damage = sumDice(rollDice(1));
        state = dealDamage(state, 'Shield Wall', getOpponent(owner), damage, `Shield Wall rolled ${damage} 1d6`);

        return addLogs(state, {
            message: `Used ability: Shield Wall. Armour doubled (+${armour}).`,
        });
    }
});
