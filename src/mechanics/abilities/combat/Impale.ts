import { registerAbility } from '../../abilityRegistry';
import { addLogs, appendEffect } from '../../../types/combatState';
import { getOpponent } from '../../../types/character';

registerAbility({
    name: 'Impale',
    type: 'combat',
    description: "Increase damage score by 3; opponent's speed is lowered by 1 in the next round.",
    onActivate: (state, { owner }) => {
        let newState = appendEffect(state, owner, {
            stats: { damageModifier: 3 },
            source: 'Impale (Damage)',
            target: owner,
            duration: 1
        });

        const opponent = getOpponent(owner);
        newState = appendEffect(newState, opponent, {
            stats: { speed: -1 },
            source: 'Impale (Slow)',
            target: opponent,
            duration: 2
        });

        return addLogs(newState, { round: state.round, message: "Used ability: Impale.", type: 'info' });
    }
});
