import { createImmunityAbility } from './specialAbilityPatterns';

createImmunityAbility({
    name: 'Blazing armour',
    immunities: ['Piercing', 'Sear', 'Impale', 'Bleed', 'Burn', 'Ignite']
});

createImmunityAbility({
    name: 'Bloated body',
    immunities: ['Piercing', 'Impale', 'Barbs', 'Thorns']
});

createImmunityAbility({
    name: 'Body of Flame',
    immunities: ['Sear', 'Fire aura', 'Bleed', 'Burn', 'Ignite']
    // Note: There are two "Body of Flame" entries in the MD with slightly different lists. 
    // Merging them for robustness or picking the superset.
    // First: Sear, Fire aura, Bleed
    // Second: Sear, Bleed, Fire Aura, Burn, Ignite.
    // Using superset.
});

createImmunityAbility({
    name: 'Body of Ice',
    immunities: ['Venom', 'Disease', 'Bleed']
    // TODO: "takes double damage from Sear..." logic needs separate implementation or expansion of helper.
    // For now dealing with immunity part.
});

createImmunityAbility({
    name: 'Body of air',
    immunities: ['Bleed', 'Venom', 'Disease']
});

createImmunityAbility({
    name: 'Body of bone',
    immunities: ['Bleed', 'Venom']
});

createImmunityAbility({
    name: 'Body of rock',
    immunities: ['Piercing', 'Impale', 'Bleed', 'Venom', 'Thorns', 'Barbs', 'Lightning']
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
    name: 'Body of Metal',
    immunities: ['Piercing', 'Impale', 'Barbs', 'Thorns', 'Bleed', 'Venom', 'Disease']
});

createImmunityAbility({
    name: 'Natural Immunity',
    description: 'Immune to all passive effects.',
    immunities: [] // TODO: Needs special handling actually. 
    // If it's "all passive effects", standard immunities list might not cover it unless we add "Passive" as a keyword/category check.
    // Typically this blocks debuffs. 
    // I can register it here so it exists. The effect system needs to check for "Natural Immunity".
});

createImmunityAbility({
    name: 'Enchanted Stone',
    description: 'Immune to all passive effects.',
    immunities: []
});
