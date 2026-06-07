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

/*
The Heart of Fire,2,Xenos,390,12,-,9,9,65,"Knowledge is power: If the hero wins a round, instead for rolling for damage: -1 speed -1 magic -1 armour (enemy, min speed 9, min magic armour 6)",
The Heart of Fire,2,Stone giants,392,5,4,-,12,35,"Charged: Each time hero scores damage on the giant and don't have Insulated - -2 health; ",Runed pilar,
The Heart of Fire,2,Runed pilar,392,-,-,-,3,10,"Pound those pillars: When destroyed, -4 armour (Stone giant), 6 damage (hero); ",
The Heart of Fire,2,Runed pilar,392,-,-,-,3,10,"Pound those pillars: When destroyed, -4 armour (Stone giant), 6 damage (hero); ",
The Heart of Fire,2,Runed pilar,392,-,-,-,3,10,"Pound those pillars: When destroyed, -4 armour (Stone giant), 6 damage (hero); ",
The Heart of Fire,1,Saw,398,5,4,-,3,40,"Spinning saw: At the end of each round, roll a die. 1-2: -4 health (hero), 3-6: -4 health (Soldiers); Wood and metal: Immune to Bleet",
The Heart of Fire,1,Soldiers,398,-,-,-,1,25,"Stabbing swords: At the end of the combat round, -2 health (hero); Wood and metal: Immune to Bleet",
The Heart of Fire,2,Fisher king,408,8,6,-,5,80,"Jump around: At the start of the combat round, pick [North, Center, East] and roll a die. 1-2: Continue when North was picked, 3-4: Continue when Center was picked, 5-6: Continue when East was picked. Otherwise take speed challenge - 1-13: -6 health (hero). Continue with passive effects.",
The Heart of Fire,1,Custodian,419,5,-,4,3,50,"Reanimator: Once per combat when Custodian is below 25 health - +40 health (Forty thieves); Hex of pain: At the end of the combat round, -1 health (hero)",
The Heart of Fire,1,Forty thieves,419,5,-,5,2,0,"Protector: Custodian cannot be damaged while Forty thieves are alive; Reanimator 2: At the end of the round, +2 health (enemy, max 50)",Forty thieves
The Heart of Fire,1,The Forger,422,4,3,-,4,40,"Flame wrapper: At the start of the combat round, roll a die. 1-3: +1 brawn (enemy); Knockdown",
The Heart of Fire,1,Rocco,425,5,4,-,4,35,"Body of rock",
The Heart of Fire,2,Umbra,432,6,5,-,4,60,"It's behind you: At the end of the combat round, roll a die. 1-2: 10 damage (hero)",
The Heart of Fire,2,Cuddles,433,5,3,-,3,40,"Piercing claws: Piercing; Bleed",
The Heart of Fire,2,Quetzal,457,7,6,-,5,40,"Razor beak: Piercing",
The Heart of Fire,2,Totem,459,6,-,5,-,-,"Power cubed: When all cubes are alive, roll 3 damage dice.",Snake cube; Spider cube;Jaguar cube
The Heart of Fire,2,Snake cube,459,-,-,-,5,25,"Snake cube: Venom (Totem); Enhanted rock: Immune to Bleed",
The Heart of Fire,2,Spider cube,459,-,-,-,5,25,"Spider cube: +1 speed (Totem); Enhanted rock: Immune to Bleed",
The Heart of Fire,2,Jaguar cube,459,-,-,-,5,25,"Jaguar cube: At the end of the combat round, -2 health (hero); Enhanted rock: Immune to Bleed",
The Heart of Fire,2,Succubus,463,10,-,5,9,80,"Mental daggers: -2 health * rd (Hero); Delirium: Inflicted when Hero takes damage. When hero wins a round, roll a die. 1-2: Skip damage roll phase;Revenge of the tigris: +2 damage (hero)",
The Heart of Fire,2,Bill,466,9,8,-,8,90,"Backshot barrage: At the end of round, take a speed challenge. 1-14: 10 damage (hero); Animal attraction: If you have the rhinosaur pheromone & the rhinosaur has been freed from its cage, instead of rolling for damage: -4 health * every rd (enemy); Survival of the fittest: Immune to Strength in Numbers",
The Heart of Fire,2,Sniper,482,9,6,-,5,60,"",
The Heart of Fire,2,Maximus,484,5,5,-,15,40,"Dismantle: Instead of rolling for damage: -3 armour (enemy, min 0); Body or iron: Immune to bleed, thorsn and thorn cage",
The Heart of Fire,2,The furnace,490,5,-,4,2,70,"Fury of the furnace: -3 health * rd (hero);Holy vengeance: +3 damage (hero)",
The Heart of Fire,2,Lycanth,495,5,5,-,4,55,"Miasma of decay: -3 health * rd (hero); Disease",
The Heart of Fire,2,Succubus,505,10,-,5,9,80,"Mental daggers: -2 health * rd (Hero); Delirium: Inflicted when Hero takes damage. When hero wins a round, roll a die. 1-2: Skip damage roll phase;Revenge of the tigris: +4 damage (hero)",
The Heart of Fire,2,Mandrills,517,9,6,-,8,50,"Feral frency: +1 speed * rd (enemy, max 14)",
The Heart of Fire,2,Hunters,521,9,7,-,4,35,"",
The Heart of Fire,2,Grub knight,523,6,5,-,4,55,"Grappling grubs: Damage (hero) -> roll a die. 1-3: -1 speed (hero); Disease",
The Heart of Fire,2,Boogaloo,552,6,4,-,3,50,"It's `lectric: If not Insulated, -(2 + armour) health (hero)",
The Heart of Fire,2,Hounds,564,11,7,-,5,90,"Pack attack: If enemy rolls double for speed, -4 health (hero);Molten skin: -2 health * rd (hero); Body of flame: Immune to Backdraft, Fire Aura, Sear, Searing Mantle",
The Heart of Fire,2,Golden Guards,568,9,9,-,8,70,"Scything blades: Each time a speed or combat ability is played, roll a die. 1-4: -4 health (hero), ability is skipped; Knockdown",
The Heart of Fire,2,Tigris,570,9,6,-,4,70,"Revenge of the tigris: 3 damage dice for highest value;Bleed",
The Heart of Fire,2,Succubus,572,10,-,5,9,80,"Mental daggers: -2 health * rd (Hero); Delirium: Inflicted when Hero takes damage. When hero wins a round, roll a die. 1-2: Skip damage roll phase;Revenge of the tigris: +2 damage (hero)",
The Heart of Fire,2,Zephyr,573,5,-,4,3,50,"Slipstream: Hero wins speed, roll a die: 1-3: -4 health (hero), skip to passive phase; Body of air: Immune to Bleed, Disease and Venom",
The Heart of Fire,2,Cernos,579,10,9,-,10,85,"",Rock fists
The Heart of Fire,2,Rock fists,579,-,-,-,10,40,"Rock fists: +2 speed (enemy), 2 damage dice; Body of rock",
The Heart of Fire,2,Arratoch,582,-,-,-,5,35,"Arratoch alarm: -2 brawn * rd (hero), -2 magic * rd (hero); Body of rock; Companions courage: +2 damage (hero);Golem need: If both Otum and Atum are dead, hero wins fight",Otum;Atum
The Heart of Fire,2,Olum,582,11,8,-,9,50,"Brotherly love: If Atum is dead: +2 speed (Olum), +4 brawn (Olum); Body of rock; Golem protector: When winning a round the hero can choose to Attack Arratoch instead"
The Heart of Fire,2,Atum,582,11,9,-,7,50,"Brotherly love: If Olum is dead: +2 speed (Atum), +4 brawn (Atum); Body of rock; Golem protector",
The Heart of Fire,2,Sitadell,584,10,7,-,8,60,"Rock bluff: +2 armour * rd. When hero wins round instead of rolling for damage: 7 armour (enemy); Body of rock",
The Heart of Fire,2,The weeper,586,7,5,-,4,60,"Septic seepage: -rd health * rd (hero)",
The Heart of Fire,2,Zambezi,588,9,7,-,6,60,"Sniper fire: At the end of the round roll a die. 1-3: -3 health (hero), 4-6: -3 health (enemy)",
The Heart of Fire,2,Langurs,596,10,4,-,6,40,"Leaf blades: Piercing",Squirrels
The Heart of Fire,2,Squirrels,596,-,-,-,2,30,"Angry mob: Speed challenge @ end of round. 1-16: -5 health (hero)",
The Heart of Fire,2,Perez,597,9,6,-,6,70,"Bark whip: For each 1 hero rolls for speed: -4 health",
The Heart of Fire,2,Lich,599,10,-,9,10,90,"Rune master: Roll a die @ end of round. 1-2: +4 health (enemy), 3-4: -armour health (hero), 5-6: -2 speed * 1 rd (hero), unless hero is Hexed",
The Heart of Fire,2,Fire sprite,601,11,-,6,4,40,"Blistering heat: -1 health (hero), unless hero has Fire Shield; Fan the flames: Once, when reduced to <=20 health, roll a die: 1-2: +10 health, +3 magic (enemy), 3-4: +5 health (enemy), 5-6: +3 magic (enemy). If hero has Wind Breaker, 2 is addded to the die roll; Body of flame; Forge master: If hero has Fire Quencher: 30 health (enemy)",
The Heart of Fire,2,Nergal,603,10,-,8,10,100,"Hunger strike: Hero takes damage, roll a die. 1: Proceded, 2-6: +4 health (enemy, max 100), repeat max 6 times); Unstoppable feast: If hero loses round, no abilities can be used for the remainder of the round; Companions' courage: +2 damage (hero)",

*/
registerAbility(createNoopAbility({
    name: 'Sinister saps',
    description:
        'At the end of the round, add 1 sap. Each sap deals 1 damage to the hero, ignoring armour.',
}));

