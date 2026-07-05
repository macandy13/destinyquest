import { registerAbility } from '../../abilityRegistry';
import { healDamage, getCombatant } from '../../../types/combatState';

registerAbility({
    name: 'Regrowth',
    type: 'modifier',
    description: 'Instantly restore 6 health. Multiple items can each be used once.',
    canActivate: (state, { owner }) => {
        const char = getCombatant(state, owner);
        return char.stats.health < char.stats.maxHealth;
    },
    onActivate: (state, { owner }) => {
        return healDamage(state, 'Regrowth', owner, 6);
    }
});
