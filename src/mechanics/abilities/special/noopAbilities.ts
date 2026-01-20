import { registerAbility } from '../../abilityRegistry';
import { createNoopAbility } from '../abilityFactories';

/**
 * Registers abilities that don't yet have functional implementations.
 * These exist to prevent crashes when creating enemies with unsupported
 * abilities and to display the ability effect to the user.
 */

// Complex abilities requiring multi-enemy combat or special mechanics
registerAbility(createNoopAbility({
    name: 'A Siege of Scarrons',
    description: 'Complex multi-enemy combat encounter.',
}));

registerAbility(createNoopAbility({
    name: 'Absorption',
    description:
        'If you win a round, roll a die. If the result is 3+, reduce ' +
        'the magic of the enemy by 4. If magic reaches 0, you win.',
}));

registerAbility(createNoopAbility({
    name: 'Air of corruption',
    description:
        'You cannot use any special abilities. You can use potions ' +
        'and backpack items.',
}));

registerAbility(createNoopAbility({
    name: 'Concentration',
    description: 'You cannot use potions or special abilities.',
}));

registerAbility(createNoopAbility({
    name: 'Dark Claw',
    description:
        'When Snaide rolls a double, he can immediately inflict 4 damage, ' +
        'ignoring armour.',
}));

registerAbility(createNoopAbility({
    name: 'Dark Master',
    description:
        'If you are a Necromancer, roll a die at the start of each round. ' +
        'If you roll a 6, the zombie will inflict damage on the Apprentice.',
}));

registerAbility(createNoopAbility({
    name: 'Dark Mending',
    description:
        'At the end of the combat round, the Dark Arthurian restores 2 ' +
        'health for each Necromancer that is alive.',
}));

registerAbility(createNoopAbility({
    name: 'Deadly Charge',
    description:
        'When you take health damage, you take 1 additional damage per 2 ' +
        'armour rounded up.',
}));

registerAbility(createNoopAbility({
    name: 'Elemental Master',
    description: 'Can switch between Shadow, Flame, and Rock forms.',
}));

registerAbility(createNoopAbility({
    name: 'Fed from fear',
    description:
        'At the end of each combat round, the armour is increased by 1.',
}));

registerAbility(createNoopAbility({
    name: 'First cut',
    description: 'First strike damage bonus.',
}));

registerAbility(createNoopAbility({
    name: 'Gathering of Ghasts',
    description:
        'Attacks ignore armour. If the hero has Second Skin, use half ' +
        'the armour score rounded up.',
}));

registerAbility(createNoopAbility({
    name: 'Heal me',
    description: 'The hero can restore 15 health once in the combat.',
}));

registerAbility(createNoopAbility({
    name: 'Healer\'s Gift',
    description:
        'If the hero has Companion on the hero sheet, the hero can ' +
        'restore 12 health once in the combat.',
}));

registerAbility(createNoopAbility({
    name: 'Helping Hand',
    description:
        'For each remaining hero alive (Janna, Gull, Laine, Klaret), ' +
        'you can add 1 to your damage score.',
}));

registerAbility(createNoopAbility({
    name: 'Holy Shield',
    description:
        'When this is defeated, reduce the Architect\'s armour score by 8.',
}));

registerAbility(createNoopAbility({
    name: 'Ice armour',
    description: 'Spawns 4 Ice Pillar.',
}));

registerAbility(createNoopAbility({
    name: 'Ice pillar',
    description:
        'When a pillar is destroyed, the Chilblain\'s armour is set to 10.',
}));

registerAbility(createNoopAbility({
    name: 'Indigestion',
    description:
        'If you win a round, you can strike as normal or lose 5 health ' +
        'and ignore armour.',
}));

registerAbility(createNoopAbility({
    name: 'Inquisitor\'s Wrath',
    description:
        'If the hero has Rival on the hero sheet, the hero adds 2 to ' +
        'their damage starting in round 3.',
}));

registerAbility(createNoopAbility({
    name: 'Itchy and scratchy',
    description:
        'At the start of each combat round roll a die: If you roll a 1, ' +
        'your speed is reduced by 1 for this combat round.',
}));

