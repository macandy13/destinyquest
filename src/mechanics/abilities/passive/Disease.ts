import { registerAbility } from '../../abilityRegistry';
import { appendEffect, hasEffect, dealDamage } from '../../../types/combatState';
import { getOpponent } from '../../../types/character';

registerAbility({
    name: 'Disease',
    type: 'passive',
    description: 'If you cause health damage, the opponent takes 2 damage (ignoring armour) at the end of each round.',
    onDamageDealt: (state, { owner, target }, source, amount) => {
        if (amount > 0 && target && !hasEffect(state, target, 'Disease')) {
            return appendEffect(state, target, {
                stats: {},
                source: 'Disease',
                target: target,
                duration: undefined
            });
        }
        return state;
    },
    onPassiveAbility: (state, { owner }) => {
        const opponent = getOpponent(owner);
        if (hasEffect(state, opponent, 'Disease')) {
            return dealDamage(state, 'Disease', opponent, 2);
        }
        return state;
    }
});