registerAbility(createNoopAbility({
    name: 'Blast the bile',
    description:
        'When hero wins round, instead of rolling for damage, destroy all saps.',
}));

registerAbility(createNoopAbility({
    name: 'Power pruning',
    description:
        'If hero wins round, instead of rolling for damage, -4 armour (enemy).',
}));

registerAbility(createNoopAbility({
    name: 'Bullet storm',
    description:
        'If the enemy wins a round, roll a die. 4-6 - ant does not deal damage.',
}));

registerAbility(createNoopAbility({
    name: 'Ghost of a victory',
    description: 'Immune to Cutpurse, Pillage.',
}));

registerAbility(createNoopAbility({
    name: 'Look out for larvae',
    description:
        'At the start of the combat round, roll a die. 1-3 adds one larvae. Each larvae deals 1 damage ignoring armour at the end of the round.',
}));

registerAbility(createNoopAbility({
    name: 'Bug blaster',
    description: 'Use borehole charge -  -10 health.',
}));

registerAbility(createNoopAbility({
    name: 'Harm or heal',
    description:
        'If enemy wins a round, roll a die. 1-2: +2 health (enemy, max 18), 3-6: roll for damage.',
}));

registerAbility(createNoopAbility({
    name: 'Blood suckers',
    description:
        'When enemy wins round and causes damage to the enemy, +1 health (enemy, max 30).',
}));

