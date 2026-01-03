import { registerAbility } from '../../abilityRegistry';
import { healDamage } from '../../../types/CombatState';

registerAbility({
    name: 'Heal',
    type: 'modifier',
    description: 'Instantly restore 4 health.',
    icon: '❤️',
    canActivate: (state, { owner }) => state[owner].stats.health < state[owner].stats.maxHealth,
    onActivate: (state, { owner }) => {
        return healDamage(state, 'Heal', owner, 4);
    }
});
