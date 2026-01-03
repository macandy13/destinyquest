import { registerAbility } from '../../abilityRegistry';
import { getOpponent } from '../../../types/stats';
import { appendBonusDamage, appendEffect, hasEffect } from '../../../types/combat';

registerAbility({
    name: 'Bleed',
    type: 'passive',
    description: 'If your damage causes health damage, the opponent continues to take 1 damage (ignoring armour) at the end of each combat round.',
    onDamageDealt(state, { target }, damageDealt) {
        if (!target) return state;
        if (damageDealt === 0 && hasEffect(state, target, 'Bleed')) return state;
        // TODO: Put into modification function & log
        return appendEffect(state, target, {
            id: `bleed-${target}`,
            modification: {
                stats: { health: -1 },
                source: 'Bleed',
                target,
            },
            duration: undefined, // for the rest of the combat (or until cauterized)
        });
    },
    onPassiveAbility: (state, { owner }) => {
        const opponent = getOpponent(owner);
        if (!hasEffect(state, opponent, 'Bleed')) return state;
        return appendBonusDamage(state, {
            source: 'Bleed',
            target: opponent,
            amount: 1,
        });
    }
});