registerAbility(createNoopAbility({
    name: 'Back to black',
    description: '+1 brawn at the end of round (max 8).',
}));

registerAbility(createNoopAbility({
    name: 'Look into my eyes',
    description:
        'When the hero rolls the 8th 1 die (after rerolling) and they don\'t have the Golden mirror, the hero loses; if the enemy rolls the 8th 1 die and the hero has the Golden mirror, the hero wins.',
}));

registerAbility(createNoopAbility({
    name: 'Stone skin',
    description: 'At the start of the 5th round, raise armour to 28.',
}));

registerAbility(createNoopAbility({
    name: 'Chip away',
    description:
        'After the start of the 5th round, instead of rolling for damage the hero can reduce armour of the enemy by 4, taking 4 damage ignoring armour.',
}));

registerAbility(createNoopAbility({
    name: 'Titan stone',
    description:
        'At the start of round 5, enemy is immune to all passive damage.',
}));

registerAbility(createNoopAbility({
    name: 'Feeding time',
    description:
        'Every 3 rounds, if Roots are still alive hero receives 15 damage. Roots restore full health (even when defeated).',
}));

registerAbility(createNoopAbility({
    name: 'Undead',
    description: 'You can use ashes, holy water, holy protector.',
}));

registerAbility(createNoopAbility({
    name: 'Grappling hands',
    description: 'If enemy wins a round and rolls a 6 for damage - hero loses an equipment item or backpack item.',
}));

