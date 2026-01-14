import { registerAbility } from '../../abilityRegistry';
import { getOpponent } from '../../../types/character';
import {
    appendEffect,
    dealDamage,
    hasEffect,
    getCombatant
} from '../../../types/combatState';

/**
 * Creates a damage-over-time ability that triggers at the end of every round.
 * Can be conditional (e.g. requires damage to be dealt first).
 */
export function createDoTAbility(config: {
    name: string;
    description: string;
    damage: number;
    ignoreArmour?: boolean;
    condition?: 'always' | 'on-hit' | 'on-damage' | 'on-start-round';
    icon?: string;
}) {
    registerAbility({
        name: config.name,
        type: 'special',
        description: config.description,
        icon: config.icon ?? '☠️',
        reviewed: true,
        onDamageDealt: (state, { target }, _source, damageDealt) => {
            if (config.condition === 'always') return state;
            if (!target) return state;

            const conditionMet =
                (config.condition === 'on-hit') ||
                (config.condition === 'on-damage' && damageDealt > 0);
            if (conditionMet && !hasEffect(state, target, config.name)) {
                return appendEffect(state, target, {
                    stats: {},
                    source: config.name,
                    target,
                    duration: undefined,
                    icon: config.icon ?? '☠️',
                    description: config.description
                });
            }
            return state;
        },
        onPassiveAbility: (state, { owner }) => {
            const opponent = getOpponent(owner);
            const shouldTrigger =
                config.condition === 'always' ||
                hasEffect(state, opponent, config.name);

            if (shouldTrigger) {
                let damage = config.damage;
                let damageMsg = `${config.name} deals ${damage} damage`;
                const ignoreArmour = config.ignoreArmour !== false;

                if (!ignoreArmour) {
                    const targetChar = getCombatant(state, opponent);
                    const armour = targetChar.stats.armour;
                    damage = Math.max(0, damage - armour);
                    damageMsg += ` (reduced by armour)`;
                } else {
                    damageMsg += ` (ignoring armour)`;
                }

                if (damage > 0) {
                    return dealDamage(state, config.name, opponent, damage, damageMsg);
                }
            }
            return state;
        },
        onCombatStart: (state, { owner }) => {
            if (config.condition === 'always' && !hasEffect(state, owner, config.name)) {
                return appendEffect(state, owner, {
                    stats: {},
                    source: config.name,
                    target: owner,
                    duration: undefined,
                    icon: config.icon ?? '☠️',
                    description: config.description
                });
            }
            return state;
        }
    });
}

// DoT abilities

createDoTAbility({
    name: 'Black coils',
    description:
        'At the end of every combat round you automatically lose 2 health ' +
        'ignoring armour',
    damage: 2,
    condition: 'always'
});

createDoTAbility({
    name: 'Black sigill',
    description:
        'At the end of each combat round, your hero suffers 1 damage. ' +
        'This ability ignores armour.',
    damage: 1,
    condition: 'always'
});

createDoTAbility({
    name: 'Black venom',
    description:
        'After a successful attack causing damage, lose 2 health on every ' +
        'end of a round, ignoring armour.',
    damage: 2,
    condition: 'on-damage'
});

createDoTAbility({
    name: 'Blacke fire',
    description:
        'At the end of the combat round, your hero takes 2 damage from the ' +
        'flames that surround the demon. This ability ignores armour.',
    damage: 2,
    condition: 'always'
});

createDoTAbility({
    name: 'Carrion Beetles',
    description: 'At the end of the round, you take 2 health damage, ignoring armour.',
    damage: 2,
    condition: 'always'
});

createDoTAbility({
    name: 'Carrion Crows',
    description: 'At the start of each round, you take 4 health damage, ignoring armour.',
    damage: 4,
    condition: 'on-start-round'
});

createDoTAbility({
    name: 'Deadly venom',
    description:
        'Once you have taken health damage, you lose 3 health at the end of ' +
        'each combat round.',
    damage: 3,
    condition: 'on-damage'
});

