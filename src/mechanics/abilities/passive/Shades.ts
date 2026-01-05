import { registerAbility } from '../../abilityRegistry';
import { appendEffect } from '../../../types/combatState';

registerAbility({
    name: 'Shades',
    type: 'passive',
    description: 'Summon shades at start of combat to add 2 to each damage die until sacrificed.',
    // "Sacrifice" ability handles the removal/usage.
    // This just adds the damage buff at start.
    onCombatStart: (state, { owner }) => {
        return appendEffect(state, owner, {
            stats: {}, // But is it per die (like Sear) or total?
            source: 'Shades',
            target: owner,
            duration: undefined
        });
    },
    onDamageCalculate: (state, { owner, target }) => {
        if (owner === target) return 0;
        const numDice = state.damage?.damageRolls?.length || 0;
        return numDice * 2;
    }
    // TODO: I need to ensure `Sacrifice` ability removes 'Shades' effect.
});