registerAbility(createNoopAbility({
    name: 'Blast of',
    description: 'The enemy wins after round 6.',
}));

registerAbility(createNoopAbility({
    name: 'Cowardly',
    description: 'If First mate is defeated, Hero wins the combat.',
}));

registerAbility(createNoopAbility({
    name: 'Shock treatment',
    description: 'If any character rolls a double - lose 4 health ignoring armour.',
}));

registerAbility(createNoopAbility({
    name: 'In a spin',
    description: 'If hero wins a combat round, roll a die - 1-2 hero does not roll for damage.',
}));

registerAbility(createNoopAbility({
    name: 'Ranged foe',
    description: 'Hero cannot use speed or combat abilities.',
}));

registerAbility(createNoopAbility({
    name: 'Back from dead',
    description: 'When enemy is defeated, roll a die - 1-2 enemy gains 6 health. Can only be used once per combat.',
}));

registerAbility(createNoopAbility({
    name: 'Backdraft',
    description: 'When hero scores damage, take 3 damage ignoring armour.',
}));

registerAbility(createNoopAbility({
    name: 'Enraged',
    description: 'At the start of round 5 - enemy gains +1 speed and +1 brawn.',
}));

registerAbility(createNoopAbility({
    name: 'Frost fire',
    description: 'When hero receives damage, lose 1 health at the end of each round.',
}));

registerAbility(createNoopAbility({
    name: 'Corpse dance',
    description:
        'If Gairn\'s health is reduced to 25 or less, Gairn removes all passive effects and hides.',
}));

registerAbility(createNoopAbility({
    name: 'Army',
    description: 'Skeletons will only be enemies when Gairn is hidden.',
}));

registerAbility(createNoopAbility({
    name: 'Undead minions',
    description: 'You can use holy water, holy protector against these minions.',
}));

registerAbility(createNoopAbility({
    name: 'Stone blood',
    description: 'If enemy rolls 4-6 for damage - armour of the enemy is raised by 1 up to 6.',
}));

registerAbility(createNoopAbility({
    name: 'Divine fury',
    description: 'Hero\'s damage is increased by 3.',
}));

// TODO: Shoul dbe a hero ability
registerAbility(createNoopAbility({
    name: 'Thousand fists',
    description: 'Instead of rolling for damage, roll 2 (then 3, 4, 5 in consecuitve round) damage dice ignoring armor. Can only be triggered once.',
}));

registerAbility(createNoopAbility({
    name: 'Slash and burn',
    description: 'Roll 3 damage dice and take the highest result.',
}));

registerAbility(createNoopAbility({
    name: 'Ashes to ashes',
    description: 'When hero rolls double for speed, they lose the combat round.',
}));

registerAbility(createNoopAbility({
    name: 'Unstoppable',
    description: 'If hero is alive at the end of round 5, the enemy is defeated.',
}));

registerAbility(createNoopAbility({
    name: 'All pile on',
    description: 'No special abilities or backpack items can be used in this combat.',
}));

registerAbility(createNoopAbility({
    name: 'Furious roar',
    description: 'Instead of rolling for damage, increase speed, brawn and magic by 1 for 3 rounds.',
}));

registerAbility(createNoopAbility({
    name: 'Holy healer',
    description: 'Restore full health when hero is <=8. Only use once per combat.',
}));


registerAbility(createNoopAbility({
    name: 'Knowledge is power',
    description:
        'If the hero wins a round, instead for rolling for damage: -1 ' +
        'speed -1 magic -1 armour (enemy, min speed 9, min magic ' +
        'armour 6)',
}));

