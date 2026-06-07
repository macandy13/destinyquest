import {
    getCombatant,
    healDamage,
} from '../../../types/combatState';
import {
    defineAbility,
    onRoundStart,
    onRoundEnd,
    always,
    heal,
    type Effect,
} from '../builders';

// ---------------------------------------------------------------------------
// Healing abilities
//
// Enemies (and occasionally allies) that recover health each round.
// ---------------------------------------------------------------------------

/** Heals amount per round; stops once health drops to 0. */
function healIfAlive(amount: number): Effect {
    return (state, source, owner) => {
        const combatant = getCombatant(state, owner);
        if (combatant.stats.health <= 0) return state;
        return healDamage(
            state,
            source,
            owner,
            amount,
            `${source}: +${amount} health`,
        );
    };
}

/** Heals amount per round; stops once health exceeds max. */
function healUpTo(amount: number, max: number): Effect {
    return (state, source, owner) => {
        const combatant = getCombatant(state, owner);
        if (combatant.stats.health >= max) return state;
        return healDamage(
            state,
            source,
            owner,
            amount,
            `${source}: +${amount} health`,
        );
    };
}

// ---------------------------------------------------------------------------

defineAbility({
    name: 'Regeneration',
    description:
        'At the start of the combat round, the Troll regains 2 health. ' +
        'Once the trolls health has been reduced to 0, he cannot heal.',
    trigger: onRoundStart(always()),
    effect: healIfAlive(2),
    icon: '💚',
});

defineAbility({
    name: 'Healing touch',
    description:
        'At the end of the combat round, Allura heals 2 health. ' +
        'Once her health has been reduced to 0, she cannot heal.',
    trigger: onRoundEnd(always()),
    effect: healIfAlive(2),
    icon: '💚',
});

defineAbility({
    name: 'Holy Circle',
    description:
        'At the end of the combat round, the Architect heals 4 health.',
    trigger: onRoundEnd(always()),
    effect: heal(4, 'owner'),
    icon: '💚',
});

defineAbility({
    name: 'Bone mending',
    description:
        'At the end of the combat round, the Warriors heals 4 health.',
    trigger: onRoundEnd(always()),
    effect: healUpTo(4, 40),
    icon: '💚',
});

defineAbility({
    name: 'Dem bones',
    description:
        'At the end of the combat round, Rap Unzal heals 2 health.',
    trigger: onRoundEnd(always()),
    effect: heal(2, 'owner'),
    icon: '💚',
});

defineAbility({
    name: 'Dark Runes',
    description:
        'At the end of each combat round, the enemy heals 3 health.',
    trigger: onRoundEnd(always()),
    effect: heal(3, 'owner'),
    icon: '💚',
});

defineAbility({
    name: 'Enduring Spirit',
    description:
        'At the end of the combat round, Lorcan heals 4 health if not ' +
        'defeated.',
    trigger: onRoundEnd(always()),
    effect: healIfAlive(4),
    icon: '💚',
});

defineAbility({
    name: 'Gathering Darkness',
    description:
        'At the end of each combat round, the enemy heals 8 health if ' +
        'not defeated.',
    trigger: onRoundEnd(always()),
    effect: healIfAlive(8),
    icon: '💚',
});

defineAbility({
    name: 'Reanimator 2',
    description:
        'At the end of each round, the enemy heals 2 health, up to a maximum of 50.',
    trigger: onRoundEnd(always()),
    effect: healUpTo(2, 50),
    icon: '💚',
});
