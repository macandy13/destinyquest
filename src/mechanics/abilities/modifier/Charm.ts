import { addLogs, CombatState, InteractionResponse } from '../../../types/combatState';
import { rerollSelectedDie, formatDice } from '../../../types/dice';
import { registerAbility } from '../../abilityRegistry';

registerAbility({
    name: 'Charm',
    type: 'modifier',
    description: 'Re-roll one of your hero\'s dice; you must accept the second result.',
    icon: '🎲',
    canActivate: (state) => state.phase === 'speed-roll' || (state.phase === 'damage-roll' && state.winner === 'hero'),
    onActivate: (state, context) => {
        if (!context.ability) return state;
        let target: 'damage' | 'hero-speed';
        if (state.phase === 'damage-roll' && state.winner === 'hero') {
            target = 'damage';
        } else if (state.phase === 'speed-roll') {
            target = 'hero-speed';
        } else {
            return state;
        }

        // TODO: Turn into modifier function
        state = {
            ...state,
            pendingInteraction: {
                ability: context.ability,
                requests: [{
                    type: 'dice',
                    target: 'hero',
                    mode: 'select',
                    count: 1,
                }],
                callback: (state: CombatState, responses: InteractionResponse[]) => {
                    if (responses.length === 0) return state;
                    const response = responses[0];
                    state = {
                        ...state,
                    };
                    let newDice;
                    if (target === 'hero-speed') {
                        state.heroSpeedRolls = rerollSelectedDie(state.heroSpeedRolls!, response.selectedIndexes[0]);
                        newDice = formatDice(state.heroSpeedRolls!);
                    } else if (target === 'damage') {
                        state.damage!.damageRolls = rerollSelectedDie(state.damage!.damageRolls!, response.selectedIndexes[0]);
                        newDice = formatDice(state.damage!.damageRolls!);
                    } else {
                        return state;
                    }
                    state = addLogs(state, {
                        message: `Rerolled die for ${context.ability!.name}, new rolls: ${newDice}`,
                    });
                    return state;
                }
            }
        };
        return addLogs(
            state,
            { message: `Select a ${target === 'damage' ? 'damage' : 'speed'} die to re-roll.` }
        );
    },
});
