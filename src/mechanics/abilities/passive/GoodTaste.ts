import { AbilityDefinition } from '../../abilityRegistry';
import { CombatState, addLogs, applyEffect } from '../../../types/combatState';
import { BackpackItem } from '../../../types/hero';
import { rollDice, sumDice } from '../../../types/dice';

export const goodTaste: AbilityDefinition = {
    name: 'Good taste',
    type: 'passive',
    description: 'Add 1 die result to the benefit of any backpack item used to increase magic.',
    icon: '🍷',
    onBackpackItemUse: (state: CombatState, context: any, item: BackpackItem): CombatState => {
        if (context.owner === 'hero' && item.effect.stats.magic && item.effect.stats.magic > 0) {
            const rolledIncrease = sumDice(rollDice(1));
            state = applyEffect(state, {
                source: 'Good taste',
                target: 'hero',
                stats: { magic: rolledIncrease },
                duration: item.effect.duration,
                visible: true,
                description: 'Good taste bonus'
            });
            state = addLogs(state, {
                message: `Good taste boosts the potion effect by ${rolledIncrease}!`
            });
        }
        return state;
    }
};
