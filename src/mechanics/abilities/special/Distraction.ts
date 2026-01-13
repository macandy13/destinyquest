import { AbilityDefinition, registerAbility } from '../../abilityRegistry';
import { rollDie } from '../../../types/dice';
import { addLogs } from '../../../types/combatState';

export const Distraction: AbilityDefinition = {
    name: 'Distraction',
    type: 'special',
    description: 'When you lose a round, roll a die. If you roll a 1 or 2, skip the damage roll for this round.',
    icon: '🎭',
    reviewed: false,
    onDamageRoll: (state) => {
        if (!state.winner || state.winner !== 'enemy') return state;

        const roll = rollDie().value;
        if (roll <= 2) {
            state = {
                ...state,
                damage: { damageRolls: [], modifiers: [] },
                winner: null
            };
            state = addLogs(state, {
                message: `Distraction rolled a ${roll}! Skipping damage roll.`
            });
        } else {
            state = addLogs(state, {
                message: `Distraction rolled a ${roll}, no effect.`
            });
        }
        return state;
    }
};

registerAbility(Distraction);
