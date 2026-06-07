import {
    defineAbility,
    onDamageTaken,
    always,
    dealDamage,
} from '../builders';

// ---------------------------------------------------------------------------
// Retaliation abilities
//
// When the ability owner takes damage they deal counter-damage to the
// attacker.  All use the onDamageTaken trigger so they fire inside the
// onDamageDealt hook when target === owner.
// ---------------------------------------------------------------------------

defineAbility({
    name: 'Celestial charge',
    description:
        'Each time you inflict health damage, ' +
        'you take 2 damage in return. This ability ignores armour.',
    trigger: onDamageTaken(always()),
    effect: dealDamage(2, 'opponent'),
    icon: '🔄',
});

defineAbility({
    name: 'Pin cushion',
    description:
        'Each time hero causes damage they take 1 damage ignoring armour.',
    trigger: onDamageTaken(always()),
    effect: dealDamage(1, 'opponent'),
    icon: '📌',
});

defineAbility({
    name: 'Charged',
    description:
        'Each time you inflict health damage on the elemental, ' +
        'you take 2 damage in return. This ability ignores armour.',
    trigger: onDamageTaken(always()),
    effect: dealDamage(2, 'opponent'),
    icon: '⚡',
});

defineAbility({
    name: 'Thorn Fists',
    description:
        'Each time the enemy takes damage, the hero loses 4 health ' +
        'ignoring armour.',
    trigger: onDamageTaken(always()),
    effect: dealDamage(4, 'opponent'),
    icon: '🌵',
});

defineAbility({
    name: 'Retaliation',
    description:
        'Each time Sanrah takes attack damage, the hero loses 1 health ' +
        'ignoring armour.',
    trigger: onDamageTaken(always()),
    effect: dealDamage(1, 'opponent'),
    icon: '🔄',
});
