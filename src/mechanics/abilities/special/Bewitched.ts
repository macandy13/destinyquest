import { registerAbility } from '../../abilityRegistry';
import { addLogs } from '../../../types/combatState';
import { formatDice, DiceRoll, rerollDie } from '../../../types/dice';

function rerollLowDice(rolls: DiceRoll[]): { newRolls: DiceRoll[], rerolled: boolean } {
    if (!rolls) return { newRolls: [], rerolled: false };

    let rerolled = false;
    const newRolls = rolls.map(die => {
        if (die.value <= 2 && !die.isRerolled) {
            rerolled = true;
            return rerollDie();
        }
        return die;
    });

    return { newRolls, rerolled };
}

registerAbility({
    name: 'Bewitched',
    type: 'special',
    description: 'Reroll any 1 or 2 dice results for Zalldell. The results of the rerolled dice must be used.',
    reviewed: false,
    icon: '🔮',
    onSpeedRoll: (state) => {
        const rolls = state.enemySpeedRolls;

        const { newRolls, rerolled } = rerollLowDice(rolls!);
        if (rerolled) {
            state = addLogs(state, {
                message: `Bewitched: Rerolling low dice (1s and 2s). ${formatDice(rolls!)} -> ${formatDice(newRolls)}`,
            });
            return {
                ...state,
                'enemySpeedRolls': newRolls
            };
        }

        return state;
    },
    onDamageRoll: (state) => {
        if (state.winner !== 'enemy') return state;

        const rolls = state.damage?.damageRolls;
        const { newRolls, rerolled } = rerollLowDice(rolls!);
        if (rerolled) {
            state = addLogs(state, {
                message: `Bewitched: Rerolled low damage dice. ${formatDice(rolls!)} -> ${formatDice(newRolls)}`,
            });
            return {
                ...state,
                damage: {
                    ...state.damage!,
                    damageRolls: newRolls
                }
            };
        }
        return state;
    }
});
