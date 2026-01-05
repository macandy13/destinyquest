import { registerAbility } from '../../abilityRegistry';
import { AttackSource, dealDamage, getCombatant } from '../../../types/combatState';
import { getOpponent } from '../../../types/character';

registerAbility({
    name: 'Avenging Spirit',
    type: 'combat',
    description: 'When you take health damage from an opponent’s damage score/dice, you inflict damage back equal to your armour. This ignores the opponent\'s armour and cannot be increased by modifier abilities.',
    onDamageDealt: (state, { owner, target }, source, amount) => {
        if (owner !== target || amount <= 0 || !target || source !== AttackSource) return state;
        const victim = getCombatant(state, target);
        if (!victim) return state;

        const victimArmour = victim.stats.armour || 0;

        // Inflict damage back to opponent (enemy)
        // Ignoring armour -> direct health reduction
        const opponent = getOpponent(owner);
        if (!opponent) return state;

        const damageBack = victimArmour;
        if (damageBack <= 0) return state;

        return dealDamage(state, 'Avenging Spirit', opponent, damageBack);
    }
});