registerAbility(createNoopAbility({
    name: 'Knockdown',
    description:
        'If your hero takes health damage from the troll, you must reduce ' +
        'your speed for the next combat round by 1.',
}));

registerAbility(createNoopAbility({
    name: 'Leech',
    description:
        'For each damage inflicted to the hero, heal the same amount.',
}));

registerAbility(createNoopAbility({
    name: 'Mad Scientist',
    description:
        'Before rolling for damage, roll a die. On 1-2: cancel damage and ' +
        'reduce speed. On 3-4: reduce hero speed. On 5-6: enemy rolls 2 ' +
        'damage dice.',
}));

registerAbility(createNoopAbility({
    name: 'Magic Shield',
    description:
        'You can reduce your magic by 2 for the combat to avoid taking ' +
        'damage from the neural blast. If magic reaches 0, you lose.',
}));

registerAbility(createNoopAbility({
    name: 'Magic of the Makers',
    description:
        'When a statue is defeated, the speed, magic and armour score of ' +
        'Lorcan are raised by 1.',
}));

registerAbility(createNoopAbility({
    name: 'Nasty Nibblers',
    description:
        'At the end of the combat round, roll a die. If you roll a 1 or 2, ' +
        'you reduce your armour by 1 for the rest of the combat.',
}));

registerAbility(createNoopAbility({
    name: 'Raise Dead',
    description:
        'At the end of the combat round, the Skeleton Horde raises their ' +
        'health and max health by 10.',
}));

registerAbility(createNoopAbility({
    name: 'Raking Claws',
    description:
        'The enemy rolls 2 dice for damage and uses the higher result.',
}));

registerAbility(createNoopAbility({
    name: 'Rock Form',
    description:
        'If the hero takes health damage, lower the speed of the hero by 1 ' +
        'for the next round.',
}));

registerAbility(createNoopAbility({
    name: 'Shadow Form',
    description:
        'Each time you take health damage, lower your brawn or magic ' +
        '(the higher one) by 2.',
}));

registerAbility(createNoopAbility({
    name: 'Shatter Shield',
    description:
        'If you win a combat round, instead of rolling for damage, you can ' +
        'choose to reduce the enemy\'s armour by 4.',
}));

registerAbility(createNoopAbility({
    name: 'Swarm of Spores',
    description:
        'At the end of each combat round, starting in round 3, the Landsbury ' +
        'shield takes damage equal to the Spore Cloud\'s remaining health.',
}));

registerAbility(createNoopAbility({
    name: 'Two Arms!',
    description:
        'At the end of each round, add the next not yet equipped item: ' +
        'Breastplate (+2 armour), Cloak (+1 speed), Shield (+2 armour), ' +
        'Helmet (+2 armour), Legguards (+1 armour).',
}));

registerAbility(createNoopAbility({
    name: 'Unnatural growth',
    description:
        'At the end of every combat round, KerKlick raises its brawn by 1, ' +
        'up to max of 10.',
}));

registerAbility(createNoopAbility({
    name: 'Vampire',
    description:
        'Vampiric creature with special weaknesses and abilities.',
}));

registerAbility(createNoopAbility({
    name: 'Withering Strikes',
    description: 'Everytime you take damage, reduce brawn and magic by 1.',
}));

registerAbility(createNoopAbility({
    name: 'Wounded',
    description: 'You cannot heal after this combat.',
}));

registerAbility(createNoopAbility({
    name: 'Wrath of Winter',
    description:
        'At the end of the round, take damage equal to the number of rounds ' +
        'plus 1 ignoring armour.',
}));

registerAbility(createNoopAbility({
    name: 'Blindside',
    description:
        'If you win the combat round while using a speed ability, decrease ' +
        'the armour by 10 for this combat round.',
}));

registerAbility(createNoopAbility({
    name: 'Dark disciple',
    description: 'All hero rolls of a 6 become a 1 automatically.',
}));

registerAbility(createNoopAbility({
    name: 'Dismantle',
    description:
        'If you win a combat round, you can choose to skip the damage roll ' +
        'and lower the enemies armour by 4 for the rest of the combat.',
}));
