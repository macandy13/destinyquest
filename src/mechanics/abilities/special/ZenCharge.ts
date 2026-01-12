
import { AbilityDefinition, registerAbility } from '../../abilityRegistry';
import { appendEffect } from '../../../types/combatState';

export const ZenCharge: AbilityDefinition = {
    name: 'Zen Charge',
    type: 'special',
    description: 'Zen can roll 3 dice of speed in the first round of combat. Immune to any abilities that reduce his speed dice for this first round.',
    icon: '⚡',
    reviewed: false,
    onRoundStart: (state, { owner }) => {
        if (state.round === 1) {
            // We assume base speed dice is 2, so adding 1 makes it 3.
            state = appendEffect(state, owner, {
                stats: { speedDice: 1 },
                source: 'Zen Charge',
                target: owner,
                duration: 1,
                description: 'Rolling 3 speed dice'
            });
            // TODO: Speed dice modification immunity
        }
        return state;
    }
};
registerAbility(ZenCharge);
