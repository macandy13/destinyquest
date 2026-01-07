import { registerAbility } from '../../abilityRegistry';
import { appendEffect } from '../../../types/combatState';
import { Stats } from '../../../types/stats';

registerAbility({
    name: 'Savagery',
    type: 'modifier',
    description: 'Raise brawn or magic by 2 for one round.',
    onActivate: (state, context) => {
        if (!context.ability) return state;
        return {
            ...state,
            pendingInteraction: {
                ability: context.ability,
                requests: [{
                    target: 'hero',
                    type: 'choices',
                    mode: 'select',
                    count: 1,
                    choices: ['Brawn', 'Magic']
                }],
                callback: (currentState, responses) => {
                    if (responses.length !== 1) return currentState;
                    const choiceIndex = responses[0].selectedIndexes[0];
                    const statMap: (keyof Stats)[] = ['brawn', 'magic'];
                    const attribute = statMap[choiceIndex];
                    if (!attribute) return currentState;
                    return appendEffect(currentState, 'hero', {
                        stats: { [attribute]: 2 },
                        source: context.ability!.name,
                        target: 'hero',
                        duration: 1,
                        visible: true
                    });
                }
            }
        };
    }
});
