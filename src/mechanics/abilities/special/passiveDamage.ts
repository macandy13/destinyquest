import { createDoTAbility } from './specialAbilityPatterns';

// Simple DoT abilities
// Note: Some have unique conditions (like dice rolls), which are not covered by the simple helper yet.
// I will implement the ones that fit the 'always', 'on-hit', 'on-damage' patterns with fixed damage.

createDoTAbility({
    name: 'Black coils',
    description: 'At the end of every combat round you automatically lose 2 health ignoring armour',
    damage: 2,
    condition: 'always'
});

createDoTAbility({
    name: 'Black sigill',
    description: 'At the end of each combat round, your hero suffers 1 damage. This ability ignores armour.',
    damage: 1,
    condition: 'always'
});

createDoTAbility({
    name: 'Black venom',
    description: 'After a successful attack causing damage, lose 2 health on every end of a round, ignoring armour.',
    damage: 2,
    condition: 'on-damage'
});

createDoTAbility({
    name: 'Blacke fire',
    description: 'At the end of the combat round, your hero takes 2 damage from the flames that surround the demon. This ability ignores armour.',
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

// TODO: This needs to be a retaliation ability. 
createDoTAbility({
    name: 'Charged',
    description: 'Each time you inflict health damage on the elemental, you take 2 damage in return. This ability ignores armour.',
    damage: 2,
    condition: 'on-damage', // This implies "When YOU (hero) inflict damage". 
    // Wait, the description says "Each time you inflict health damage on the elemental, you take 2 damage". 
    // This is Retaliation, not DoT. 
    // createDoTAbility does: "If condition met, apply effect. Effect deals damage at END OF ROUND."
    // Retaliation is immediate. 
    // So 'Charged' is NOT a DoT. It is a Retaliation ability.
});

// Resuming DoTs

createDoTAbility({
    name: 'Deadly venom',
    description: 'Once you have taken health damage, you lose 3 health at the end of each combat round.',
    damage: 3,
    condition: 'on-damage' // Triggered when hero takes damage (presumably from this enemy)
});

createDoTAbility({
    name: 'Disease',
    description: 'Once you have taken health damage, you lose 2 health at the end of each combat round.',
    damage: 2,
    condition: 'on-damage'
});

createDoTAbility({
    name: 'Fiery aura',
    description: 'At the end of each combat round, the hero takes 3 damage ignoring armour.',
    damage: 3,
    condition: 'always'
});

createDoTAbility({
    name: 'Grave Chill',
    description: 'At the end of each combat round, the hero takes 2 damage ignoring armour.',
    damage: 2,
    condition: 'always'
});

createDoTAbility({
    name: 'Hellfire',
    description: 'At the end of the combat round, your hero takes 2 damage from the flames that surround the demon. This ability ignores armour.',
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
    description: 'Once you have taken health damage, at the end of every combat round you must automatically lose 2 health.',
    damage: 2,
    condition: 'on-damage'
});

createDoTAbility({
    name: 'Sucker Punch',
    description: 'Once you have taken health damage, at the end of every combat round you must automatically lose 2 health ignoring armour.',
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
    condition: 'always' // Name implies it might need a hit? "Poisened arrow". 
    // Description: "At the end of each combat round you lose 2 health." 
    // Usually arrows need to hit. But based on text, it's automatic. 
    // Maybe the enemy is "Poisoned Arrow"? If it's the ability of an Archer, it probably implies on-hit.
    // However, I will stick to text. If text says "At end of each round...", I treat as always unless it says "If you take damage".
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
    description: 'At the end of the combat round, the hero takes 3 damage ignoring armour.',
    damage: 3,
    condition: 'always'
});

createDoTAbility({
    name: 'Giblets',
    description: 'At the end of the combat round, the hero takes 3 damage ignoring armour.',
    damage: 3,
    condition: 'always'
});

createDoTAbility({
    name: 'Stomping Statues',
    description: 'At the end of the combat round, the statues deal 4 damage ignoring armour to the hero.',
    damage: 4,
    condition: 'always'
});

createDoTAbility({
    name: 'Poison Nodes',
    description: 'At the end of each combat round, the hero takes 2 damage ignoring armour.',
    damage: 2,
    condition: 'always'
});

createDoTAbility({
    name: 'Flame Form',
    description: 'At the end of the combat round, the hero loses 4 health ignoring armour.',
    damage: 4,
    condition: 'always'
});

createDoTAbility({
    name: 'Molten armour',
    description: 'At the end of the round the hero takes 4 damage ignoring armour.',
    damage: 4,
    condition: 'always'
});

