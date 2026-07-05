import { getCombatant, dealDamage } from '../../../types/combatState';
import { getOpponent } from '../../../types/character';
import {
    defineAbility,
    defineRollBranches,
    onRoundStart,
    onRoundEnd,
    roll,
    dealDamage as dmg,
    heal,
    type Effect,
} from '../builders';

// ---------------------------------------------------------------------------
// Roll-check abilities
//
// These abilities roll dice at the start or end of a round and apply
// effects based on the result.
// ---------------------------------------------------------------------------

// -- Round-start, roll vs. speed --

defineAbility({
    name: 'Mud Pie',
    description:
        'At the start of each round, roll 2 dice. If the result is ' +
        'higher than your speed, you take 2 damage ignoring armour.',
    trigger: onRoundStart(roll(2).vs('speed')),
    effect: dmg(2, 'hero'),
    icon: '💩',
});

defineAbility({
    name: 'Vortex of fire',
    description:
        'At the start of each round, roll 2 dice. If the result is ' +
        'higher than your speed, you take 4 damage ignoring armour.',
    trigger: onRoundStart(roll(2).vs('speed')),
    effect: dmg(4, 'hero'),
    icon: '🔥',
});

// Clobbering Time: damage formula (15 - half armour) — inline Effect
const clobberingEffect: Effect = (state, source, owner) => {
    const hero = getCombatant(state, getOpponent(owner));
    const damage = Math.max(0, 15 - Math.floor(hero.stats.armour / 2));
    return dealDamage(state, source, getOpponent(owner), damage,
        `${source}: ${damage} damage (15 - half armour)`);
};

defineAbility({
    name: 'Clobbering Time',
    description:
        'At the start of each round, roll 4 dice. If the result is ' +
        'higher than your speed, you take 15 damage minus half your armour.',
    trigger: onRoundStart(roll(4).vs('speed')),
    effect: clobberingEffect,
    icon: '👊',
});

// -- Round-start, specific face values --

defineAbility({
    name: 'Pincer Movement',
    description:
        'At the start of each round, roll 1 die. If you roll a 1, ' +
        'you lose 2 health ignoring armour.',
    trigger: onRoundStart(roll(1).faces([1])),
    effect: dmg(2, 'hero'),
    icon: '🦂',
});

defineAbility({
    name: 'Shield Slam',
    description:
        'At the start of each round, roll 1 die. If you roll a 1, ' +
        'you take 6 damage ignoring armour. Rerolls not allowed.',
    trigger: onRoundStart(roll(1).faces([1])),
    effect: dmg(6, 'hero'),
    icon: '🛡️',
});

defineAbility({
    name: 'Tangled roots',
    description:
        'At the start of each round, roll 1 die. If you roll a 1 or 2, ' +
        'you lose 5 health ignoring armour.',
    trigger: onRoundStart(roll(1).faces([1, 2])),
    effect: dmg(5, 'hero'),
    icon: '🌿',
});

defineAbility({
    name: 'Bombardement',
    description: 'At the start of a round, roll a die. 1-3: -2 health (hero)',
    trigger: onRoundStart(roll(1).faces([1, 2, 3])),
    effect: dmg(2, 'hero'),
    icon: '💣',
});

// -- Round-end, specific face values --

defineAbility({
    name: 'Bolt from the Blue',
    description:
        'At the end of the combat round, roll a die. If the result is ' +
        '1, 2, or 3, take 5 damage ignoring armour.',
    trigger: onRoundEnd(roll(1).faces([1, 2, 3])),
    effect: dmg(5, 'hero'),
    icon: '⚡',
});

// -- Round-end, multi-branch rolls --

defineRollBranches({
    name: 'Endless assault',
    description: 'At the end of the round, roll a die. 1-2: +4 health (enemy)',
    when: 'round-end',
    roll: 1,
    branches: [
        { faces: [1, 2], effect: heal(4, 'owner') },
    ],
});