import {
    defineAbility,
    onCombatStart,
    onRoundEnd,
    always,
    modifyStat,
} from '../builders';

// ---------------------------------------------------------------------------
// Stat modifier abilities
//
// Applied once at combat start for the entire fight duration.
// ---------------------------------------------------------------------------

defineAbility({
    name: "Avian's aid",
    description: 'Add 2 to your damage score for the entire combat.',
    trigger: onCombatStart(always()),
    effect: modifyStat({ damageModifier: 2 }, 'hero'),
    type: 'modifier',
});

defineAbility({
    name: 'Holy Water',
    description: 'You may add 2 to your damage score in this combat.',
    trigger: onCombatStart(always()),
    effect: modifyStat({ damageModifier: 2 }, 'hero'),
    type: 'modifier',
});

defineAbility({
    name: "Benin's blessing",
    description: "Add 1 to the hero's speed, brawn and magic score.",
    trigger: onCombatStart(always()),
    effect: modifyStat({ speed: 1, brawn: 1, magic: 1 }, 'hero'),
    type: 'modifier',
});

defineAbility({
    name: 'Wrath of the witchfinder',
    description: "Add 2 to the hero's damage.",
    trigger: onCombatStart(always()),
    effect: modifyStat({ damageModifier: 2 }, 'hero'),
    type: 'modifier',
});

defineAbility({
    name: 'Motley crew',
    description: "Add 3 to the enemy's damage.",
    trigger: onCombatStart(always()),
    effect: modifyStat({ damageModifier: 3 }, 'enemy'),
    type: 'modifier',
});

defineAbility({
    name: 'Holy Flame',
    description: "Add 4 to the Architect's damage score.",
    trigger: onCombatStart(always()),
    effect: modifyStat({ damageModifier: 4 }, 'enemy'),
    type: 'modifier',
});

defineAbility({
    name: 'Team Effort',
    description:
        'The hero adds 2 to their damage score, and 2 to their armour.',
    trigger: onCombatStart(always()),
    effect: modifyStat({ damageModifier: 2, armour: 2 }, 'owner'),
    type: 'modifier',
});

defineAbility({
    name: 'Power of Shadow',
    description: 'Your brawn and magic are raised by 5.',
    trigger: onCombatStart(always()),
    effect: modifyStat({ brawn: 5, magic: 5 }, 'hero'),
    type: 'modifier',
});

defineAbility({
    name: 'Holy Aura',
    description: 'The hero adds 2 to their brawn and magic scores.',
    trigger: onCombatStart(always()),
    effect: modifyStat({ brawn: 2, magic: 2 }, 'hero'),
    type: 'modifier',
});

defineAbility({
    name: "Caaleb's Shield",
    description: "The hero's armour is increased by 2.",
    trigger: onCombatStart(always()),
    effect: modifyStat({ armour: 2 }, 'hero'),
    type: 'modifier',
});

defineAbility({
    name: 'Fatigue',
    description:
        'The hero reduces their brawn and magic by 2 for the combat.',
    trigger: onCombatStart(always()),
    effect: modifyStat({ brawn: -2, magic: -2 }, 'hero'),
    type: 'modifier',
});

defineAbility({
    name: 'Thorn Spines',
    description: 'Reduce hero speed by 1 for the entire combat.',
    trigger: onCombatStart(always()),
    effect: modifyStat({ speed: -1 }, 'hero'),
    type: 'modifier',
});

defineAbility({
    name: 'Wing buffet',
    description: 'You must reduce your speed by 1 for the entire combat.',
    trigger: onCombatStart(always()),
    effect: modifyStat({ speed: -1 }, 'hero'),
    type: 'modifier',
});

defineAbility({
    name: 'Dread',
    description:
        'Causes Fear, reducing brawn and magic by 1 for the entire combat.',
    trigger: onCombatStart(always()),
    effect: modifyStat({ brawn: -1, magic: -1 }, 'hero'),
    type: 'modifier',
});

defineAbility({
    name: 'Mighty blows',
    description: 'Voldring rolls 2 damage dice.',
    trigger: onCombatStart(always()),
    effect: modifyStat({ damageDice: 1 }, 'enemy'),
    type: 'modifier',
});

defineAbility({
    name: 'Double Danger',
    description: 'The enemy rolls 2 damage dice.',
    trigger: onCombatStart(always()),
    effect: modifyStat({ damageDice: 1 }, 'enemy'),
    type: 'modifier',
});



defineAbility({
    name: 'Piercing Claws',
    description: "The ghouls' attacks ignore armour.",
    trigger: onCombatStart(always()),
    effect: modifyStat({ armour: -100 }, 'hero'),
    type: 'modifier',
});

defineAbility({
    name: 'Stingers',
    description: 'Attacks ignore armour.',
    trigger: onCombatStart(always()),
    effect: modifyStat({ armour: -100 }, 'hero'),
    type: 'modifier',
});

defineAbility({
    name: 'Dervish',
    description: 'Attacks ignore armour.',
    trigger: onCombatStart(always()),
    effect: modifyStat({ armour: -100 }, 'hero'),
    type: 'modifier',
});

defineAbility({
    name: 'Crazy hal',
    description:
        'When you roll for damage, Crazy hal adds 1 extra damage score.',
    trigger: onCombatStart(always()),
    effect: modifyStat({ damageModifier: 1 }, 'enemy'),
    type: 'modifier',
});

defineAbility({
    name: 'Fed from fear',
    description: "At the end of each combat round, the owner's armour is increased by 1.",
    trigger: onRoundEnd(always()),
    effect: modifyStat({ armour: 1 }, 'owner'),
    type: 'modifier',
});
