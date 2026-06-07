import {
    defineAbility,
    fromSource,
    onDamageTaken,
    cancelDamage,
} from '../builders';

// ---------------------------------------------------------------------------
// Immunity abilities
//
// Each ability cancels (reverses) damage from specific named sources.
// The fromSource() condition matches against the canonical (lowercased)
// name of the ability or attack that dealt the damage.
//
// TODO: Immunity currently only reverses damage after it is applied; it
// does not yet prevent effect markers from being set beforehand.
// ---------------------------------------------------------------------------

function immune(
    name: string,
    immunities: string[],
    description?: string,
): void {
    const desc = description ??
        `Immune to ${immunities.join(', ')}.`;
    defineAbility({
        name,
        description: desc,
        trigger: onDamageTaken(fromSource(immunities)),
        effect: cancelDamage(),
        icon: '🛡️',
        type: 'passive',
    });
}

// ---------------------------------------------------------------------------

immune('Blazing armour', [
    'Piercing', 'Sear', 'Impale', 'Bleed', 'Burn', 'Ignite',
]);

immune('Bloated body', [
    'Piercing', 'Impale', 'Barbs', 'Thorns',
]);

immune('Body of Air', ['Bleed', 'Venom', 'Disease']);

immune('Body of Bone', ['Bleed', 'Venom']);

immune('Body of Flame', [
    'Bleed', 'Burn', 'Fire aura', 'Ignite', 'Sear',
]);

immune('Body of Ice', ['Venom', 'Disease', 'Bleed']);

immune('Body of Ink', ['Bleed', 'Thorns', 'Thorn Cage']);

immune('Body of Iron', ['Venom', 'Disease', 'Bleed']);

immune('Body of Metal', [
    'Piercing', 'Impale', 'Barbs', 'Thorns',
    'Bleed', 'Venom', 'Disease',
]);

immune('Body of Paper', ['Bleed']);

immune('Body of Rock', [
    'Bleed', 'Barbs', 'Disease', 'Impale', 'Lightning',
    'Piercing', 'Venom', 'Thorns', 'Thorn Cage',
]);

immune('Ghost of a victory', ['Cutpurse', 'Pillage']);

immune('Enhanted rock', [
    'Bleed', 'Sear', 'Thorns', 'Thorn Cage', 'Fire Aura',
]);

immune('Head case', ['Bleed']);

immune('Dragon hide', ['Piercing', 'Impale', 'Thorns', 'Barbs']);

immune('Got ma eyes an yer', ['Sidestep', 'Evade', 'Vanish']);

immune('Heightened Magic', ['Sidestep', 'Evade', 'Vanish']);

immune('Iron Clad', [
    'Piercing', 'Impale', 'Bleed', 'Disease', 'Venom',
]);

immune('Lightning reflex', ['Sidestep', 'Evade', 'Vanish']);

immune('Painted Veil', ['Venom', 'Bleed']);

immune('Sack and straw', [
    'Lightning', 'Piercing', 'Immobilise',
    'Venom', 'Thorns', 'Corruption',
]);

immune('Steel yourself', ['Piercing', 'Impale', 'Barbs', 'Thorns']);

immune('Sinister Steel', [
    'Piercing', 'Impale', 'Barbs', 'Thorns', 'Bleed', 'Venom',
]);

immune('Lightning Reflexes', ['Sidestep', 'Evade', 'Vanish']);

immune('Heightened Senses', ['Sidestep', 'Evade', 'Vanish']);

immune('Iron-Mane', ['Piercing', 'Impale']);

immune(
    'Natural Immunity',
    [],
    'Immune to all passive effects.',
);

immune(
    'Enchanted Stone',
    [],
    'Immune to all passive effects.',
);
