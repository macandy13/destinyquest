import { registerAbility } from '../../abilityRegistry';
import { addLogs } from '../../../utils/statUtils';
import { hasDouble } from '../../../utils/dice';
import { dealDamage, Modification } from '../../../types/combat';
import { CharacterType, getOpponent } from '../../../types/stats';

function isHaunted(effect: Modification, opponent: CharacterType) {
    return effect.modification.source === 'Haunt Spirit' &&
        effect.modification.target === opponent;
}

registerAbility({
    name: 'Haunt',
    type: 'combat',
    description: 'Summon a spirit to inflict 2 damage (ignoring armour) to one opponent at the end of every round until you roll a double.',
    canActivate: (state) => {
        // TODO: Also implement for enemy
        const opponent = 'enemy';
        const hasSpirit = state.activeEffects.some(e => isHaunted(e, opponent));
        return !hasSpirit;
    },
    onActivate: (state) => {
        // Activate to summon spirit
        return {
            modifications: [
                ...state.modifications,
                {
                    modification: {
                        stats: {},
                        source: 'Haunt Spirit',
                        target: 'enemy'
                    },
                    id: `haunt-${state.round}`, // Infinite duration until removed
                    duration: undefined
                }
            ],
            logs: addLogs(state.logs, { round: state.round, message: "Used ability: Haunt. Spirit summoned!", type: 'info' })
        };
    },
    // Check for "Roll a double" to dispel
    onSpeedRoll: (state, source, rolls) => {
        // If hero rolls double? "until you roll a double".
        if (hasDouble(rolls)) {
            const opponent = getOpponent(source);
            const hasSpirit = state.activeEffects.some(e => isHaunted(e, opponent));
            if (hasSpirit) {
                // Remove spirit
                return {
                    activeEffects: state.activeEffects.filter(
                        e => !isHaunted(e, opponent)),
                    logs: addLogs(state.logs, {
                        round: state.round,
                        message: "Rolled a double! Haunt spirit dispelled.",
                        type: 'info'
                    })
                };
            }
        }
        return {};
    },
    onRoundEnd: (state, owner) => {
        // Inflict damage if spirit active
        const opponent = getOpponent(owner);
        const hasSpirit = state.activeEffects.some(e => isHaunted(e, opponent));
        if (!hasSpirit) return {};
        return dealDamage(state, 'Haunt', opponent, 2);
    },
});

