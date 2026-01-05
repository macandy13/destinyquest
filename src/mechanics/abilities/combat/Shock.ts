import { registerAbility, AbilityContext } from '../../abilityRegistry';
import { dealDamage, CombatState, getCombatant } from '../../../types/combatState';

registerAbility({
    name: 'Shock!',
    type: 'combat',
    description: "If causing health damage, inflict 1 extra damage for every 2 points of opponent's armour.",
    onDamageDealt: (state: CombatState, { owner, target }: AbilityContext, _source: string, amount: number) => {
        // Trigger if we deal damage to enemy causing health damage (amount > 0)
        if (owner === target || amount <= 0 || !target) return state;

        const targetChar = getCombatant(state, target);
        const oppArmour = targetChar.stats.armour || 0;
        const extra = Math.floor(oppArmour / 2);
        if (extra <= 0) return state;

        return dealDamage(state, 'Shock!', target, extra);
    }
});
