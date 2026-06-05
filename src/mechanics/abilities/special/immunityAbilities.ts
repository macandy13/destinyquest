import { registerAbility, toCanonicalName } from '../../abilityRegistry';
import { healDamage, addLogs } from '../../../types/combatState';

/**
 * Creates an immunity ability.
 * TODO: This only reverts damage, but it also needs to avoid adding effects
 */
export function createImmunityAbility(config: {
    name: string;
    immunities: string[];
    description?: string;
}) {
    const desc = config.description ||
        `Immune to ${config.immunities.join(', ')}.`;
    const immunities = config.immunities.map(i => toCanonicalName(i));
    registerAbility({
        name: config.name,
        type: 'passive',
        description: desc,
        icon: '🛡️',
        reviewed: true,
        onDamageDealt: (state, { owner, target }, source, damageDealt) => {
            if (!target || owner !== target) return state;
            if (immunities.includes(source)) {
                state = healDamage(state, config.name, target, damageDealt, 'Immune');
                state = addLogs(state, {
                    message: `${target} is immune to ${source}.`,
                });
                return state;
            }
            return state;
        }
    });
}

// Immunity abilities

createImmunityAbility({
    name: 'Blazing armour',
    immunities: ['Piercing', 'Sear', 'Impale', 'Bleed', 'Burn', 'Ignite']
});

createImmunityAbility({
    name: 'Bloated body',
    immunities: ['Piercing', 'Impale', 'Barbs', 'Thorns']
});

createImmunityAbility({
    name: 'Body of Air',
    immunities: ['Bleed', 'Venom', 'Disease']
});

createImmunityAbility({
    name: 'Body of Bone',
    immunities: ['Bleed', 'Venom']
});

createImmunityAbility({
    name: 'Body of Flame',
    immunities: ['Bleed', 'Burn', 'Fire aura', 'Ignite', 'Sear']
});

createImmunityAbility({
    name: 'Body of Ice',
    immunities: ['Venom', 'Disease', 'Bleed']
});

createImmunityAbility({
    name: 'Body of Ink',
    immunities: ['Bleed', 'Thorns', 'Thorn Cage'],
});

createImmunityAbility({
    name: 'Body of Iron',
    immunities: ['Venom', 'Disease', 'Bleed']
});

createImmunityAbility({
    name: 'Body of Metal',
    immunities: ['Piercing', 'Impale', 'Barbs', 'Thorns', 'Bleed', 'Venom', 'Disease']
});

createImmunityAbility({
    name: 'Body of Paper',
    immunities: ['Bleed'],
});

createImmunityAbility({
    name: 'Body of Rock',
    immunities: ['Bleed', 'Barbs', 'Disease', 'Impale', 'Lightning', 'Piercing', 'Venom', 'Thorns', 'Thorn Cage']
});

createImmunityAbility({
    name: 'Ghost of a victory',
    immunities: ['Cutpurse', 'Pillage'],
});

createImmunityAbility({
    name: 'Enhanted rock',
    immunities: ['Bleed', 'Sear', 'Thorns', 'Thorn Cage', 'Fire Aura'],
});

createImmunityAbility({
    name: 'Head case',
    immunities: ['Bleed'],
});

createImmunityAbility({
    name: 'Dragon hide',
    immunities: ['Piercing', 'Impale', 'Thorns', 'Barbs']
});

createImmunityAbility({
    name: 'Got ma eyes an yer',
    immunities: ['Sidestep', 'Evade', 'Vanish']
});

createImmunityAbility({
    name: 'Heightened Magic',
    immunities: ['Sidestep', 'Evade', 'Vanish']
});

createImmunityAbility({
    name: 'Iron Clad',
    immunities: ['Piercing', 'Impale', 'Bleed', 'Disease', 'Venom']
});

createImmunityAbility({
    name: 'Lightning reflex',
    immunities: ['Sidestep', 'Evade', 'Vanish']
});

createImmunityAbility({
    name: 'Painted Veil',
    immunities: ['Venom', 'Bleed']
});

createImmunityAbility({
    name: 'Sack and straw',
    immunities: ['Lightning', 'Piercing', 'Immobilise', 'Venom', 'Thorns', 'Corruption']
});

createImmunityAbility({
    name: 'Steel yourself',
    immunities: ['Piercing', 'Impale', 'Barbs', 'Thorns']
});

createImmunityAbility({
    name: 'Sinister Steel',
    immunities: ['Piercing', 'Impale', 'Barbs', 'Thorns', 'Bleed', 'Venom']
});

createImmunityAbility({
    name: 'Lightning Reflexes',
    immunities: ['Sidestep', 'Evade', 'Vanish']
});

createImmunityAbility({
    name: 'Heightened Senses',
    immunities: ['Sidestep', 'Evade', 'Vanish']
});

createImmunityAbility({
    name: 'Iron-Mane',
    immunities: ['Piercing', 'Impale']
});

createImmunityAbility({
    name: 'Natural Immunity',
    description: 'Immune to all passive effects.',
    immunities: []
});

createImmunityAbility({
    name: 'Enchanted Stone',
    description: 'Immune to all passive effects.',
    immunities: []
});
