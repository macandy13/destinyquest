import { registerAbility } from '../../abilityRegistry';
import { dealDamage } from '../../../types/combatState';
import { getOpponent } from '../../../types/character';

/**
 * Creates a retaliation ability that deals damage when the owner takes damage.
 */
export function createRetaliationAbility(config: {
    name: string;
    description: string;
    damage: number;
    trigger: 'on-owner-damaged' | 'on-owner-deals-damage';
}) {
    registerAbility({
        name: config.name,
        type: 'special',
        description: config.description,
        icon: '🔄',
        reviewed: true,
        onDamageDealt: (state, { owner, target }, _source, damageDealt) => {
            if (damageDealt <= 0) return state;

            const opponent = getOpponent(owner);
            if (config.trigger === 'on-owner-damaged' && target === owner) {
                state = dealDamage(
                    state,
                    config.name,
                    opponent,
                    config.damage,
                    `${config.name}: ${config.damage} retaliation damage`
                );
            } else if (config.trigger === 'on-owner-deals-damage' && target === opponent) {
                state = dealDamage(
                    state,
                    config.name,
                    opponent,
                    config.damage,
                    `${config.name}: ${config.damage} damage in return`
                );
            }

            return state;
        }
    });
}

// Retaliation abilities

createRetaliationAbility({
    name: 'Charged',
    description:
        'Each time you inflict health damage on the elemental, ' +
        'you take 2 damage in return. This ability ignores armour.',
    damage: 2,
    trigger: 'on-owner-damaged',
});

createRetaliationAbility({
    name: 'Thorn Fists',
    description:
        'Each time the enemy takes damage, the hero loses 4 health ' +
        'ignoring armour.',
    damage: 4,
    trigger: 'on-owner-damaged',
});

createRetaliationAbility({
    name: 'Retaliation',
    description:
        'Each time Sanrah takes attack damage, the hero loses 1 health ' +
        'ignoring armour.',
    damage: 1,
    trigger: 'on-owner-damaged',
});
