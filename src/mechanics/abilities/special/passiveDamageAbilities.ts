import {
    defineAbility,
    onRoundEnd,
    onRoundEndAfterFirstHit,
    always,
    dealDamage,
} from '../builders';

// ---------------------------------------------------------------------------
// DoT (damage-over-time) abilities
//
// Most deal damage to the hero at the end of every round.
// Abilities marked "on-damage" only activate after the enemy first
// scores a hit, tracked via an invisible marker effect.
// ---------------------------------------------------------------------------

// -- Always active (damage every round end) --

defineAbility({
    name: 'Black coils',
    description:
        'At the end of every combat round you automatically lose 2 ' +
        'health ignoring armour',
    trigger: onRoundEnd(always()),
    effect: dealDamage(2, 'hero'),
    icon: '☠️',
});

defineAbility({
    name: 'Black sigill',
    description:
        'At the end of each combat round, your hero suffers 1 damage. ' +
        'This ability ignores armour.',
    trigger: onRoundEnd(always()),
    effect: dealDamage(1, 'hero'),
    icon: '☠️',
});

defineAbility({
    name: 'Blacke fire',
    description:
        'At the end of the combat round, your hero takes 2 damage from ' +
        'the flames that surround the demon. This ability ignores armour.',
    trigger: onRoundEnd(always()),
    effect: dealDamage(2, 'hero'),
    icon: '🔥',
});

defineAbility({
    name: 'Carrion Beetles',
    description:
        'At the end of the round, you take 2 health damage, ignoring armour.',
    trigger: onRoundEnd(always()),
    effect: dealDamage(2, 'hero'),
    icon: '☠️',
});

defineAbility({
    name: 'Fiery aura',
    description:
        'At the end of each combat round, the hero takes 3 damage ' +
        'ignoring armour.',
    trigger: onRoundEnd(always()),
    effect: dealDamage(3, 'hero'),
    icon: '🔥',
});

defineAbility({
    name: 'Grave Chill',
    description:
        'At the end of each combat round, the hero takes 2 damage ' +
        'ignoring armour.',
    trigger: onRoundEnd(always()),
    effect: dealDamage(2, 'hero'),
    icon: '❄️',
});

defineAbility({
    name: 'Hellfire',
    description:
        'At the end of the combat round, your hero takes 2 damage from ' +
        'the flames that surround the demon. This ability ignores armour.',
    trigger: onRoundEnd(always()),
    effect: dealDamage(2, 'hero'),
    icon: '🔥',
});

defineAbility({
    name: 'Heat Exposure',
    description:
        'At the end of each combat round, you take 2 damage ignoring armour.',
    trigger: onRoundEnd(always()),
    effect: dealDamage(2, 'hero'),
    icon: '🔥',
});

defineAbility({
    name: 'Fire Sprite',
    description:
        'At the end of each combat round, you take 2 damage ignoring armour.',
    trigger: onRoundEnd(always()),
    effect: dealDamage(2, 'hero'),
    icon: '🔥',
});

defineAbility({
    name: 'Black Lightening',
    description:
        'At the end of each combat round, you take 4 damage ignoring armour.',
    trigger: onRoundEnd(always()),
    effect: dealDamage(4, 'hero'),
    icon: '⚡',
});

defineAbility({
    name: 'Wyvern Talons',
    description:
        'At the end of the round, you take 2 damage ignoring armour.',
    trigger: onRoundEnd(always()),
    effect: dealDamage(2, 'hero'),
    icon: '🦅',
});

defineAbility({
    name: 'Poison Needles',
    description:
        'At the end of every combat round, lose 2 health.',
    trigger: onRoundEnd(always()),
    effect: dealDamage(2, 'hero'),
    icon: '☠️',
});

defineAbility({
    name: 'Poisened arrow',
    description:
        'At the end of each combat round you lose 2 health.',
    trigger: onRoundEnd(always()),
    effect: dealDamage(2, 'hero'),
    icon: '🏹',
});

defineAbility({
    name: 'Snapping Beak',
    description:
        'At the end of every combat round, lose 2 health ignoring armour.',
    trigger: onRoundEnd(always()),
    effect: dealDamage(2, 'hero'),
    icon: '🦅',
});

