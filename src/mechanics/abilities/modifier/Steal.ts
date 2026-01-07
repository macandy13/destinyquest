import { registerAbility } from '../../abilityRegistry';
import { appendEffect } from '../../../types/combatState';
import { Stats } from '../../../types/stats';

registerAbility({
    name: 'Steal',
    type: 'modifier',
    description: 'Raise one attribute (speed, brawn, magic, or armour) to match your opponent\'s for one round.',
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
                    choices: ['Speed', 'Brawn', 'Magic', 'Armour']
                }],
                callback: (currentState, responses) => {
                    if (responses.length !== 1) return currentState;
                    const choiceIndex = responses[0].selectedIndexes[0];
                    const statMap: (keyof Stats)[] = ['speed', 'brawn', 'magic', 'armour'];
                    const attribute = statMap[choiceIndex];

                    if (!attribute) return currentState;

                    const enemyValue = currentState.enemy.stats[attribute] ?? 0;
                    const heroValue = currentState.hero.stats[attribute] ?? 0;
                    const diff = Math.max(0, enemyValue - heroValue);

                    if (diff > 0) {
                        return appendEffect(currentState, 'hero', {
                            stats: { [attribute]: diff },
                            source: context.ability!.name,
                            target: 'hero',
                            duration: 1,
                            visible: true
                        });
                    }
                    return currentState;
                }
            }
        };
    }
});
