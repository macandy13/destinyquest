import { Enemy } from '../types/character';

export const ENEMIES: Enemy[] = [
  {
    "type": "enemy",
    "name": "Mauler",
    "stats": {
      "speed": 5,
      "brawn": 8,
      "magic": 0,
      "armour": 5,
      "health": 30,
      "maxHealth": 30
    },
    "abilities": [
      "Ferocity: If Mauler wins a combat round and inflicts health damage on your hero,the beast automatically raises its speed to 7 for the next round."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 18
    }
  },
  {
    "type": "enemy",
    "name": "Humbaroth",
    "stats": {
      "speed": 4,
      "brawn": 9,
      "magic": 0,
      "armour": 4,
      "health": 35,
      "maxHealth": 35
    },
    "abilities": [
      "Punishing blows: Each time Humbaroth inflicts health damage, your armour is lowered by 1. (The armour value is restored after the combat is over)"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 29
    }
  },
  {
    "type": "enemy",
    "name": "Storm Elemental",
    "stats": {
      "speed": 2,
      "brawn": 0,
      "magic": 1,
      "armour": 1,
      "health": 25,
      "maxHealth": 25
    },
    "abilities": [
      "Charged: Each time you inflict health damage on the elemental, you take 2 damage in return. This ability ignores armour."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 33
    }
  },
  {
    "type": "enemy",
    "name": "Malachi of Fire",
    "stats": {
      "speed": 4,
      "brawn": 0,
      "magic": 4,
      "armour": 2,
      "health": 20,
      "maxHealth": 20
    },
    "abilities": [
      "Fiery aura: You automatically take 3 health damage at the end of the round. This ability ignores armour."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 35
    }
  },
  {
    "type": "enemy",
    "name": "Goblin poachers",
    "stats": {
      "speed": 0,
      "brawn": 1,
      "magic": 0,
      "armour": 0,
      "health": 20,
      "maxHealth": 20
    },
    "abilities": [
      ""
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 37
    }
  },
  {
    "type": "enemy",
    "name": "Zalladell",
    "stats": {
      "speed": 5,
      "brawn": 0,
      "magic": 7,
      "armour": 4,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Black sigill: At the end of each combat round, your hero suffers 1 damage. This ability ignores armour.",
      "Bewitched: Reroll any 1 or 2 dice results for Zalldell. The results of the rerolled dice must be used."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 49
    }
  },
  {
    "type": "enemy",
    "name": "Ghouls",
    "stats": {
      "speed": 5,
      "brawn": 3,
      "magic": 0,
      "armour": 2,
      "health": 30,
      "maxHealth": 30
    },
    "abilities": [
      "Piercing claws: The ghouls' attacks ignore armour."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 59
    }
  },
  {
    "type": "enemy",
    "name": "Spindle",
    "stats": {
      "speed": 5,
      "brawn": 5,
      "magic": 0,
      "armour": 3,
      "health": 30,
      "maxHealth": 30
    },
    "abilities": [
      "Webbed: The spiders's sticky webbing inhibits your movement. At the start of every combat round, roll a die. If you roll a 1 or 2, your speed is reduced by 1 for the round.",
      "Venom: Once you have taken health damage from the spider, at the end of every combat round you must automatically lose 2 health."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 60
    }
  },
  {
    "type": "enemy",
    "name": "Ruffians",
    "stats": {
      "speed": 2,
      "brawn": 3,
      "magic": 0,
      "armour": 1,
      "health": 15,
      "maxHealth": 15
    },
    "abilities": [
      "Crone's dagger: If the Ruffians roll a 6 for damage, the crone's dagger automatically inflicts 1 extra point of health damage."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 62
    }
  },
  {
    "type": "enemy",
    "name": "Turnips",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 1,
      "health": 10,
      "maxHealth": 10
    },
    "abilities": [
      ""
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 63
    }
  },
  {
    "type": "enemy",
    "name": "Mist stalker",
    "stats": {
      "speed": 0,
      "brawn": 1,
      "magic": 0,
      "armour": 0,
      "health": 10,
      "maxHealth": 10
    },
    "abilities": [
      ""
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 65
    }
  },
  {
    "type": "enemy",
    "name": "Rennie",
    "stats": {
      "speed": 3,
      "brawn": 2,
      "magic": 0,
      "armour": 2,
      "health": 15,
      "maxHealth": 15
    },
    "abilities": [
      "First cut"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 70
    }
  },
  {
    "type": "enemy",
    "name": "Lake Spirit",
    "stats": {
      "speed": 4,
      "brawn": 0,
      "magic": 5,
      "armour": 2,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      ""
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 81
    }
  },
  {
    "type": "enemy",
    "name": "Skeleton guards",
    "stats": {
      "speed": 4,
      "brawn": 4,
      "magic": 0,
      "armour": 3,
      "health": 25,
      "maxHealth": 25
    },
    "abilities": [
      "Body of bone: Immune to Bleed and Venom"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 90
    }
  },
  {
    "type": "enemy",
    "name": "Grey hag",
    "stats": {
      "speed": 6,
      "brawn": 6,
      "magic": 0,
      "armour": 3,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Warts and all: At the end of each combat round, roll a die. If the result is 1, the witch has temporarily transformed you into a warty toad. As a toad you can only roll 1 speed die."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 92
    }
  },
  {
    "type": "enemy",
    "name": "Tree roots",
    "stats": {
      "speed": 5,
      "brawn": 4,
      "magic": 0,
      "armour": 230,
      "health": null,
      "maxHealth": null
    },
    "abilities": [
      ""
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 93
    }
  },
  {
    "type": "enemy",
    "name": "Ancient knight",
    "stats": {
      "speed": 5,
      "brawn": 4,
      "magic": 0,
      "armour": 2,
      "health": 25,
      "maxHealth": 25
    },
    "abilities": [
      "Body of bone: Immune to Bleed and Venom"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 98
    }
  },
  {
    "type": "enemy",
    "name": "Ghouls",
    "stats": {
      "speed": 5,
      "brawn": 3,
      "magic": 0,
      "armour": 2,
      "health": 30,
      "maxHealth": 30
    },
    "abilities": [
      "Piercing claws: The ghouls' attacks ignore armour."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 100
    }
  },
  {
    "type": "enemy",
    "name": "Allura of Water",
    "stats": {
      "speed": 5,
      "brawn": 4,
      "magic": 0,
      "armour": 1,
      "health": 25,
      "maxHealth": 25
    },
    "abilities": [
      "Healing touch: At the end of the combat round, Allura heals 2 health. Once her health has been reduced to 0, she cannot heal."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 105
    }
  },
  {
    "type": "enemy",
    "name": "Valadin Roth",
    "stats": {
      "speed": 5,
      "brawn": 4,
      "magic": 0,
      "armour": 3,
      "health": 35,
      "maxHealth": 35
    },
    "abilities": [
      "Faithful duty: For every 6 that Valadin rolls, he heals 2 damage. This cannot take him above the initial 35 health.",
      "Body of bone: Immune to Bleed and Venom."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 109
    }
  },
  {
    "type": "enemy",
    "name": "Goblin poacher",
    "stats": {
      "speed": 0,
      "brawn": 1,
      "magic": 0,
      "armour": 0,
      "health": 10,
      "maxHealth": 10
    },
    "abilities": [
      ""
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 118
    }
  },
  {
    "type": "enemy",
    "name": "Changeling",
    "stats": {
      "speed": 5,
      "brawn": 5,
      "magic": 0,
      "armour": 3,
      "health": 45,
      "maxHealth": 45
    },
    "abilities": [
      "Blacke fire: At the end of the combat round, your hero takes 2 damage from the flames that surround the demon. This ability ignores armour."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 121
    }
  },
  {
    "type": "enemy",
    "name": "Huntsman",
    "stats": {
      "speed": 1,
      "brawn": 1,
      "magic": 0,
      "armour": 1,
      "health": 15,
      "maxHealth": 15
    },
    "abilities": [
      ""
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 125
    }
  },
  {
    "type": "enemy",
    "name": "Target dummy",
    "stats": {
      "speed": 5,
      "brawn": 6,
      "magic": 0,
      "armour": 6,
      "health": 25,
      "maxHealth": 25
    },
    "abilities": [
      "Sack and straw: Immune to Lightning, Piercing, Immobilise, Venom, Thorns, Corruption."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 126
    }
  },
  {
    "type": "enemy",
    "name": "Rabid rats",
    "stats": {
      "speed": 3,
      "brawn": 1,
      "magic": 0,
      "armour": 0,
      "health": 30,
      "maxHealth": 30
    },
    "abilities": [
      ""
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 130
    }
  },
  {
    "type": "enemy",
    "name": "Ghoul",
    "stats": {
      "speed": 5,
      "brawn": 2,
      "magic": 0,
      "armour": 2,
      "health": 15,
      "maxHealth": 15
    },
    "abilities": [
      "Piercing claws: The ghouls' attacks ignore armour."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 138
    }
  },
  {
    "type": "enemy",
    "name": "Scarecrow",
    "stats": {
      "speed": 0,
      "brawn": 1,
      "magic": 0,
      "armour": 0,
      "health": 8,
      "maxHealth": 8
    },
    "abilities": [
      ""
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 139
    }
  },
  {
    "type": "enemy",
    "name": "Leader",
    "stats": {
      "speed": 2,
      "brawn": 3,
      "magic": 0,
      "armour": 4,
      "health": 25,
      "maxHealth": 25
    },
    "abilities": [
      ""
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 144
    }
  },
  {
    "type": "enemy",
    "name": "Troll",
    "stats": {
      "speed": 5,
      "brawn": 6,
      "magic": 0,
      "armour": 3,
      "health": 60,
      "maxHealth": 60
    },
    "abilities": [
      "Knowndown: If your hero takes health damage from the troll, you must reduce your speed for the next combat round by 1",
      " Regeneration: At the start of the combat round, the Troll regains 2 health. Once the trolls health has been reduced to 0, he cannot heal."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 156
    }
  },
  {
    "type": "enemy",
    "name": "Giant crocodile",
    "stats": {
      "speed": 0,
      "brawn": 1,
      "magic": 0,
      "armour": 1,
      "health": 10,
      "maxHealth": 10
    },
    "abilities": [
      ""
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 159
    }
  },
  {
    "type": "enemy",
    "name": "Shadow",
    "stats": {
      "speed": 5,
      "brawn": 0,
      "magic": 4,
      "armour": 3,
      "health": 20,
      "maxHealth": 20
    },
    "abilities": [
      ""
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 178
    }
  },
  {
    "type": "enemy",
    "name": "Hobgoblin",
    "stats": {
      "speed": 0,
      "brawn": 1,
      "magic": 0,
      "armour": 1,
      "health": 12,
      "maxHealth": 12
    },
    "abilities": [
      ""
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 184
    }
  },
  {
    "type": "enemy",
    "name": "Giant spider",
    "stats": {
      "speed": 4,
      "brawn": 3,
      "magic": 0,
      "armour": 2,
      "health": 20,
      "maxHealth": 20
    },
    "abilities": [
      "Venom"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 189
    }
  },
  {
    "type": "enemy",
    "name": "Leader",
    "stats": {
      "speed": 2,
      "brawn": 3,
      "magic": 0,
      "armour": 4,
      "health": 25,
      "maxHealth": 25
    },
    "abilities": [
      ""
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 201
    }
  },
  {
    "type": "enemy",
    "name": "Noldor",
    "stats": {
      "speed": 7,
      "brawn": 5,
      "magic": 0,
      "armour": 4,
      "health": 60,
      "maxHealth": 60
    },
    "abilities": [
      ""
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 207
    }
  },
  {
    "type": "enemy",
    "name": "Changeling",
    "stats": {
      "speed": 5,
      "brawn": 0,
      "magic": 4,
      "armour": 2,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Hellfire:  At the end of the combat round, your hero takes 2 damage from the flames that surround the demon. This ability ignores armour."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 217
    }
  },
  {
    "type": "enemy",
    "name": "Rennie",
    "stats": {
      "speed": 3,
      "brawn": 2,
      "magic": 0,
      "armour": 2,
      "health": 15,
      "maxHealth": 15
    },
    "abilities": [
      "First cut"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 220
    }
  },
  {
    "type": "enemy",
    "name": "Voldring of Earth",
    "stats": {
      "speed": 4,
      "brawn": 3,
      "magic": 0,
      "armour": 5,
      "health": 20,
      "maxHealth": 20
    },
    "abilities": [
      "Mighty blows: Voldring rolls 2 damage dice."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 221
    }
  },
  {
    "type": "enemy",
    "name": "Rattling",
    "stats": {
      "speed": 3,
      "brawn": 3,
      "magic": 0,
      "armour": 2,
      "health": 12,
      "maxHealth": 12
    },
    "abilities": [
      "Tail lash: For every 1 you roll, the ratling hits you for 1 damage, ignoring armour."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 230
    }
  },
  {
    "type": "enemy",
    "name": "Burrower Alpha",
    "stats": {
      "speed": 5,
      "brawn": 5,
      "magic": 0,
      "armour": 4,
      "health": 25,
      "maxHealth": 25
    },
    "abilities": [
      "Acid: Roll a die at the start of each combat round. If you roll a 1 or 2, you automatically take 2 damage. This ability ignores armour."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 232
    }
  },
  {
    "type": "enemy",
    "name": "Rattling",
    "stats": {
      "speed": 3,
      "brawn": 3,
      "magic": 0,
      "armour": 2,
      "health": 12,
      "maxHealth": 12
    },
    "abilities": [
      "Tail lash: For every 1 you roll, the ratling hits you for 1 damage, ignoring armour."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 233
    }
  },
  {
    "type": "enemy",
    "name": "Giant spiders",
    "stats": {
      "speed": 4,
      "brawn": 4,
      "magic": 0,
      "armour": 2,
      "health": 25,
      "maxHealth": 25
    },
    "abilities": [
      "Venom"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 239
    }
  },
  {
    "type": "enemy",
    "name": "Big bad wolf",
    "stats": {
      "speed": 0,
      "brawn": 1,
      "magic": 0,
      "armour": 1,
      "health": 15,
      "maxHealth": 15
    },
    "abilities": [
      ""
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 240
    }
  },
  {
    "type": "enemy",
    "name": "Goblin chief",
    "stats": {
      "speed": 0,
      "brawn": 1,
      "magic": 0,
      "armour": 1,
      "health": 15,
      "maxHealth": 15
    },
    "abilities": [
      ""
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 242
    }
  },
  {
    "type": "enemy",
    "name": "Talos of Air",
    "stats": {
      "speed": 4,
      "brawn": 4,
      "magic": 0,
      "armour": 2,
      "health": 20,
      "maxHealth": 20
    },
    "abilities": [
      "Wind-dancer: Talos moves like the wind. You cannot use potions or special abilities during this combat."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 244
    }
  },
  {
    "type": "enemy",
    "name": "Ghoul",
    "stats": {
      "speed": 5,
      "brawn": 2,
      "magic": 0,
      "armour": 2,
      "health": 20,
      "maxHealth": 20
    },
    "abilities": [
      "Piercing claws: The ghouls' attacks ignore armour."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 253
    }
  },
  {
    "type": "enemy",
    "name": "Burrower wurm",
    "stats": {
      "speed": 4,
      "brawn": 4,
      "magic": 0,
      "armour": 3,
      "health": 20,
      "maxHealth": 20
    },
    "abilities": [
      "Acid"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 262
    }
  },
  {
    "type": "enemy",
    "name": "Burrower wurm",
    "stats": {
      "speed": 4,
      "brawn": 4,
      "magic": 0,
      "armour": 3,
      "health": 20,
      "maxHealth": 20
    },
    "abilities": [
      "Acid"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 273
    }
  },
  {
    "type": "enemy",
    "name": "Ghouls",
    "stats": {
      "speed": 5,
      "brawn": 3,
      "magic": 0,
      "armour": 2,
      "health": 30,
      "maxHealth": 30
    },
    "abilities": [
      "Piercing claws: The ghouls' attacks ignore armour.",
      "Holy Water: You may add 2 to your damage score in this combat."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 274
    }
  },
  {
    "type": "enemy",
    "name": "Fetch",
    "stats": {
      "speed": 5,
      "brawn": 4,
      "magic": 0,
      "armour": 3,
      "health": 35,
      "maxHealth": 35
    },
    "abilities": [
      "Dark disciple: All hero rolls of a 6 become a 1 automatically."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 280
    }
  },
  {
    "type": "enemy",
    "name": "Nalsa",
    "stats": {
      "speed": 11,
      "brawn": 10,
      "magic": 0,
      "armour": 6,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "Mighty roar: If Nalsa wins two consecutives rounds and causes damage in each, on the start of the third round he gains +4 speed and +4 brawn for the rest of the combat. Can only be used once."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 293
    }
  },
  {
    "type": "enemy",
    "name": "Batwing",
    "stats": {
      "speed": 5,
      "brawn": 4,
      "magic": 0,
      "armour": 2,
      "health": 25,
      "maxHealth": 25
    },
    "abilities": [
      "Bleed"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 295
    }
  },
  {
    "type": "enemy",
    "name": "Lady Roe",
    "stats": {
      "speed": 8,
      "brawn": 0,
      "magic": 8,
      "armour": 5,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "Blood harvest: Each time you take health damage from Lady Roe, she heals 2 damage.",
      "Vampire",
      "Wounded: You cannot heal after this combat."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 302
    }
  },
  {
    "type": "enemy",
    "name": "Baron Greylock",
    "stats": {
      "speed": 8,
      "brawn": 8,
      "magic": 0,
      "armour": 5,
      "health": 60,
      "maxHealth": 60
    },
    "abilities": [
      "Vampire",
      "Wounded: You cannot heal after this combat."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 306
    }
  },
  {
    "type": "enemy",
    "name": "Logan",
    "stats": {
      "speed": 10,
      "brawn": 10,
      "magic": 0,
      "armour": 9,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "Poisened arrow: At the end of each combat round you lose 2 health."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 313
    }
  },
  {
    "type": "enemy",
    "name": "Left hook Luke",
    "stats": {
      "speed": 7,
      "brawn": 8,
      "magic": 0,
      "armour": 4,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "By hook: For each 1 you roll you immediately lose 2 health. Ignores armour.",
      "And by crook: Once Luke's health falls below 20, he only rolls 1 die for speed but 2 for damage."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 320
    }
  },
  {
    "type": "enemy",
    "name": "Bat swarm",
    "stats": {
      "speed": 7,
      "brawn": 8,
      "magic": 0,
      "armour": 4,
      "health": 20,
      "maxHealth": 20
    },
    "abilities": [
      "Watch your step: If you roll a 1 for attack speed, you lose the combat. Rerolling is allowed.",
      "Wounded"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 322
    }
  },
  {
    "type": "enemy",
    "name": "Wreeking mage",
    "stats": {
      "speed": 10,
      "brawn": 0,
      "magic": 6,
      "armour": 5,
      "health": 45,
      "maxHealth": 45
    },
    "abilities": [
      "Charge her up: The wreeking mage does not roll for damage if they win a round. Instead, for every 2 rounds it wins, it deals 10 damage ignoring armour. Immune to Vanish, Evade, Sidestep."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 323
    }
  },
  {
    "type": "enemy",
    "name": "Vesuvius",
    "stats": {
      "speed": 10,
      "brawn": 0,
      "magic": 13,
      "armour": 9,
      "health": 45,
      "maxHealth": 45
    },
    "abilities": [
      "Molten armour: At the end of the round the hero takes 4 damage ignoring armour.",
      "Body of Flame: Immune to Sear, Fire aura, Bleed"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 335
    }
  },
  {
    "type": "enemy",
    "name": "Mud Golen",
    "stats": {
      "speed": 5,
      "brawn": 5,
      "magic": 0,
      "armour": 3,
      "health": 35,
      "maxHealth": 35
    },
    "abilities": [
      "Mud pie: At the end of the round, roll 2 dice. If the amount is higher than your speed, take 2 damage ignoring armour."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 337
    }
  },
  {
    "type": "enemy",
    "name": "Hydra",
    "stats": {
      "speed": 12,
      "brawn": 15,
      "magic": 0,
      "armour": 10,
      "health": 60,
      "maxHealth": 60
    },
    "abilities": [
      "Many heads: At the start of round 4, Hydra restores all health.",
      " Venom"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 350
    }
  },
  {
    "type": "enemy",
    "name": "Nasareim",
    "stats": {
      "speed": 12,
      "brawn": 10,
      "magic": 0,
      "armour": 12,
      "health": 60,
      "maxHealth": 60
    },
    "abilities": [
      "Dervish: Attacks ignore armour.",
      " Whirlwird: Each time Nasareim rolls a 6 damage die, he rolls another damage die. This can repeat."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 352
    }
  },
  {
    "type": "enemy",
    "name": "Fargin",
    "stats": {
      "speed": 6,
      "brawn": 5,
      "magic": 0,
      "armour": 4,
      "health": 25,
      "maxHealth": 25
    },
    "abilities": [
      ""
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 354
    }
  },
  {
    "type": "enemy",
    "name": "Barkrot",
    "stats": {
      "speed": 10,
      "brawn": 7,
      "magic": 0,
      "armour": 10,
      "health": 30,
      "maxHealth": 30
    },
    "abilities": [
      "Tangled roots:: At the start of each round, roll a die. If you roll a 1 or 2 you lose 5 health ignoring armour.",
      "Air of corruption: You cannot use any special availabilties. You can use potions and backpack items."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 357
    }
  },
  {
    "type": "enemy",
    "name": "Hive Queen",
    "stats": {
      "speed": 6,
      "brawn": 0,
      "magic": 6,
      "armour": 4,
      "health": 35,
      "maxHealth": 35
    },
    "abilities": [
      "Wing buffet: You must reduce your speed by 1 for the entire combat.",
      "Venom"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 358
    }
  },
  {
    "type": "enemy",
    "name": "Clymonistra",
    "stats": {
      "speed": 7,
      "brawn": 5,
      "magic": 0,
      "armour": 4,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Piercing",
      " Vampire",
      " Wounded"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 360
    }
  },
  {
    "type": "enemy",
    "name": "Cave trogs",
    "stats": {
      "speed": 6,
      "brawn": 7,
      "magic": 0,
      "armour": 3,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      ""
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 361
    }
  },
  {
    "type": "enemy",
    "name": "Snapjaw",
    "stats": {
      "speed": 12,
      "brawn": 12,
      "magic": 0,
      "armour": 10,
      "health": 60,
      "maxHealth": 60
    },
    "abilities": [
      "Strangle vines: At the start of each round, loose round # * 2 health, ignoring armour."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 364
    }
  },
  {
    "type": "enemy",
    "name": "Drones",
    "stats": {
      "speed": 7,
      "brawn": 3,
      "magic": 0,
      "armour": 4,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Stingers: Attacks ignore armour."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 365
    }
  },
  {
    "type": "enemy",
    "name": "Wreeking hunter",
    "stats": {
      "speed": 8,
      "brawn": 8,
      "magic": 0,
      "armour": 5,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "After this enemy is killed, the hero wins the combat."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 366
    }
  },
  {
    "type": "enemy",
    "name": "Wreeking net",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 52,
      "health": 15,
      "maxHealth": 15
    },
    "abilities": [
      "Entrapment: You can only roll 1 die to determine your attack speed while you have the net around your legs."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 366
    }
  },
  {
    "type": "enemy",
    "name": "Centipede",
    "stats": {
      "speed": 5,
      "brawn": 5,
      "magic": 0,
      "armour": 3,
      "health": 60,
      "maxHealth": 60
    },
    "abilities": [
      "Downsized: For every 10 health that the Centipede loses, one of its body segments is destroying its speed and branch by 1 each time."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 375
    }
  },
  {
    "type": "enemy",
    "name": "Zen",
    "stats": {
      "speed": 10,
      "brawn": 10,
      "magic": 0,
      "armour": 8,
      "health": 60,
      "maxHealth": 60
    },
    "abilities": [
      "Charge: Zen can roll 3 dice of speed in the first round of combat. Immune to any abilities that reduce his speed dice for this first round.",
      "Trample"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 382
    }
  },
  {
    "type": "enemy",
    "name": "Shara Khana",
    "stats": {
      "speed": 10,
      "brawn": 12,
      "magic": 0,
      "armour": 12,
      "health": 60,
      "maxHealth": 60
    },
    "abilities": [
      "Cat's speed: Shara Khana rolls 3 dice to determine her attack speed. Your hero special abilities can be used to reduce this number if available."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 386
    }
  },
  {
    "type": "enemy",
    "name": "Kings Louis",
    "stats": {
      "speed": 12,
      "brawn": 12,
      "magic": 0,
      "armour": 12,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "King of the swingers: At the end of every combat you automatically take 15 damage. Armour can be used to absorb this damage."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 391
    }
  },
  {
    "type": "enemy",
    "name": "KerKlick",
    "stats": {
      "speed": 7,
      "brawn": 5,
      "magic": 0,
      "armour": 7,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Pincer movement: If you roll a 1 when rolling for attack speed, you are immediately guard in KerKlick's pincer and automatically lose 2 health ignoring armour. If you have an ability that let's you reroll dice you may try to avoid this.",
      "Unnatural growth: At the end of every combat round, KerKlick raises its brawn by 1, up to max of 10."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 393
    }
  },
  {
    "type": "enemy",
    "name": "Jenkins",
    "stats": {
      "speed": 7,
      "brawn": 8,
      "magic": 0,
      "armour": 5,
      "health": 30,
      "maxHealth": 30
    },
    "abilities": [
      ""
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 402
    }
  },
  {
    "type": "enemy",
    "name": "Cinders",
    "stats": {
      "speed": 8,
      "brawn": 0,
      "magic": 9,
      "armour": 6,
      "health": 45,
      "maxHealth": 45
    },
    "abilities": [
      "Vortex of fire: At the end of each combat round, roll 2 dice. If the amount is higher than your speed you lose 4 health ignoring armour.",
      "Body of flame: Immune to Sear, Bleed, Fire Aura, Burn and Ignite."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 426
    }
  },
  {
    "type": "enemy",
    "name": "Elvera",
    "stats": {
      "speed": 7,
      "brawn": 0,
      "magic": 6,
      "armour": 5,
      "health": 35,
      "maxHealth": 35
    },
    "abilities": [
      "Black coils: At the end of every combat round you automatically lose 2 health ignoring armour",
      " Vampire"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 429
    }
  },
  {
    "type": "enemy",
    "name": "Jester",
    "stats": {
      "speed": 6,
      "brawn": 6,
      "magic": 0,
      "armour": 4,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Itchy and scratchy: At the start of each combat round roll a die: If you roll a 1, your speed is reduced by 1 for this combat round",
      " Vampire"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 435
    }
  },
  {
    "type": "enemy",
    "name": "The Angler",
    "stats": {
      "speed": 10,
      "brawn": 10,
      "magic": 0,
      "armour": 16,
      "health": 60,
      "maxHealth": 60
    },
    "abilities": [
      "Indigestion: If you win a round, you can strike as normal against or lose 5 health and ignore armour."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 438
    }
  },
  {
    "type": "enemy",
    "name": "Shadow Stalker",
    "stats": {
      "speed": 12,
      "brawn": 12,
      "magic": 0,
      "armour": 12,
      "health": 75,
      "maxHealth": 75
    },
    "abilities": [
      "Deadly venom: Once you have taken health damage, you lose 3 health at the end of each combat round."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 442
    }
  },
  {
    "type": "enemy",
    "name": "Kindle",
    "stats": {
      "speed": 12,
      "brawn": 11,
      "magic": 0,
      "armour": 9,
      "health": 90,
      "maxHealth": 90
    },
    "abilities": [
      "Dragon breath: At the end of every combat round, roll 3 dice. If the result is higher than your speed you lose 5 health ignoring armour",
      " Dragon hide: Immune to Piercing, Impale, Thorns, Barbs"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 454
    }
  },
  {
    "type": "enemy",
    "name": "Boggart",
    "stats": {
      "speed": 10,
      "brawn": 8,
      "magic": 0,
      "armour": 5,
      "health": 60,
      "maxHealth": 60
    },
    "abilities": [
      "Dread: Causes Fear, reducing brawn and magic by for the entire combat."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 462
    }
  },
  {
    "type": "enemy",
    "name": "Count",
    "stats": {
      "speed": 9,
      "brawn": 8,
      "magic": 0,
      "armour": 5,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Wayling Bride: At the end of each combat round, you must lower your speed, brawn and magic by 1.",
      "Vampire"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 464
    }
  },
  {
    "type": "enemy",
    "name": "Countess",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 0,
      "health": 35,
      "maxHealth": 35
    },
    "abilities": [
      "Painted veil: Immune to Venom and Bleed."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 464
    }
  },
  {
    "type": "enemy",
    "name": "Shadow Terror",
    "stats": {
      "speed": 10,
      "brawn": 9,
      "magic": 0,
      "armour": 4,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "Fed from fear: At the end of each combat round, the armour is increased by 1."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 466
    }
  },
  {
    "type": "enemy",
    "name": "Leviathan",
    "stats": {
      "speed": 11,
      "brawn": 0,
      "magic": 10,
      "armour": 8,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      ""
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 470
    }
  },
  {
    "type": "enemy",
    "name": "Snappers",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 0,
      "health": 20,
      "maxHealth": 20
    },
    "abilities": [
      "Snappers: At the end of every combat round, lose 2 health ignoring armour."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 470
    }
  },
  {
    "type": "enemy",
    "name": "Poison Needles",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 0,
      "health": 20,
      "maxHealth": 20
    },
    "abilities": [
      "Poison Needles: At the end of every combat round, lose 2 health."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 470
    }
  },
  {
    "type": "enemy",
    "name": "Thorn Spines",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 0,
      "health": 20,
      "maxHealth": 20
    },
    "abilities": [
      "Thorn Spines: Reduce hero speed by 1 for the entire combat."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 470
    }
  },
  {
    "type": "enemy",
    "name": "Purple worm",
    "stats": {
      "speed": 5,
      "brawn": 5,
      "magic": 0,
      "armour": 5,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Split personality: For every 10 healh it loses, increase speed and brawn by 1."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 472
    }
  },
  {
    "type": "enemy",
    "name": "Giant Ooze",
    "stats": {
      "speed": 6,
      "brawn": 4,
      "magic": 0,
      "armour": 4,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Glutinous maximus: Everytime you win a combat round, you are reduced to 1 speed die for the next attack roll. Cannot be avoided."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 481
    }
  },
  {
    "type": "enemy",
    "name": "Scorpios",
    "stats": {
      "speed": 10,
      "brawn": 7,
      "magic": 0,
      "armour": 4,
      "health": 60,
      "maxHealth": 60
    },
    "abilities": [
      "Black venom: After a successful attack causing damage, lose 2 health on every end of a round, ignoring armour."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 482
    }
  },
  {
    "type": "enemy",
    "name": "Swamp Giant",
    "stats": {
      "speed": 10,
      "brawn": 10,
      "magic": 0,
      "armour": 7,
      "health": 70,
      "maxHealth": 70
    },
    "abilities": [
      "Knockdown",
      " Body of rock: Immune to Piercing, Impale, Bleed, Venom, Thorns, Barbs, Lightning"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 486
    }
  },
  {
    "type": "enemy",
    "name": "Wormwood",
    "stats": {
      "speed": 7,
      "brawn": 7,
      "magic": 0,
      "armour": 4,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "Soft spot: If you win a combat round, roll 1 die. If you roll 1 or 2, you cannot roll for damage."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 490
    }
  },
  {
    "type": "enemy",
    "name": "Wreeking mage",
    "stats": {
      "speed": 10,
      "brawn": 0,
      "magic": 0,
      "armour": 5,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "Charge her up!"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 491
    }
  },
  {
    "type": "enemy",
    "name": "Ancient ancestors",
    "stats": {
      "speed": 10,
      "brawn": 8,
      "magic": 0,
      "armour": 8,
      "health": 30,
      "maxHealth": 30
    },
    "abilities": [
      "Body of bone"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 493
    }
  },
  {
    "type": "enemy",
    "name": "Roumbler",
    "stats": {
      "speed": 7,
      "brawn": 8,
      "magic": 0,
      "armour": 5,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Knockdown",
      " Body of rock"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 496
    }
  },
  {
    "type": "enemy",
    "name": "Count",
    "stats": {
      "speed": 9,
      "brawn": 8,
      "magic": 0,
      "armour": 5,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Blood drinker: If the count rolls a 6 for damage, he rolls an extra die for damage and restores 2 health.",
      "Vampire",
      "Wounded"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 505
    }
  },
  {
    "type": "enemy",
    "name": "Kalimari",
    "stats": {
      "speed": 11,
      "brawn": 10,
      "magic": 0,
      "armour": 9,
      "health": 60,
      "maxHealth": 60
    },
    "abilities": [
      "Ink bombs: If you roll a 1 during speed rolls, hero is blinded and loses the round. You can only use pssive abilities in this round. Dice can be rerolled."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 510
    }
  },
  {
    "type": "enemy",
    "name": "Inferno",
    "stats": {
      "speed": 9,
      "brawn": 8,
      "magic": 0,
      "armour": 7,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "Blazing armour: Immune to Piercing, Sear, Impale, Bleed, Burn Ignute"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 527
    }
  },
  {
    "type": "enemy",
    "name": "Wreeking hunter",
    "stats": {
      "speed": 8,
      "brawn": 8,
      "magic": 0,
      "armour": 5,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "After this enemy is killed, the hero wins the combat."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 529
    }
  },
  {
    "type": "enemy",
    "name": "Wreeking net",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 52,
      "health": 15,
      "maxHealth": 15
    },
    "abilities": [
      "Entrapment: You can only roll 1 die to determine your attack speed while you have the net around your legs."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 529
    }
  },
  {
    "type": "enemy",
    "name": "Scout",
    "stats": {
      "speed": 14,
      "brawn": 15,
      "magic": 0,
      "armour": 14,
      "health": 85,
      "maxHealth": 85
    },
    "abilities": [
      ""
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 531
    }
  },
  {
    "type": "enemy",
    "name": "Count",
    "stats": {
      "speed": 9,
      "brawn": 8,
      "magic": 0,
      "armour": 5,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Blood drinker: If the count rolls a 6 for damage, he rolls an extra die for damage and restores 2 health.",
      "Vampire",
      "Wounded"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 535
    }
  },
  {
    "type": "enemy",
    "name": "Phoenix",
    "stats": {
      "speed": 8,
      "brawn": 0,
      "magic": 7,
      "armour": 5,
      "health": 30,
      "maxHealth": 30
    },
    "abilities": [
      "Body of flame",
      "From the ashes: At the end of the combat, the Phoenix rises again as Phoenix risen"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 543
    }
  },
  {
    "type": "enemy",
    "name": "Risen Phoenix",
    "stats": {
      "speed": 7,
      "brawn": 0,
      "magic": 6,
      "armour": 5,
      "health": 30,
      "maxHealth": 30
    },
    "abilities": [
      "Body of flame"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 543
    }
  },
  {
    "type": "enemy",
    "name": "Count",
    "stats": {
      "speed": 9,
      "brawn": 8,
      "magic": 0,
      "armour": 5,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Blood drinker: If the count rolls a 6 for damage, he rolls an extra die for damage and restores 2 health.",
      "Vampire",
      "Wounded"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 545
    }
  },
  {
    "type": "enemy",
    "name": "Stone Giant",
    "stats": {
      "speed": 10,
      "brawn": 10,
      "magic": 0,
      "armour": 12,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "Knockdown",
      "Body of rock",
      " Spawns 4 Stone Golem"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 554
    }
  },
  {
    "type": "enemy",
    "name": "Stone Golem",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 6,
      "health": 15,
      "maxHealth": 15
    },
    "abilities": [
      "Body of rock",
      " Stone Golem: At the end of the round, take 1 damage ignoring armour."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 554
    }
  },
  {
    "type": "enemy",
    "name": "Bone Giant",
    "stats": {
      "speed": 15,
      "brawn": 14,
      "magic": 0,
      "armour": 12,
      "health": 140,
      "maxHealth": 140
    },
    "abilities": [
      "Knockdown",
      "Body of bone"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 555
    }
  },
  {
    "type": "enemy",
    "name": "The Blob",
    "stats": {
      "speed": 14,
      "brawn": 15,
      "magic": 0,
      "armour": 12,
      "health": 120,
      "maxHealth": 120
    },
    "abilities": [
      "Knockdown",
      " Bloated body: Immunte to Piercing, Impale, Barbs, Thorns"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 557
    }
  },
  {
    "type": "enemy",
    "name": "Gargoyles",
    "stats": {
      "speed": 11,
      "brawn": 10,
      "magic": 0,
      "armour": 9,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "Body of rock"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 563
    }
  },
  {
    "type": "enemy",
    "name": "Chilblain",
    "stats": {
      "speed": 13,
      "brawn": 13,
      "magic": 0,
      "armour": 20,
      "health": 80,
      "maxHealth": 80
    },
    "abilities": [
      "Ice armour: Spawns 4 Ice Pillar",
      " Body of Ice: Immune to Venom, Disease, Bleed, but takes double damage from Sear, Fira Aura, Burn.",
      ""
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 564
    }
  },
  {
    "type": "enemy",
    "name": "Ice Pillar",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 8,
      "health": 20,
      "maxHealth": 20
    },
    "abilities": [
      "Ice pillar: When a pillar is destroyed, the Chilblain's armour is set to 10.",
      "Body of Ice"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 564
    }
  },
  {
    "type": "enemy",
    "name": "Inferno",
    "stats": {
      "speed": 9,
      "brawn": 8,
      "magic": 0,
      "armour": 7,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "Blazing armour",
      " Crazy hal: When you roll for damage, Crazy hal adds 1 extra damage score."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 578
    }
  },
  {
    "type": "enemy",
    "name": "Flay",
    "stats": {
      "speed": 15,
      "brawn": 0,
      "magic": 15,
      "armour": 16,
      "health": 100,
      "maxHealth": 100
    },
    "abilities": [
      "Maelstrom: For each 1 you roll, loose 8 health ignoring armour.",
      " Body of air: Immune to Bleed, Venom, Disease."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 582
    }
  },
  {
    "type": "enemy",
    "name": "Malcontent",
    "stats": {
      "speed": 15,
      "brawn": 0,
      "magic": 15,
      "armour": 13,
      "health": 100,
      "maxHealth": 100
    },
    "abilities": [
      "Leech: For each damage inflicted to the hero, heal the same amount.",
      "Spawns 1 Carrion Crows."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 595
    }
  },
  {
    "type": "enemy",
    "name": "Carrion Crows",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 8,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Carrion Crows: At the start of each round, the hero loses 4 health."
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 595
    }
  },
  {
    "type": "enemy",
    "name": "",
    "stats": {
      "speed": null,
      "brawn": 0,
      "magic": 0,
      "armour": null,
      "health": 25,
      "maxHealth": 25
    },
    "abilities": [
      ""
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": null
    }
  },
  {
    "type": "enemy",
    "name": "",
    "stats": {
      "speed": null,
      "brawn": 0,
      "magic": 0,
      "armour": null,
      "health": 25,
      "maxHealth": 25
    },
    "abilities": [
      ""
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": null
    }
  },
  {
    "type": "enemy",
    "name": "",
    "stats": {
      "speed": null,
      "brawn": 0,
      "magic": 0,
      "armour": null,
      "health": 25,
      "maxHealth": 25
    },
    "abilities": [
      ""
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": null
    }
  },
  {
    "type": "enemy",
    "name": "",
    "stats": {
      "speed": null,
      "brawn": 0,
      "magic": 0,
      "armour": null,
      "health": 25,
      "maxHealth": 25
    },
    "abilities": [
      ""
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": null
    }
  },
  {
    "type": "enemy",
    "name": "",
    "stats": {
      "speed": null,
      "brawn": 0,
      "magic": 0,
      "armour": null,
      "health": 25,
      "maxHealth": 25
    },
    "abilities": [
      ""
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": null
    }
  }
];

