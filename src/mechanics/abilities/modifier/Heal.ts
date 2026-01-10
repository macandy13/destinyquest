import { registerAbility } from '../../abilityRegistry';
import { healDamage, getCombatant } from '../../../types/combatState';

registerAbility({
    name: 'Heal',
    type: 'modifier',
    description: 'Instantly restore 4 health.',
    icon: '❤️',
    reviewed: true,
    canActivate: (state, { owner }) => {
        const char = getCombatant(state, owner);
        return char.stats.health < char.stats.maxHealth;
    },
    onActivate: (state, { owner }) => {
        return healDamage(state, 'Heal', owner, 4);
    }
});