registerAbility(createNoopAbility({
    name: 'Pound those pillars',
    description:
        'When destroyed, -4 armour (Stone giant), 6 damage (hero)',
}));

registerAbility(createNoopAbility({
    name: 'Spinning saw',
    description:
        'At the end of each round, roll a die. 1-2: -4 health (hero), ' +
        '3-6: -4 health (Soldiers)',
}));

registerAbility(createNoopAbility({
    name: 'Wood and metal',
    description:
        'Immune to Bleet',
}));



registerAbility(createNoopAbility({
    name: 'Jump around',
    description:
        'At the start of the combat round, pick [North, Center, East] ' +
        'and roll a die. 1-2: Continue when North was picked, 3-4: ' +
        'Continue when Center was picked, 5-6: Continue when East was ' +
        'picked. Otherwise take speed challenge - 1-13: -6 health ' +
        '(hero). Continue with passive effects.',
}));

registerAbility(createNoopAbility({
    name: 'Reanimator',
    description:
        'Once per combat when Custodian is below 25 health - +40 ' +
        'health (Forty thieves)',
}));



registerAbility(createNoopAbility({
    name: 'Protector',
    description:
        'Custodian cannot be damaged while Forty thieves are alive',
}));



registerAbility(createNoopAbility({
    name: 'Flame wrapper',
    description:
        'At the start of the combat round, roll a die. 1-3: +1 brawn ' +
        '(enemy)',
}));

registerAbility(createNoopAbility({
    name: 'It\'s behind you',
    description:
        'At the end of the combat round, roll a die. 1-2: 10 damage ' +
        '(hero)',
}));

registerAbility(createNoopAbility({
    name: 'Razor beak',
    description:
        'Piercing',
}));

registerAbility(createNoopAbility({
    name: 'Power cubed',
    description:
        'When all cubes are alive, roll 3 damage dice.',
}));

registerAbility(createNoopAbility({
    name: 'Snake cube',
    description:
        'Venom (Totem)',
}));

registerAbility(createNoopAbility({
    name: 'Spider cube',
    description:
        '+1 speed (Totem)',
}));





registerAbility(createNoopAbility({
    name: 'Delirium',
    description:
        'Inflicted when Hero takes damage. When hero wins a round, ' +
        'roll a die. 1-2: Skip damage roll phase',
}));

registerAbility(createNoopAbility({
    name: 'Revenge of the tigris',
    description:
        '3 damage dice for highest value',
}));

registerAbility(createNoopAbility({
    name: 'Backshot barrage',
    description:
        'At the end of round, take a speed challenge. 1-14: 10 damage ' +
        '(hero)',
}));

registerAbility(createNoopAbility({
    name: 'Animal attraction',
    description:
        'If you have the rhinosaur pheromone & the rhinosaur has been ' +
        'freed from its cage, instead of rolling for damage: -4 ' +
        'health * every rd (enemy)',
}));

registerAbility(createNoopAbility({
    name: 'Survival of the fittest',
    description:
        'Immune to Strength in Numbers',
}));

registerAbility(createNoopAbility({
    name: 'Body or iron',
    description:
        'Immune to bleed, thorsn and thorn cage',
}));



registerAbility(createNoopAbility({
    name: 'Holy vengeance',
    description:
        '+3 damage (hero)',
}));



registerAbility(createNoopAbility({
    name: 'Feral frency',
    description:
        '+1 speed * rd (enemy, max 14)',
}));

registerAbility(createNoopAbility({
    name: 'Grappling grubs',
    description:
        'Damage (hero) -> roll a die. 1-3: -1 speed (hero)',
}));

registerAbility(createNoopAbility({
    name: 'It\'s `lectric',
    description:
        'If not Insulated, -(2 + armour) health (hero)',
}));

registerAbility(createNoopAbility({
    name: 'Pack attack',
    description:
        'If enemy rolls double for speed, -4 health (hero)',
}));



registerAbility(createNoopAbility({
    name: 'Scything blades',
    description:
        'Each time a speed or combat ability is played, roll a die. ' +
        '1-4: -4 health (hero), ability is skipped',
}));

