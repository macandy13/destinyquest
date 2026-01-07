import { addLogs } from '../../../types/combatState';
import { formatDice, rerollSelectedDie } from '../../../types/dice';
import { registerAbility } from '../../abilityRegistry';
import { canModifyDamage, canModifySpeed } from '../abilityFactories';

registerAbility({
    name: 'Last Laugh',
    type: 'modifier',
    description: 'Reroll enemy die',
    canActivate: (state) => canModifySpeed(state) || (canModifyDamage(state) && state.winner === 'enemy'),
    onActivate: (state, context) => {
        if (!context.ability) return state;
        let target: 'damage' | 'enemy-speed';
        if (state.phase === 'damage-roll' && state.winner === 'enemy') {
            target = 'damage';
        } else if (state.phase === 'speed-roll') {
            target = 'enemy-speed';
        } else {
            return state;
        }
        state = {
            ...state,
            pendingInteraction: {
                ability: context.ability,
                requests: [
                    {
                        type: 'dice',
                        target: 'enemy',
                        mode: 'select',
                        count: 1,
                    }
                ],
                callback: (state, responses) => {
                    if (responses.length === 0) return state;
                    const response = responses[0];
                    state = {
                        ...state,
                    };
                    let newDice;
                    if (target === 'enemy-speed') {
                        state.enemySpeedRolls = rerollSelectedDie(state.enemySpeedRolls!, response.selectedIndexes[0]);
                        newDice = formatDice(state.enemySpeedRolls!);
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
    }
});


