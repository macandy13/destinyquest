import { registerAbility } from '../abilityRegistry';
import { addLog } from '../../utils/statUtils';

registerAbility({
    name: 'Impale',
    type: 'combat',
    description: "Increase damage score by 3; opponent's speed is lowered by 1 in the next round.",
    onActivate: (state) => {
        return {
            modifications: [
                ...state.modifications,
                { modification: { stats: { damageModifier: 3 }, source: 'Impale', target: 'hero' }, id: `impale-dmg-${state.round}`, duration: 1 },
                { modification: { stats: { speed: -1 }, source: 'Impale', target: 'enemy' }, id: `impale-speed-${state.round}`, duration: 2 }
            ],
            logs: addLog(state.logs, { round: state.round, message: "Used ability: Impale.", type: 'info' })
        };
    }
});
