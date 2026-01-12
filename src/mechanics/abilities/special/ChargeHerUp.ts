
import { AbilityDefinition, registerAbility, toCanonicalName } from '../../abilityRegistry';
import { appendEffect, dealDamage, hasEffect, removeEffect } from '../../../types/combatState';
import { getOpponent } from '../../../types/character';

export const ChargeHerUp: AbilityDefinition = {
    name: 'Charge her up',
    type: 'special',
    description: 'The wreeking mage does not roll for damage if they win a round. Instead, for every 2 rounds it wins, it deals 10 damage ignoring armour. Immune to Vanish, Evade, Sidestep.',
    icon: '🔋',
    reviewed: false,
    onDamageRoll: (state, { owner }) => {
        if (state.winner !== owner) return state;

        // Suppress dice roll
        state = {
            ...state,
            damage: {
                ...state.damage!,
                damageRolls: []
            }
        };

        if (hasEffect(state, owner, 'Charge her up')) {
            state = removeEffect(state, owner, 'Charge her up');
            // Discharge!
            const target = getOpponent(owner);
            const damageAmount = 10;
            state = dealDamage(state, 'Charge her up', target, damageAmount, '"Charge her up" triggered after 2nd combat round victory');
        } else {
            state = appendEffect(state, owner, {
                stats: {},
                source: 'Charge her up',
                target: 'enemy',
                visible: false,
                duration: undefined,
            });
        }
        return state;
    }
};

registerAbility(ChargeHerUp);
