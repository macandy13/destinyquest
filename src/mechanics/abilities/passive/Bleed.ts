import { registerAbility } from '../../abilityRegistry';
import { getOpponent } from '../../../types/character';
import { appendEffect, dealDamage, hasEffect } from '../../../types/combatState';

registerAbility({
    name: 'Bleed',
    type: 'passive',
    description: 'If your damage causes health damage, the opponent continues to take 1 damage (ignoring armour) at the end of each combat round.',
    onDamageDealt(state, { target }, _source, damageDealt) {
        if (!target) return state;
        if (damageDealt === 0 || hasEffect(state, target, 'Bleed')) return state;
        // TODO: Put into modification function & log
        return appendEffect(state, target, {
            stats: {},
            source: 'Bleed',
            target,
            duration: undefined, // for the rest of the combat (or until cauterized)
            icon: '🩸',
            description: 'Takes 1 damage (ignoring armour) at the end of each round.'
        });
    },
    onPassiveAbility: (state, { owner }) => {
        const opponent = getOpponent(owner);
        if (!hasEffect(state, opponent, 'Bleed')) return state;
        return dealDamage(state, 'Bleed', opponent, 1, `Bleed deals 1 damage to ${opponent}`);
    }
});
