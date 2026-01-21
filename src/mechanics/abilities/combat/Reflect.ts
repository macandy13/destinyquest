import { registerAbility } from '../../abilityRegistry';
import { dealDamage } from '../../../types/combatState';

registerAbility({
    name: 'Reflect',
    type: 'combat',
    description: 'Reflect health damage back to vampire opponents.',
    onDamageDealt: (state, context, _source, amount) => {
        const { owner, target } = context;
        // Reflect works if "I took damage" (target === 'hero' if ability owner is 'hero').
        // Wait, AbilityContext `owner` is the one who HAS the ability.
        // If Reflect is on Hero, `context.owner` is 'hero'.
        // If Hero takes damage, `context.target` (victim) would be 'hero' in global hook?
        // Assuming global hook passes target. Previous analysis of Retaliation suggests yes.

        if (owner !== target || amount <= 0) return state;

        const enemy = state.enemies[0];
        if (!enemy) return state;
        if (!enemy.original.abilities.includes('Vampire')) return state;

        return dealDamage(state, 'Reflect', 'enemy', amount);
    }
});