defineAbility({
    name: 'Snappers',
    description:
        'At the end of every combat round, lose 2 health ignoring armour.',
    trigger: onRoundEnd(always()),
    effect: dealDamage(2, 'hero'),
    icon: '🦅',
});

defineAbility({
    name: 'Stone Golem',
    description:
        'At the end of the round, take 1 damage ignoring armour.',
    trigger: onRoundEnd(always()),
    effect: dealDamage(1, 'hero'),
    icon: '🪨',
});

defineAbility({
    name: 'Whirling Blades',
    description:
        'At the end of each combat round, you take 2 damage ignoring armour.',
    trigger: onRoundEnd(always()),
    effect: dealDamage(2, 'hero'),
    icon: '⚔️',
});

defineAbility({
    name: 'Mark of Fury',
    description:
        'At the end of the combat round, the hero takes 3 damage ' +
        'ignoring armour.',
    trigger: onRoundEnd(always()),
    effect: dealDamage(3, 'hero'),
    icon: '😡',
});

defineAbility({
    name: 'Giblets',
    description:
        'At the end of the combat round, the hero takes 3 damage ' +
        'ignoring armour.',
    trigger: onRoundEnd(always()),
    effect: dealDamage(3, 'hero'),
    icon: '💀',
});

defineAbility({
    name: 'Stomping Statues',
    description:
        'At the end of the combat round, the statues deal 4 damage ' +
        'ignoring armour to the hero.',
    trigger: onRoundEnd(always()),
    effect: dealDamage(4, 'hero'),
    icon: '🗿',
});

defineAbility({
    name: 'Poison Nodes',
    description:
        'At the end of each combat round, the hero takes 2 damage ' +
        'ignoring armour.',
    trigger: onRoundEnd(always()),
    effect: dealDamage(2, 'hero'),
    icon: '☠️',
});

defineAbility({
    name: 'Flame Form',
    description:
        'At the end of the combat round, the hero loses 4 health ' +
        'ignoring armour.',
    trigger: onRoundEnd(always()),
    effect: dealDamage(4, 'hero'),
    icon: '🔥',
});

defineAbility({
    name: 'Molten armour',
    description:
        'At the end of the round the hero takes 4 damage ignoring armour.',
    trigger: onRoundEnd(always()),
    effect: dealDamage(4, 'hero'),
    icon: '🔥',
});

defineAbility({
    name: 'Neural Blast',
    description:
        'At the end of the combat round, the hero takes 10 damage ' +
        'ignoring armour.',
    trigger: onRoundEnd(always()),
    effect: dealDamage(10, 'hero'),
    icon: '🧠',
});

defineAbility({
    name: 'Tight Spot',
    description:
        'At the end of the round, take 5 damage ignoring armour.',
    trigger: onRoundEnd(always()),
    effect: dealDamage(5, 'hero'),
    icon: '💀',
});

defineAbility({
    name: 'Oozing Tentacles',
    description:
        'At the end of the round, you take 2 damage ignoring armour ' +
        'from every Tentacle.',
    trigger: onRoundEnd(always()),
    effect: dealDamage(2, 'hero'),
    icon: '🐙',
});

defineAbility({
    name: 'Fury of the swarm',
    description:
        'At the end of the round, you take 2 damage ignoring armour.',
    trigger: onRoundEnd(always()),
    effect: dealDamage(2, 'hero'),
    icon: '🐝',
});

defineAbility({
    name: 'Whirling chains',
    description:
        'At the end of the round, you take 4 damage ignoring armour.',
    trigger: onRoundEnd(always()),
    effect: dealDamage(4, 'hero'),
    icon: '⛓️',
});

defineAbility({
    name: 'Deadly thorns',
    description: 'Hero loses 3 health at the end of the round.',
    trigger: onRoundEnd(always()),
    effect: dealDamage(3, 'hero'),
    icon: '🌵',
});

defineAbility({
    name: 'Searing skull',
    description: 'Hero loses 2 health at the end of the round.',
    trigger: onRoundEnd(always()),
    effect: dealDamage(2, 'hero'),
    icon: '💀',
});

