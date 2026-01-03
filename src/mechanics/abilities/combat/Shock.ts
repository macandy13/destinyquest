import { registerAbility } from '../../abilityRegistry';
import { dealDamage } from '../../../types/combat';

registerAbility({
    name: 'Shock!',
    type: 'combat',
    description: "If causing health damage, inflict 1 extra damage for every 2 points of opponent's armour.",
    onDamageDealt: (state, owner, target, amount) => {
        // Trigger if we deal damage to enemy causing health damage (amount > 0)
        if (owner === target || amount <= 0) return {};

        const oppArmour = state[target]!.stats.armour || 0;
        const extra = Math.floor(oppArmour / 2);
        if (extra <= 0) return {};

        return dealDamage(state, 'Shock!', target, extra);
    }
});
