import { defineAbility } from '../builders';
import { healDamage } from '../../../types/combatState';

defineAbility({
    name: 'Vampirism',
    type: 'modifier',
    description: 'Heal for half the amount of health damage you inflict (rounding up).',
    // TODO: Only do once.
    onDamageDealt: (state, { owner }, source, amount) => {
        if (amount <= 0 && source !== 'Attack') return state;

        const healAmount = Math.ceil(amount / 2);
        return healDamage(state, 'Vampirism', owner, healAmount);
    }
});
