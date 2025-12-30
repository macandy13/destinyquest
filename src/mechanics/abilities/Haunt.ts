import { registerAbility } from '../abilityRegistry';
import { addLog } from '../../utils/statUtils';
import { hasDouble } from '../../utils/dice';

registerAbility({
    name: 'Haunt',
    type: 'combat',
    description: 'Summon a spirit to inflict 2 damage (ignoring armour) to one opponent at the end of every round until you roll a double.',
    onActivate: (state) => {
        // Activate to summon spirit
        return {
            modifications: [
                ...state.modifications,
                {
                    modification: { stats: {}, source: 'Haunt Spirit', target: 'enemy' },
                    id: `haunt-${state.round}`, // Infinite duration until removed
                    duration: undefined
                }
            ],
            logs: addLog(state.logs, { round: state.round, message: "Used ability: Haunt. Spirit summoned!", type: 'info' })
        };
    },
    onRoundEnd: (state, target) => {
        // Inflict damage if spirit active
        const hasSpirit = state.activeEffects.some(e => e.modification.source === 'Haunt Spirit');
        if (!hasSpirit || target !== 'enemy') return {};

        return {
            damageDealt: [...state.damageDealt, { target: 'enemy', amount: 2, source: 'Haunt' }],
            logs: addLog(state.logs, { round: state.round, message: "Haunt spirit inflicts 2 damage.", type: 'damage-enemy' })
        };
    },
    // Check for "Roll a double" to dispel
    onSpeedRoll: (state, rolls) => {
        // If hero rolls double? "until you roll a double".
        if (hasDouble(rolls)) {
            const hasSpirit = state.activeEffects.some(e => e.modification.source === 'Haunt Spirit');
            if (hasSpirit) {
                // Remove spirit
                return {
                    activeEffects: state.activeEffects.filter(e => e.modification.source !== 'Haunt Spirit'),
                    logs: addLog(state.logs, { round: state.round, message: "Rolled a double! Haunt spirit dispelled.", type: 'info' })
                };
            }
        }
        return {};
    }
});