createDoTAbility({
    name: 'Disease',
    description:
        'Once you have taken health damage, you lose 2 health at the end of ' +
        'each combat round.',
    damage: 2,
    condition: 'on-damage'
});

createDoTAbility({
    name: 'Fiery aura',
    description:
        'At the end of each combat round, the hero takes 3 damage ignoring armour.',
    damage: 3,
    condition: 'always'
});

createDoTAbility({
    name: 'Grave Chill',
    description:
        'At the end of each combat round, the hero takes 2 damage ignoring armour.',
    damage: 2,
    condition: 'always'
});

createDoTAbility({
    name: 'Hellfire',
    description:
        'At the end of the combat round, your hero takes 2 damage from the ' +
        'flames that surround the demon. This ability ignores armour.',
    damage: 2,
    condition: 'always'
});

createDoTAbility({
    name: 'Heat Exposure',
    description: 'At the end of each combat round, you take 2 damage ignoring armour.',
    damage: 2,
    condition: 'always'
});

createDoTAbility({
    name: 'Fire Sprite',
    description: 'At the end of each combat round, you take 2 damage ignoring armour.',
    damage: 2,
    condition: 'always'
});

createDoTAbility({
    name: 'Black Lightening',
    description: 'At the end of each combat round, you take 4 damage ignoring armour.',
    damage: 4,
    condition: 'always'
});

createDoTAbility({
    name: 'Black Poison',
    description:
        'Once you have taken health damage, at the end of every combat round ' +
        'you must automatically lose 2 health.',
    damage: 2,
    condition: 'on-damage'
});

createDoTAbility({
    name: 'Sucker Punch',
    description:
        'Once you have taken health damage, at the end of every combat round ' +
        'you must automatically lose 2 health ignoring armour.',
    damage: 2,
    condition: 'on-damage'
});

createDoTAbility({
    name: 'Wyvern Talons',
    description: 'At the end of the round, you take 2 damage ignoring armour.',
    damage: 2,
    condition: 'always'
});

createDoTAbility({
    name: 'Poison Needles',
    description: 'At the end of every combat round, lose 2 health.',
    damage: 2,
    condition: 'always'
});

createDoTAbility({
    name: 'Poisened arrow',
    description: 'At the end of each combat round you lose 2 health.',
    damage: 2,
    condition: 'always'
});

createDoTAbility({
    name: 'Snapping Beak',
    description: 'At the end of every combat round, lose 2 health ignoring armour.',
    damage: 2,
    condition: 'always'
});

createDoTAbility({
    name: 'Snappers',
    description: 'At the end of every combat round, lose 2 health ignoring armour.',
    damage: 2,
    condition: 'always'
});

createDoTAbility({
    name: 'Stone Golem',
    description: 'At the end of the round, take 1 damage ignoring armour.',
    damage: 1,
    condition: 'always'
});

createDoTAbility({
    name: 'Whirling Blades',
    description: 'At the end of each combat round, you take 2 damage ignoring armour.',
    damage: 2,
    condition: 'always'
});

createDoTAbility({
    name: 'Mark of Fury',
    description:
        'At the end of the combat round, the hero takes 3 damage ignoring armour.',
    damage: 3,
    condition: 'always'
});

createDoTAbility({
    name: 'Giblets',
    description:
        'At the end of the combat round, the hero takes 3 damage ignoring armour.',
    damage: 3,
    condition: 'always'
});

createDoTAbility({
    name: 'Stomping Statues',
    description:
        'At the end of the combat round, the statues deal 4 damage ignoring ' +
        'armour to the hero.',
    damage: 4,
    condition: 'always'
});

createDoTAbility({
    name: 'Poison Nodes',
    description:
        'At the end of each combat round, the hero takes 2 damage ignoring armour.',
    damage: 2,
    condition: 'always'
});

createDoTAbility({
    name: 'Flame Form',
    description:
        'At the end of the combat round, the hero loses 4 health ignoring armour.',
    damage: 4,
    condition: 'always'
});

createDoTAbility({
    name: 'Molten armour',
    description: 'At the end of the round the hero takes 4 damage ignoring armour.',
    damage: 4,
    condition: 'always'
});
