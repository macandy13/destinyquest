import { registerAbility } from '../../abilityRegistry';
import { addLogs, appendEffect } from '../../../types/CombatState';

registerAbility({
    name: 'Feral Fury',
    type: 'combat',
    description: 'Roll an extra die for your damage score.',
    onActivate: (state, { owner }) => {
        const newState = appendEffect(state, owner, {
            stats: { damageDice: 1 },
            source: 'Feral Fury',
            target: owner,
            duration: 1
        });
        return addLogs(newState, { round: state.round, message: "Used ability: Feral Fury.", type: 'info' });
    }
});
