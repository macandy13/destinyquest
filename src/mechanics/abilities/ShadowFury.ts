import { registerAbility } from '../abilityRegistry';
import { addLogs } from '../../utils/statUtils';

registerAbility({
    name: 'Shadow Fury',
    type: 'combat',
    description: 'Add speed of both main and left-hand weapons to your damage score.',
    onActivate: (state) => {
        const mh = state.hero?.original.equipment.mainHand;
        const oh = state.hero?.original.equipment.leftHand;

        const mhSpeed = mh?.stats?.speed || 0;
        const ohSpeed = oh?.stats?.speed || 0;

        const bonus = mhSpeed + ohSpeed;

        return {
            modifications: [
                ...state.modifications,
                { modification: { stats: { damageModifier: bonus }, source: 'Shadow Fury', target: 'hero' }, id: `shadow-fury-${state.round}`, duration: 1 }
            ],
            logs: addLogs(state.logs, { round: state.round, message: `Used ability: Shadow Fury (+${bonus} Damage).`, type: 'info' })
        };
    }
});
