
import { AbilityDefinition, registerAbility } from '../../abilityRegistry';
import { appendEffect, removeEffect } from '../../../types/combatState';

export const Downsized: AbilityDefinition = {
    name: 'Downsized',
    type: 'special',
    description: 'For every 10 health that the Centipede loses, one of its body segments is destroying its speed and branch (brawn) by 1 each time.',
    reviewed: false,
    onRoundStart: (state, { owner }) => {
        const char = state[owner];
        const lost = char.stats.maxHealth - char.stats.health;
        const stacks = Math.floor(lost / 10);

        // Always refresh the effect
        if (stacks > 0) {
            state = removeEffect(state, owner, 'Downsized');
            state = appendEffect(state, owner, {
                stats: { speed: -stacks, brawn: -stacks },
                source: 'Downsized',
                target: owner,
                duration: undefined,
                description: `Lost segments: -${stacks} Speed/Brawn`
            });
        }
        return state;
    }
};

registerAbility(Downsized);
