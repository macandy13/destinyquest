import { defineAbility, heal } from '../builders';
import { getCombatant } from '../../../types/combatState';

defineAbility({
    name: 'Heal',
    type: 'modifier',
    icon: '❤️',
    description: 'Instantly restore 4 health.',
    canActivate: (state, { owner }) => {
        const char = getCombatant(state, owner);
        return char.stats.health < char.stats.maxHealth;
    },
    effect: heal(4, 'owner'),
});