// -- Activates on first hit (marker pattern) --

defineAbility({
    name: 'Black venom',
    description:
        'After a successful attack causing damage, lose 2 health on ' +
        'every end of a round, ignoring armour.',
    trigger: onRoundEndAfterFirstHit('hero'),
    effect: dealDamage(2, 'hero'),
    icon: '☠️',
});

defineAbility({
    name: 'Black Poison',
    description:
        'Once you have taken health damage, at the end of every combat ' +
        'round you must automatically lose 2 health.',
    trigger: onRoundEndAfterFirstHit('hero'),
    effect: dealDamage(2, 'hero'),
    icon: '☠️',
});

defineAbility({
    name: 'Deadly venom',
    description:
        'Once you have taken health damage, you lose 3 health at the ' +
        'end of each combat round.',
    trigger: onRoundEndAfterFirstHit('hero'),
    effect: dealDamage(3, 'hero'),
    icon: '☠️',
});

defineAbility({
    name: 'Disease',
    description:
        'Once you have taken health damage, you lose 2 health at the ' +
        'end of each combat round.',
    trigger: onRoundEndAfterFirstHit('hero'),
    effect: dealDamage(2, 'hero'),
    icon: '🤢',
});

defineAbility({
    name: 'Lethal venom',
    description:
        'Once you have taken health damage, you lose 6 health at the ' +
        'end of each combat round.',
    trigger: onRoundEndAfterFirstHit('hero'),
    effect: dealDamage(6, 'hero'),
    icon: '☠️',
});

defineAbility({
    name: 'Sucker Punch',
    description:
        'Once you have taken health damage, at the end of every combat ' +
        'round you must automatically lose 2 health ignoring armour.',
    trigger: onRoundEndAfterFirstHit('hero'),
    effect: dealDamage(2, 'hero'),
    icon: '👊',
});

// -- Targets the enemy (self-damage abilities) --

defineAbility({
    name: 'Earth golems',
    description: 'The enemy loses 2 health at the end of each round',
    trigger: onRoundEnd(always()),
    effect: dealDamage(2, 'enemy'),
    icon: '🪨',
});

// -- Special timing: Carrion Crows fires at round start --

defineAbility({
    name: 'Carrion Crows',
    description:
        'At the start of each round, you take 4 health damage, ' +
        'ignoring armour.',
    trigger: { hook: 'onRoundStart', condition: always() },
    effect: dealDamage(4, 'hero'),
    icon: '🐦',
});

defineAbility({
    name: 'Stabbing swords',
    description: 'At the end of the combat round, you lose 2 health.',
    trigger: onRoundEnd(always()),
    effect: dealDamage(2, 'hero'),
    icon: '⚔️',
});

defineAbility({
    name: 'Hex of pain',
    description: 'At the end of the combat round, you lose 1 health.',
    trigger: onRoundEnd(always()),
    effect: dealDamage(1, 'hero'),
    icon: '☠️',
});

defineAbility({
    name: 'Jaguar cube',
    description: 'At the end of the combat round, you lose 2 health.',
    trigger: onRoundEnd(always()),
    effect: dealDamage(2, 'hero'),
    icon: '🐆',
});

defineAbility({
    name: 'Mental daggers',
    description: 'At the end of each combat round, you lose 2 health.',
    trigger: onRoundEnd(always()),
    effect: dealDamage(2, 'hero'),
    icon: '🧠',
});

defineAbility({
    name: 'Fury of the furnace',
    description: 'At the end of each combat round, you lose 3 health.',
    trigger: onRoundEnd(always()),
    effect: dealDamage(3, 'hero'),
    icon: '🔥',
});

defineAbility({
    name: 'Miasma of decay',
    description: 'At the end of each combat round, you lose 3 health.',
    trigger: onRoundEnd(always()),
    effect: dealDamage(3, 'hero'),
    icon: '🤢',
});

defineAbility({
    name: 'Molten skin',
    description: 'At the end of each combat round, you lose 2 health.',
    trigger: onRoundEnd(always()),
    effect: dealDamage(2, 'hero'),
    icon: '🔥',
});
