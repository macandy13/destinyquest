import { createStatCombatModifierAbility } from './specialAbilityPatterns';

// Simple combat modifiers (Speed/Damage)
createStatCombatModifierAbility({
    name: 'Avian\'s aid', // "Avian's aid"
    description: 'Add 2 to your damage score for the entire combat.',
    stats: { damageModifier: 2 },
    target: 'hero',
});

createStatCombatModifierAbility({
    name: 'Holy Water',
    description: 'You may add 2 to your damage score in this combat.',
    stats: { damageModifier: 2 },
    target: 'hero',
});

createStatCombatModifierAbility({
    name: 'Holy Flame',
    description: 'Add 4 to the Architect\'s damage score.',
    stats: { damageModifier: 4 },
    target: 'enemy',
});

createStatCombatModifierAbility({
    name: 'Team Effort',
    description: 'The hero adds 2 to their damage score, and 2 to their armour.',
    stats: { damageModifier: 2, armour: 2 },
});

createStatCombatModifierAbility({
    name: 'Power of Shadow',
    description: 'Your brawn and magic are raised by 5.',
    stats: { brawn: 5, magic: 5 },
    target: 'hero',
});

createStatCombatModifierAbility({
    name: 'Holy Aura',
    description: 'The hero adds 2 to their brawn and magic scores.',
    stats: { brawn: 2, magic: 2 },
    target: 'hero',
});

createStatCombatModifierAbility({
    name: 'Caleb\'s Shield',
    description: 'The hero\'s armour is increased by 2.',
    stats: { armour: 2 },
    target: 'hero',
});

createStatCombatModifierAbility({
    name: 'Fatigue',
    description: 'The hero reduces their brawn and magic by 2 for the combat.',
    stats: { brawn: -2, magic: -2 },
    target: 'hero',
});

createStatCombatModifierAbility({
    name: 'Thorn Spines',
    description: 'Reduce hero speed by 1 for the entire combat.',
    stats: { speed: -1 },
    target: 'hero',
});

createStatCombatModifierAbility({
    name: 'Wing buffet',
    description: 'You must reduce your speed by 1 for the entire combat.',
    stats: { speed: -1 },
    target: 'hero',
});

createStatCombatModifierAbility({
    name: 'Dread',
    description: 'Causes Fear, reducing brawn and magic by 1 for the entire combat.',
    stats: { brawn: -1, magic: -1 },
    target: 'hero',
});
