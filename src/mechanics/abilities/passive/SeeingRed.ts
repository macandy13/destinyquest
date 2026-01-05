import { registerAbility } from '../../abilityRegistry';
import { getCombatant, appendEffect, removeEffect } from '../../../types/combatState';

registerAbility({
    name: 'Seeing Red',
    type: 'passive',
    description: 'If health is 20 or less, increase speed by 2.',
    onPassiveAbility: (state, { owner }) => {
        const char = getCombatant(state, owner);
        if (char.stats.health <= 20) {
            return appendEffect(state, owner, {
                stats: { speed: 2 },
                source: 'Seeing Red',
                target: owner,
                duration: undefined
            });
        }
        return removeEffect(state, owner, 'Seeing Red');
    },
});