registerAbility(createNoopAbility({
    name: 'Slipstream',
    description:
        'Hero wins speed, roll a die: 1-3: -4 health (hero), skip to ' +
        'passive phase',
}));

registerAbility(createNoopAbility({
    name: 'Rock fists',
    description:
        '+2 speed (enemy), 2 damage dice',
}));

registerAbility(createNoopAbility({
    name: 'Arratoch alarm',
    description:
        '-2 brawn * rd (hero), -2 magic * rd (hero)',
}));

registerAbility(createNoopAbility({
    name: 'Companions courage',
    description:
        '+2 damage (hero)',
}));

registerAbility(createNoopAbility({
    name: 'Golem need',
    description:
        'If both Otum and Atum are dead, hero wins fight',
}));

registerAbility(createNoopAbility({
    name: 'Brotherly love',
    description:
        'If Atum is dead: +2 speed (Olum), +4 brawn (Olum)',
}));

registerAbility(createNoopAbility({
    name: 'Golem protector',
    description:
        'When winning a round the hero can choose to Attack Arratoch ' +
        'instead',
}));

registerAbility(createNoopAbility({
    name: 'Rock bluff',
    description:
        '+2 armour * rd. When hero wins round instead of rolling for ' +
        'damage: 7 armour (enemy)',
}));

registerAbility(createNoopAbility({
    name: 'Septic seepage',
    description:
        '-rd health * rd (hero)',
}));

registerAbility(createNoopAbility({
    name: 'Sniper fire',
    description:
        'At the end of the round roll a die. 1-3: -3 health (hero), ' +
        '4-6: -3 health (enemy)',
}));

registerAbility(createNoopAbility({
    name: 'Leaf blades',
    description:
        'Piercing',
}));

registerAbility(createNoopAbility({
    name: 'Angry mob',
    description:
        'Speed challenge @ end of round. 1-16: -5 health (hero)',
}));

registerAbility(createNoopAbility({
    name: 'Bark whip',
    description:
        'For each 1 hero rolls for speed: -4 health',
}));

registerAbility(createNoopAbility({
    name: 'Rune master',
    description:
        'Roll a die @ end of round. 1-2: +4 health (enemy), 3-4: ' +
        '-armour health (hero), 5-6: -2 speed * 1 rd (hero), unless ' +
        'hero is Hexed',
}));

registerAbility(createNoopAbility({
    name: 'Blistering heat',
    description:
        '-1 health (hero), unless hero has Fire Shield',
}));

registerAbility(createNoopAbility({
    name: 'Fan the flames',
    description:
        'Once, when reduced to <=20 health, roll a die: 1-2: +10 ' +
        'health, +3 magic (enemy), 3-4: +5 health (enemy), 5-6: +3 ' +
        'magic (enemy). If hero has Wind Breaker, 2 is addded to the ' +
        'die roll',
}));

registerAbility(createNoopAbility({
    name: 'Forge master',
    description:
        'If hero has Fire Quencher: 30 health (enemy)',
}));

registerAbility(createNoopAbility({
    name: 'Hunger strike',
    description:
        'Hero takes damage, roll a die. 1: Proceded, 2-6: +4 health ' +
        '(enemy, max 100), repeat max 6 times)',
}));

registerAbility(createNoopAbility({
    name: 'Unstoppable feast',
    description:
        'If hero loses round, no abilities can be used for the ' +
        'remainder of the round',
}));

registerAbility(createNoopAbility({
    name: 'Companions\' courage',
    description:
        '+2 damage (hero)',
}));

// function createAbility(config: {
//     name: string;
//     description: string;
//     trigger: AbilityHooks;
//     type?: AbilityType;
// }): AbilityDefinition {
//     return {
//         name: config.name,
//         type: config.type ?? 'special',
//         description: config.description,
//         reviewed: false,
//         ...config.trigger,
//     };
// }

// registerAbility(createAbility({
//     name: 'Holy healer',
//     description: 'Restore full health when hero is <=8. Only use once per combat.',
//     trigger: {
//         onDamageDealt: (state, context) => {
//             if (context.target === 'hero' && getCombatant(state, 'hero').health)
//         }
//     }
// }));