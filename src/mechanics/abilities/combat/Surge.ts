import { registerAbility } from '../../abilityRegistry';
import { addLogs, appendEffect } from '../../../types/combatState';

registerAbility({
    name: 'Surge',
    type: 'combat',
    description: 'Increase magic by 3, but lower speed by 1 in the next round.',
    onActivate: (state, { owner }) => {
        let newState = appendEffect(state, owner, {
            stats: { magic: 3 },
            source: 'Surge (Magic)',
            target: owner,
            duration: 1
        });

        newState = appendEffect(newState, owner, {
            stats: { speed: -1 },
            source: 'Surge (Speed)',
            target: owner,
            duration: 2
        });

        return addLogs(newState, { round: state.round, message: "Used ability: Surge.", type: 'info' });
    }
});
