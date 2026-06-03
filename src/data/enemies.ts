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
      "Ferocity"
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
      "Punishing blows"
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
      "Charged"
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
      "Fiery aura"
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
    "abilities": [],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 37
    },
    "notes": "If the goblins habe been reduced to 10 health or less, turn to 77"
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
      "Black sigill",
      "Bewitched"
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
      "Piercing claws"
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
      "Webbed",
      "Venom"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 60
    },
    "notes": "Ignore the Webbed ability if the web was set to fire with the Torch"
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
      "Crone's dagger"
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
    "abilities": [],
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
    "abilities": [],
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
    "abilities": [],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 81
    },
    "notes": "If you survive to the end of 5 combat rounds, turn to 234"
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
      "Body of bone"
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
      "Warts and all"
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
      "health": 0,
      "maxHealth": 0
    },
    "abilities": [],
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
      "Body of bone"
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
      "Piercing claws"
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
      "Healing touch"
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
      "Faithful duty",
      "Body of bone"
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
    "abilities": [],
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
      "Blacke fire"
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
    "abilities": [],
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
      "Sack and straw"
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
    "abilities": [],
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
      "Piercing claws"
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
    "abilities": [],
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
    "abilities": [],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 144
    },
    "notes": "Once the leader's health is reduced to 12 or less, turn to 230"
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
      "Knockdown",
      "Regeneration"
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
    "abilities": [],
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
    "abilities": [],
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
    "abilities": [],
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
    "abilities": [],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 201
    },
    "notes": "Once the leader's health is reduced to 12 or less, turn to 233"
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
    "abilities": [],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 207
    },
    "notes": "TODO: You can use runes against this enemy."
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
      "Hellfire"
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
      "Mighty blows"
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
      "Tail lash"
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
      "Acid"
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
      "Tail lash"
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
    "abilities": [],
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
    "abilities": [],
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
      "Wind-dancer"
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
      "Piercing claws"
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
      "Piercing claws",
      "Holy Water"
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
      "Dark disciple"
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
      "Mighty roar"
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
      "Blood harvest",
      "Vampire",
      "Wounded"
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
      "Wounded"
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
      "Poisened arrow"
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
      "By hook",
      "And by crook"
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
      "Watch your step",
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
      "Charge her up"
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
      "Molten armour",
      "Body of Flame"
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
      "Mud pie"
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
      "Many heads",
      "Venom"
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
      "Dervish",
      "Whirlwind"
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
    "abilities": [],
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
      "Tangled roots",
      "Air of corruption"
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
      "Wing buffet",
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
      "Vampire",
      "Wounded"
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
    "abilities": [],
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
      "Strangle vines"
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
      "Stingers"
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
    "abilities": [],
    "spawns": [
      "Wreeking net"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 366
    },
    "notes": "After this enemy is killed, the hero wins the combat."
  },
  {
    "type": "enemy",
    "name": "Wreeking net",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 2,
      "health": 15,
      "maxHealth": 15
    },
    "abilities": [
      "Entrapment"
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
      "Downsized"
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
      "Charge",
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
      "Cat's speed"
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
      "King of the swingers"
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
      "Pincer movement",
      "Unnatural growth"
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
    "abilities": [],
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
      "Vortex of fire",
      "Body of flame"
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
      "Black coils",
      "Vampire"
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
      "Itchy and scratchy",
      "Vampire"
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
      "Indigestion"
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
      "Deadly venom"
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
      "Dragon breath",
      "Dragon hide"
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
      "Dread"
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
      "Wailing Bride",
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
      "Painted veil"
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
      "Fed from fear"
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
    "abilities": [],
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
      "Snappers"
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
      "Poison Needles"
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
      "Thorn Spines"
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
      "Split personality"
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
      "Glutinous maximus"
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
      "Black venom"
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
      "Body of rock"
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
      "Soft spot"
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
      "Charge her up"
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
    "name": "Rumbler",
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
      "Body of rock"
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
      "Blood drinker",
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
      "Ink bombs"
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
      "Blazing armour"
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
    "abilities": [],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 2,
      "section": 529
    },
    "notes": "After this enemy is killed, the hero wins the combat."
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
      "Entrapment"
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
    "abilities": [],
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
      "Blood drinker",
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
      "From the ashes"
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
      "Blood drinker",
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
      "Body of rock"
    ],
    "spawns": [
      "Stone Golem",
      "Stone Golem",
      "Stone Golem",
      "Stone Golem"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
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
      "Stone Golem"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
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
      "act": 3,
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
      "Bloated body"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
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
      "act": 3,
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
      "Ice armour",
      "Body of Ice"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
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
      "Ice pillar",
      "Body of Ice"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
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
      "Crazy hal"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
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
      "Maelstrom",
      "Body of air"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
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
      "Leech"
    ],
    "spawns": [
      "Carrion Crows"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
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
      "Carrion Crows"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 595
    }
  },
  {
    "type": "enemy",
    "name": "Budak",
    "stats": {
      "speed": 14,
      "brawn": 14,
      "magic": 0,
      "armour": 12,
      "health": 110,
      "maxHealth": 110
    },
    "abilities": [
      "Lightning reflex"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 601
    }
  },
  {
    "type": "enemy",
    "name": "Flesh Golem",
    "stats": {
      "speed": 13,
      "brawn": 13,
      "magic": 0,
      "armour": 12,
      "health": 80,
      "maxHealth": 80
    },
    "abilities": [
      "Distraction"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 615
    }
  },
  {
    "type": "enemy",
    "name": "Tor Knight",
    "stats": {
      "speed": 13,
      "brawn": 12,
      "magic": 0,
      "armour": 24,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "Dismantle",
      "Steel yourself"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 625
    }
  },
  {
    "type": "enemy",
    "name": "Lord of Pain",
    "stats": {
      "speed": 15,
      "brawn": 0,
      "magic": 14,
      "armour": 13,
      "health": 100,
      "maxHealth": 100
    },
    "abilities": [
      "Disease"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 627
    }
  },
  {
    "type": "enemy",
    "name": "Rottaghast",
    "stats": {
      "speed": 14,
      "brawn": 14,
      "magic": 0,
      "armour": 15,
      "health": 100,
      "maxHealth": 100
    },
    "abilities": [
      "Body of bone"
    ],
    "spawns": [
      "Carrion Beetles"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 650
    }
  },
  {
    "type": "enemy",
    "name": "Carrion beetles",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 10,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Carrion beetles"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 650
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
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Knockdown",
      "Body of rock"
    ],
    "spawns": [
      "Stone Golem",
      "Stone Golem",
      "Stone Golem",
      "Stone Golem"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 652
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
      "Stone Golem"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 652
    }
  },
  {
    "type": "enemy",
    "name": "Brothers Grimm",
    "stats": {
      "speed": 13,
      "brawn": 13,
      "magic": 0,
      "armour": 10,
      "health": 120,
      "maxHealth": 120
    },
    "abilities": [
      "Got ma eyes an yer",
      "Helping Hand"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 653
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
      "Body of rock"
    ],
    "spawns": [
      "Stone Golem",
      "Stone Golem"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 658
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
      "Stone Golem"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 658
    }
  },
  {
    "type": "enemy",
    "name": "Necromancer",
    "stats": {
      "speed": 13,
      "brawn": 0,
      "magic": 10,
      "armour": 10,
      "health": 70,
      "maxHealth": 70
    },
    "abilities": [
      "Heightened Magic",
      "Venom"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 662
    }
  },
  {
    "type": "enemy",
    "name": "Caeleb",
    "stats": {
      "speed": 13,
      "brawn": 16,
      "magic": 0,
      "armour": 14,
      "health": 65,
      "maxHealth": 65
    },
    "abilities": [
      "Shield Slam"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 676
    }
  },
  {
    "type": "enemy",
    "name": "Bone Wyvern",
    "stats": {
      "speed": 12,
      "brawn": 12,
      "magic": 0,
      "armour": 10,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "Snapping Beak",
      "Body of bone"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 681
    }
  },
  {
    "type": "enemy",
    "name": "Death Orb",
    "stats": {
      "speed": 15,
      "brawn": 0,
      "magic": 12,
      "armour": 11,
      "health": 100,
      "maxHealth": 100
    },
    "abilities": [
      "Eye Beam"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 684
    }
  },
  {
    "type": "enemy",
    "name": "Crawlers",
    "stats": {
      "speed": 13,
      "brawn": 12,
      "magic": 0,
      "armour": 10,
      "health": 100,
      "maxHealth": 100
    },
    "abilities": [],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 687
    }
  },
  {
    "type": "enemy",
    "name": "Mathis",
    "stats": {
      "speed": 15,
      "brawn": 14,
      "magic": 0,
      "armour": 19,
      "health": 250,
      "maxHealth": 250
    },
    "abilities": [
      "Snap out of it!"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 700
    }
  },
  {
    "type": "enemy",
    "name": "Raptors",
    "stats": {
      "speed": 12,
      "brawn": 6,
      "magic": 0,
      "armour": 8,
      "health": 60,
      "maxHealth": 60
    },
    "abilities": [
      "Piercing"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 701
    }
  },
  {
    "type": "enemy",
    "name": "Wights",
    "stats": {
      "speed": 13,
      "brawn": 12,
      "magic": 0,
      "armour": 10,
      "health": 100,
      "maxHealth": 100
    },
    "abilities": [],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 703
    }
  },
  {
    "type": "enemy",
    "name": "Bone Ghouls",
    "stats": {
      "speed": 13,
      "brawn": 10,
      "magic": 0,
      "armour": 12,
      "health": 100,
      "maxHealth": 100
    },
    "abilities": [
      "Piercing claws"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 712
    }
  },
  {
    "type": "enemy",
    "name": "Packmasters",
    "stats": {
      "speed": 13,
      "brawn": 12,
      "magic": 0,
      "armour": 10,
      "health": 60,
      "maxHealth": 60
    },
    "abilities": [],
    "spawns": [
      "Ghoul Pack"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 717
    }
  },
  {
    "type": "enemy",
    "name": "Ghoul Pack",
    "stats": {
      "speed": 12,
      "brawn": 9,
      "magic": 0,
      "armour": 8,
      "health": 45,
      "maxHealth": 45
    },
    "abilities": [
      "Frenzy",
      "Piercing claws"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 717
    }
  },
  {
    "type": "enemy",
    "name": "Ghoulash",
    "stats": {
      "speed": 14,
      "brawn": 13,
      "magic": 0,
      "armour": 15,
      "health": 100,
      "maxHealth": 100
    },
    "abilities": [],
    "spawns": [
      "Bracelet",
      "Bracelet",
      "Bracelet",
      "Bracelet"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 720
    }
  },
  {
    "type": "enemy",
    "name": "Bracelet",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 8,
      "health": 20,
      "maxHealth": 20
    },
    "abilities": [
      "Iron Clad"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 720
    }
  },
  {
    "type": "enemy",
    "name": "Shades",
    "stats": {
      "speed": 13,
      "brawn": 0,
      "magic": 12,
      "armour": 12,
      "health": 120,
      "maxHealth": 120
    },
    "abilities": [
      "Grave Chill"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 721
    }
  },
  {
    "type": "enemy",
    "name": "Animated weapons",
    "stats": {
      "speed": 12,
      "brawn": 12,
      "magic": 0,
      "armour": 9,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Whirling Blades",
      "Sinister Steel"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 725
    }
  },
  {
    "type": "enemy",
    "name": "Silleer",
    "stats": {
      "speed": 14,
      "brawn": 0,
      "magic": 13,
      "armour": 12,
      "health": 120,
      "maxHealth": 120
    },
    "abilities": [
      "Deadly Charge"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 734
    }
  },
  {
    "type": "enemy",
    "name": "Magmageddon",
    "stats": {
      "speed": 11,
      "brawn": 0,
      "magic": 11,
      "armour": 9,
      "health": 60,
      "maxHealth": 60
    },
    "abilities": [
      "Heat Exposure",
      "Body of Flame"
    ],
    "spawns": [
      "3 Fire Sprite"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 738
    }
  },
  {
    "type": "enemy",
    "name": "Fire Sprite",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 5,
      "health": 15,
      "maxHealth": 15
    },
    "abilities": [
      "Fire Sprite"
    ],
    "spawns": [
      "Body of Flame"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 738
    }
  },
  {
    "type": "enemy",
    "name": "Zul Ator",
    "stats": {
      "speed": 14,
      "brawn": 0,
      "magic": 15,
      "armour": 12,
      "health": 100,
      "maxHealth": 100
    },
    "abilities": [
      "Black Lightening",
      "Heightened Magic"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 745
    }
  },
  {
    "type": "enemy",
    "name": "Snaide",
    "stats": {
      "speed": 14,
      "brawn": 12,
      "magic": 0,
      "armour": 12,
      "health": 80,
      "maxHealth": 80
    },
    "abilities": [
      "Dark Claw"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 746
    }
  },
  {
    "type": "enemy",
    "name": "Snaide (Shadow Infusion)",
    "stats": {
      "speed": 16,
      "brawn": 12,
      "magic": 0,
      "armour": 12,
      "health": 80,
      "maxHealth": 80
    },
    "abilities": [
      "Dark Claw"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 746
    }
  },
  {
    "type": "enemy",
    "name": "Mage Hunter",
    "stats": {
      "speed": 14,
      "brawn": 14,
      "magic": 0,
      "armour": 14,
      "health": 90,
      "maxHealth": 90
    },
    "abilities": [
      "Whirling Blades",
      "Black Poison",
      "Wounded"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 748
    }
  },
  {
    "type": "enemy",
    "name": "Dr. Liechtenstein",
    "stats": {
      "speed": 15,
      "brawn": 14,
      "magic": 0,
      "armour": 10,
      "health": 120,
      "maxHealth": 120
    },
    "abilities": [
      "Mad Scientist"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 752
    }
  },
  {
    "type": "enemy",
    "name": "Nyms",
    "stats": {
      "speed": 13,
      "brawn": 13,
      "magic": 0,
      "armour": 12,
      "health": 65,
      "maxHealth": 65
    },
    "abilities": [
      "Double Danger",
      "Lightning Reflexes"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 753
    }
  },
  {
    "type": "enemy",
    "name": "Packmasater",
    "stats": {
      "speed": 13,
      "brawn": 12,
      "magic": 0,
      "armour": 12,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "Whiplash"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 756
    }
  },
  {
    "type": "enemy",
    "name": "Bone Giants",
    "stats": {
      "speed": 13,
      "brawn": 14,
      "magic": 0,
      "armour": 14,
      "health": 100,
      "maxHealth": 100
    },
    "abilities": [
      "Knockdown",
      "Body of Bone"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 758
    }
  },
  {
    "type": "enemy",
    "name": "Horrors",
    "stats": {
      "speed": 14,
      "brawn": 12,
      "magic": 0,
      "armour": 10,
      "health": 100,
      "maxHealth": 100
    },
    "abilities": [
      "Sucker Punch"
    ],
    "spawns": [
      "Locust"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 764
    }
  },
  {
    "type": "enemy",
    "name": "Locust",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 0,
      "health": 25,
      "maxHealth": 25
    },
    "abilities": [
      "Nasty Nibblers"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 764
    }
  },
  {
    "type": "enemy",
    "name": "Necromancer",
    "stats": {
      "speed": 14,
      "brawn": 0,
      "magic": 12,
      "armour": 8,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "Raise Dead"
    ],
    "spawns": [
      "Skeleton Horde"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 768
    }
  },
  {
    "type": "enemy",
    "name": "Skeleton Horde",
    "stats": {
      "speed": 13,
      "brawn": 0,
      "magic": 8,
      "armour": 10,
      "health": 60,
      "maxHealth": 60
    },
    "abilities": [
      "Body of Bone"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 768
    }
  },
  {
    "type": "enemy",
    "name": "Bone Construct",
    "stats": {
      "speed": 12,
      "brawn": 12,
      "magic": 0,
      "armour": 10,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "Raking Claws",
      "Wyvern Talons",
      "Body of Bone"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 772
    }
  },
  {
    "type": "enemy",
    "name": "Tor Knight",
    "stats": {
      "speed": 13,
      "brawn": 14,
      "magic": 0,
      "armour": 24,
      "health": 80,
      "maxHealth": 80
    },
    "abilities": [
      "Dismantle",
      "Steel yourself"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 773
    }
  },
  {
    "type": "enemy",
    "name": "Ghoul Pack",
    "stats": {
      "speed": 13,
      "brawn": 7,
      "magic": 0,
      "armour": 12,
      "health": 60,
      "maxHealth": 60
    },
    "abilities": [
      "Piercing Claws"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 781
    }
  },
  {
    "type": "enemy",
    "name": "Sharroth",
    "stats": {
      "speed": 14,
      "brawn": 0,
      "magic": 14,
      "armour": 12,
      "health": 100,
      "maxHealth": 100
    },
    "abilities": [],
    "spawns": [
      "Tentacle",
      "Tentacle",
      "Tentacle",
      "Tentacle"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 782
    }
  },
  {
    "type": "enemy",
    "name": "Tentacle",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 6,
      "health": 20,
      "maxHealth": 20
    },
    "abilities": [
      "Oozing Tentacles"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 782
    }
  },
  {
    "type": "enemy",
    "name": "Baalim",
    "stats": {
      "speed": 12,
      "brawn": 10,
      "magic": 0,
      "armour": 10,
      "health": 80,
      "maxHealth": 80
    },
    "abilities": [
      "Thorn Fists",
      "Heightened Senses"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 784
    }
  },
  {
    "type": "enemy",
    "name": "Dark Arthurian",
    "stats": {
      "speed": 13,
      "brawn": 0,
      "magic": 12,
      "armour": 13,
      "health": 80,
      "maxHealth": 80
    },
    "abilities": [
      "Dark Mending",
      "Team Effort",
      "Heal me"
    ],
    "spawns": [
      "Necromancer",
      "Necromancer",
      "Necromancer"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 790
    }
  },
  {
    "type": "enemy",
    "name": "Necromancer",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 6,
      "health": 20,
      "maxHealth": 20
    },
    "abilities": [
      "Raise Dead"
    ],
    "spawns": [
      "Skeleton Horde"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 790
    }
  },
  {
    "type": "enemy",
    "name": "The Architect",
    "stats": {
      "speed": 12,
      "brawn": 13,
      "magic": 0,
      "armour": 15,
      "health": 80,
      "maxHealth": 80
    },
    "abilities": [],
    "spawns": [
      "Holy Flame",
      "Holy Circle",
      "Holy Shield"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 804
    }
  },
  {
    "type": "enemy",
    "name": "Holy Flame",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 4,
      "health": 15,
      "maxHealth": 15
    },
    "abilities": [
      "Holy Flame"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 804
    }
  },
  {
    "type": "enemy",
    "name": "Holy Circle",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 4,
      "health": 15,
      "maxHealth": 15
    },
    "abilities": [
      "Holy Circle"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 804
    }
  },
  {
    "type": "enemy",
    "name": "Holy Shield",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 4,
      "health": 15,
      "maxHealth": 15
    },
    "abilities": [
      "Holy Shield"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 804
    }
  },
  {
    "type": "enemy",
    "name": "Daarko",
    "stats": {
      "speed": 15,
      "brawn": 0,
      "magic": 0,
      "armour": 0,
      "health": 140,
      "maxHealth": 140
    },
    "abilities": [
      "Elemental Master"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 807
    }
  },
  {
    "type": "enemy",
    "name": "Daarko (Shadow Form)",
    "stats": {
      "speed": 15,
      "brawn": 0,
      "magic": 11,
      "armour": 12,
      "health": 140,
      "maxHealth": 140
    },
    "abilities": [
      "Elemental Master",
      "Shadow Form"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 807
    }
  },
  {
    "type": "enemy",
    "name": "Daarko (Flame Form)",
    "stats": {
      "speed": 15,
      "brawn": 0,
      "magic": 16,
      "armour": 10,
      "health": 140,
      "maxHealth": 140
    },
    "abilities": [
      "Elemental Master",
      "Flame Form"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 807
    }
  },
  {
    "type": "enemy",
    "name": "Daarko (Rock Form)",
    "stats": {
      "speed": 15,
      "brawn": 0,
      "magic": 13,
      "armour": 20,
      "health": 140,
      "maxHealth": 140
    },
    "abilities": [
      "Elemental Master",
      "Rock Form"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 807
    }
  },
  {
    "type": "enemy",
    "name": "Sanrah",
    "stats": {
      "speed": 15,
      "brawn": 10,
      "magic": 0,
      "armour": 11,
      "health": 140,
      "maxHealth": 140
    },
    "abilities": [
      "Retaliation",
      "Inquisitor's Wrath",
      "Healer's Gift"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 809
    }
  },
  {
    "type": "enemy",
    "name": "Tomb Robber",
    "stats": {
      "speed": 12,
      "brawn": 11,
      "magic": 0,
      "armour": 8,
      "health": 70,
      "maxHealth": 70
    },
    "abilities": [
      "Keen Edge"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 816
    }
  },
  {
    "type": "enemy",
    "name": "Gorgis",
    "stats": {
      "speed": 14,
      "brawn": 8,
      "magic": 0,
      "armour": 13,
      "health": 100,
      "maxHealth": 100
    },
    "abilities": [
      "Fatigue",
      "Piercing",
      "Iron-Mane"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 817
    }
  },
  {
    "type": "enemy",
    "name": "Sentient Anomaly",
    "stats": {
      "speed": 12,
      "brawn": 0,
      "magic": 16,
      "armour": 0,
      "health": 0,
      "maxHealth": 0
    },
    "abilities": [
      "Absorption",
      "Concentration"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 818
    }
  },
  {
    "type": "enemy",
    "name": "Scarron",
    "stats": {
      "speed": 16,
      "brawn": 15,
      "magic": 0,
      "armour": 10,
      "health": 30,
      "maxHealth": 30
    },
    "abilities": [
      "A Siege of Scarrons"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 821
    }
  },
  {
    "type": "enemy",
    "name": "Scarron",
    "stats": {
      "speed": 15,
      "brawn": 12,
      "magic": 0,
      "armour": 8,
      "health": 25,
      "maxHealth": 25
    },
    "abilities": [
      "A Siege of Scarrons"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 821
    }
  },
  {
    "type": "enemy",
    "name": "Scarron",
    "stats": {
      "speed": 15,
      "brawn": 14,
      "magic": 0,
      "armour": 10,
      "health": 30,
      "maxHealth": 30
    },
    "abilities": [
      "A Siege of Scarrons"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 821
    }
  },
  {
    "type": "enemy",
    "name": "Scarron",
    "stats": {
      "speed": 15,
      "brawn": 12,
      "magic": 0,
      "armour": 8,
      "health": 25,
      "maxHealth": 25
    },
    "abilities": [
      "A Siege of Scarrons"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 821
    }
  },
  {
    "type": "enemy",
    "name": "Scarron",
    "stats": {
      "speed": 15,
      "brawn": 14,
      "magic": 0,
      "armour": 10,
      "health": 30,
      "maxHealth": 30
    },
    "abilities": [
      "A Siege of Scarrons"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 821
    }
  },
  {
    "type": "enemy",
    "name": "Viprus",
    "stats": {
      "speed": 14,
      "brawn": 13,
      "magic": 0,
      "armour": 10,
      "health": 100,
      "maxHealth": 100
    },
    "abilities": [
      "Deadly Venom"
    ],
    "spawns": [
      "Snakes"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 835
    }
  },
  {
    "type": "enemy",
    "name": "Snakes",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 8,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "Tight Spot"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 835
    }
  },
  {
    "type": "enemy",
    "name": "Sammain",
    "stats": {
      "speed": 13,
      "brawn": 0,
      "magic": 10,
      "armour": 20,
      "health": 90,
      "maxHealth": 90
    },
    "abilities": [
      "Wrath of Winter",
      "Shatter Shield"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 842
    }
  },
  {
    "type": "enemy",
    "name": "Bone Angel",
    "stats": {
      "speed": 13,
      "brawn": 11,
      "magic": 0,
      "armour": 11,
      "health": 90,
      "maxHealth": 90
    },
    "abilities": [
      "Terrible Talons",
      "Holy Aura",
      "Caaleb's Shield"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 849
    }
  },
  {
    "type": "enemy",
    "name": "Ghasts",
    "stats": {
      "speed": 16,
      "brawn": 9,
      "magic": 0,
      "armour": 7,
      "health": 140,
      "maxHealth": 140
    },
    "abilities": [
      "Gathering of Ghasts",
      "Bolt from the Blue"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 854
    }
  },
  {
    "type": "enemy",
    "name": "Styraxian Steed",
    "stats": {
      "speed": 15,
      "brawn": 13,
      "magic": 0,
      "armour": 16,
      "health": 90,
      "maxHealth": 90
    },
    "abilities": [
      "Blindside",
      "Sharpshooter"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 861
    }
  },
  {
    "type": "enemy",
    "name": "Clockwerk",
    "stats": {
      "speed": 12,
      "brawn": 11,
      "magic": 0,
      "armour": 10,
      "health": 80,
      "maxHealth": 80
    },
    "abilities": [
      "Body of Metal"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 872
    }
  },
  {
    "type": "enemy",
    "name": "Cerebral Cortex",
    "stats": {
      "speed": 15,
      "brawn": 0,
      "magic": 10,
      "armour": 8,
      "health": 180,
      "maxHealth": 180
    },
    "abilities": [
      "Neural Blast",
      "Magic Shield"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 877
    }
  },
  {
    "type": "enemy",
    "name": "Jorvic",
    "stats": {
      "speed": 12,
      "brawn": 13,
      "magic": 0,
      "armour": 10,
      "health": 100,
      "maxHealth": 100
    },
    "abilities": [
      "Two Arms!",
      "Heal me",
      "Team Effort"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 878
    }
  },
  {
    "type": "enemy",
    "name": "Keldred",
    "stats": {
      "speed": 13,
      "brawn": 10,
      "magic": 0,
      "armour": 8,
      "health": 90,
      "maxHealth": 90
    },
    "abilities": [
      "Mark of Fury",
      "Heightened Senses"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 886
    }
  },
  {
    "type": "enemy",
    "name": "Malaise",
    "stats": {
      "speed": 12,
      "brawn": 11,
      "magic": 0,
      "armour": 10,
      "health": 90,
      "maxHealth": 90
    },
    "abilities": [
      "Withering Strikes",
      "Deadly Venom"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 904
    }
  },
  {
    "type": "enemy",
    "name": "Apprentice",
    "stats": {
      "speed": 12,
      "brawn": 0,
      "magic": 9,
      "armour": 8,
      "health": 85,
      "maxHealth": 85
    },
    "abilities": [
      "Giblets",
      "Dark Master"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 911
    }
  },
  {
    "type": "enemy",
    "name": "Branded Brute",
    "stats": {
      "speed": 13,
      "brawn": 14,
      "magic": 0,
      "armour": 8,
      "health": 110,
      "maxHealth": 110
    },
    "abilities": [
      "Power of Shadow",
      "Dark Runes"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 919
    }
  },
  {
    "type": "enemy",
    "name": "Sentries",
    "stats": {
      "speed": 15,
      "brawn": 0,
      "magic": 12,
      "armour": 0,
      "health": 25,
      "maxHealth": 25
    },
    "abilities": [
      "Endless Swarm"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 921
    }
  },
  {
    "type": "enemy",
    "name": "Membrane",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 19,
      "health": 80,
      "maxHealth": 80
    },
    "abilities": [
      "Avian's aid"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 921
    }
  },
  {
    "type": "enemy",
    "name": "Poison Nodes",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 5,
      "health": 60,
      "maxHealth": 60
    },
    "abilities": [
      "Poison Nodes"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 921
    }
  },
  {
    "type": "enemy",
    "name": "Decayers",
    "stats": {
      "speed": 15,
      "brawn": 13,
      "magic": 0,
      "armour": 7,
      "health": 100,
      "maxHealth": 100
    },
    "abilities": [
      "Disease"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 924
    }
  },
  {
    "type": "enemy",
    "name": "Spore Cloud",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 4,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Swarm of Spores",
      "Natural Immunity"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 924
    }
  },
  {
    "type": "enemy",
    "name": "Lansbury's Shield",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 0,
      "health": 25,
      "maxHealth": 25
    },
    "abilities": [],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 924
    }
  },
  {
    "type": "enemy",
    "name": "The Wrecker",
    "stats": {
      "speed": 15,
      "brawn": 14,
      "magic": 0,
      "armour": 11,
      "health": 120,
      "maxHealth": 120
    },
    "abilities": [
      "Clobbering Time",
      "Inquisitor's Wrath",
      "Healer's Gift"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 930
    }
  },
  {
    "type": "enemy",
    "name": "Banshee",
    "stats": {
      "speed": 14,
      "brawn": 13,
      "magic": 0,
      "armour": 8,
      "health": 76,
      "maxHealth": 76
    },
    "abilities": [
      "Gathering Darkness",
      "Wail of the Banshee"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 932
    }
  },
  {
    "type": "enemy",
    "name": "Lorcan",
    "stats": {
      "speed": 15,
      "brawn": 0,
      "magic": 13,
      "armour": 8,
      "health": 100,
      "maxHealth": 100
    },
    "abilities": [
      "Enduring Spirit"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 939
    }
  },
  {
    "type": "enemy",
    "name": "Statue",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 10,
      "health": 24,
      "maxHealth": 24
    },
    "abilities": [
      "Stomping Statues",
      "Magic of the Makers",
      "Enchanted Stone"
    ],
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 939
    }
  },
  {
    "type": "enemy",
    "name": "Ghastly Goblin",
    "stats": {
      "speed": 2,
      "brawn": 2,
      "magic": 0,
      "armour": 1,
      "health": 20,
      "maxHealth": 20
    },
    "abilities": [],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 10
    }
  },
  {
    "type": "enemy",
    "name": "Troll",
    "stats": {
      "speed": 0,
      "brawn": 1,
      "magic": 0,
      "armour": 0,
      "health": 15,
      "maxHealth": 15
    },
    "abilities": [
      "Regeneration:+2 health at start of combat round max 15"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 11
    }
  },
  {
    "type": "enemy",
    "name": "Number 13",
    "stats": {
      "speed": 2,
      "brawn": 3,
      "magic": 0,
      "armour": 2,
      "health": 30,
      "maxHealth": 30
    },
    "abilities": [
      "Unlucky for some: If hero rolls 1 - receive 2 damage ignoring armour"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 13
    }
  },
  {
    "type": "enemy",
    "name": "Raging storm",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 1,
      "armour": 0,
      "health": 12,
      "maxHealth": 12
    },
    "abilities": [
      "Celestial charge: If hero deals damage - receive 2 damage ignoring armour"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 14
    }
  },
  {
    "type": "enemy",
    "name": "Bilhal the Fish",
    "stats": {
      "speed": 5,
      "brawn": 4,
      "magic": 0,
      "armour": 2,
      "health": 35,
      "maxHealth": 35
    },
    "abilities": [
      "Motley Crew: If Ruffians are alive - add 3 to damage score of Bilhal"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 16
    }
  },
  {
    "type": "enemy",
    "name": "Ruffians",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 2,
      "health": 15,
      "maxHealth": 15
    },
    "abilities": [],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 16
    }
  },
  {
    "type": "enemy",
    "name": "Wiccan witch",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 1,
      "armour": 0,
      "health": 14,
      "maxHealth": 14
    },
    "abilities": [],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 40
    }
  },
  {
    "type": "enemy",
    "name": "Gutless",
    "stats": {
      "speed": 3,
      "brawn": 3,
      "magic": 0,
      "armour": 2,
      "health": 30,
      "maxHealth": 30
    },
    "abilities": [
      "Blood n Guts:At the start of a combat round, roll a die - 1-2 reduce hero speed by 1 for 1 round, 3-6 reduce enemy speed by 1 for 1 round",
      "Undead: You can use ashes, holy water, holy protector"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 58
    }
  },
  {
    "type": "enemy",
    "name": "Drust the defiled",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 0,
      "health": 14,
      "maxHealth": 14
    },
    "abilities": [],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 61
    }
  },
  {
    "type": "enemy",
    "name": "Zombies",
    "stats": {
      "speed": 2,
      "brawn": 2,
      "magic": 0,
      "armour": 1,
      "health": 70,
      "maxHealth": 70
    },
    "abilities": [
      "Grappling hands: If enemy wins a round and rolls a 6 for damage - hero loses an equipment item or backpack item"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 66
    }
  },
  {
    "type": "enemy",
    "name": "Knight",
    "stats": {
      "speed": 0,
      "brawn": 1,
      "magic": 0,
      "armour": 2,
      "health": 18,
      "maxHealth": 18
    },
    "abilities": [],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 67
    }
  },
  {
    "type": "enemy",
    "name": "First mate",
    "stats": {
      "speed": 2,
      "brawn": 2,
      "magic": 0,
      "armour": 2,
      "health": 20,
      "maxHealth": 20
    },
    "abilities": [
      "Blast of: The enemy wins after round 6",
      "Cowardly: If First mate is defeated, Hero wins the combat"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 71
    }
  },
  {
    "type": "enemy",
    "name": "Cannon team",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 1,
      "health": 15,
      "maxHealth": 15
    },
    "abilities": [],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 71
    }
  },
  {
    "type": "enemy",
    "name": "Dire wolf",
    "stats": {
      "speed": 1,
      "brawn": 2,
      "magic": 0,
      "armour": 2,
      "health": 20,
      "maxHealth": 20
    },
    "abilities": [],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 95
    }
  },
  {
    "type": "enemy",
    "name": "Lazlo",
    "stats": {
      "speed": 5,
      "brawn": 4,
      "magic": 0,
      "armour": 2,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Shock treatment: If any character rolls a double - lose 4 health ignoring armour",
      "In a spin: If hero wins a combat round, roll a die - 1-2 hero does not roll for damage"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 102
    }
  },
  {
    "type": "enemy",
    "name": "Archers",
    "stats": {
      "speed": 2,
      "brawn": 2,
      "magic": 0,
      "armour": 0,
      "health": 20,
      "maxHealth": 20
    },
    "abilities": [
      "Ranged foe: Hero cannot use speed or combat abilities"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 103
    }
  },
  {
    "type": "enemy",
    "name": "Enraged Zombies",
    "stats": {
      "speed": 2,
      "brawn": 2,
      "magic": 0,
      "armour": 1,
      "health": 25,
      "maxHealth": 25
    },
    "abilities": [
      "Back from dead: When enemy is defeated, roll a die - 1-2 enemy gains 6 health. Can only be used once per combat",
      "Undead: You can use ashes, holy water, holy protector"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 138
    }
  },
  {
    "type": "enemy",
    "name": "Hellhound",
    "stats": {
      "speed": 4,
      "brawn": 7,
      "magic": 0,
      "armour": 3,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "Backdraft: When hero scores damage, take 3 damage ignoring armour",
      "Enraged: At the start of round 5 - enemy gains +1 speed and +1 brawn"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 144
    }
  },
  {
    "type": "enemy",
    "name": "Poltergeist",
    "stats": {
      "speed": 5,
      "brawn": 0,
      "magic": 3,
      "armour": 3,
      "health": 35,
      "maxHealth": 35
    },
    "abilities": [],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 147
    }
  },
  {
    "type": "enemy",
    "name": "Sinister sprigs",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 1,
      "health": 12,
      "maxHealth": 12
    },
    "abilities": [],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 150
    }
  },
  {
    "type": "enemy",
    "name": "Gairn",
    "stats": {
      "speed": 5,
      "brawn": 0,
      "magic": 5,
      "armour": 4,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "Frost fire: When hero receives damage from Gairn, they loose 1 health at the end of each round",
      "Corpse dance: If Gairn's health is reduced to 25 or less, Gairn removes all passive effects and hides and the skeletons will become the sole enemy until they are defated."
    ],
    "spawns": [
      "Skeletons"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 158
    }
  },
  {
    "type": "enemy",
    "name": "Skeletons",
    "stats": {
      "speed": 4,
      "brawn": 0,
      "magic": 4,
      "armour": 3,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Army: Skeletons will only be enemies when Gairn is hidden",
      "Body of bone",
      "Undead minions: You can use holy water, holy protector against skeletons, but not Gairn"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 158
    }
  },
  {
    "type": "enemy",
    "name": "Reverend",
    "stats": {
      "speed": 2,
      "brawn": 0,
      "magic": 3,
      "armour": 2,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "Pest control: At the end of each combat round, roll a die - 1-2: Add +2 to the ghoul effect: Ghoul effect: Hero takes 0 damage at the end of each combat round",
      "Undead: You can use ashes, holy water, holy protector"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 168
    }
  },
  {
    "type": "enemy",
    "name": "Margoyle",
    "stats": {
      "speed": 3,
      "brawn": 3,
      "magic": 0,
      "armour": 3,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "Stone blood: If enemy rolls 4-6 for damage - armour of the enemy is raised by 1 up to 6"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 200
    }
  },
  {
    "type": "enemy",
    "name": "Ironclad",
    "stats": {
      "speed": 5,
      "brawn": 5,
      "magic": 0,
      "armour": 5,
      "health": 35,
      "maxHealth": 35
    },
    "abilities": [
      "Body of iron: Immune to Bleed, Thorns, Thorn Cage"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 208
    }
  },
  {
    "type": "enemy",
    "name": "Assasin Ant",
    "stats": {
      "speed": 3,
      "brawn": 2,
      "magic": 0,
      "armour": 2,
      "health": 35,
      "maxHealth": 35
    },
    "abilities": [
      "Venom: Once hero receives damage from the Assasin Ant, lose 2 health at the end of each combat round"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 229
    }
  },
  {
    "type": "enemy",
    "name": "Orgorath",
    "stats": {
      "speed": 5,
      "brawn": 5,
      "magic": 0,
      "armour": 4,
      "health": 80,
      "maxHealth": 80
    },
    "abilities": [
      "Deadly thorns: Hero loses 3 health at the end of the round",
      "Divine fury: Hero's damage is increased by 3",
      "Thousand fists: Instead of rolling for damage, roll 2-5 damage dice ignoring armor in consecutive rounds, once in combat"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 237
    }
  },
  {
    "type": "enemy",
    "name": "Roadside Robbers",
    "stats": {
      "speed": 3,
      "brawn": 3,
      "magic": 0,
      "armour": 1,
      "health": 25,
      "maxHealth": 25
    },
    "abilities": [],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 241
    }
  },
  {
    "type": "enemy",
    "name": "Warriors",
    "stats": {
      "speed": 5,
      "brawn": 0,
      "magic": 4,
      "armour": 3,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Body of bone: Immune to Bleed, Venom",
      "Undead minions: You can use ashes, holy water, holy protector"
    ],
    "spawns": [
      "Mages, High Priest"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 249
    }
  },
  {
    "type": "enemy",
    "name": "Mages",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 2,
      "health": 20,
      "maxHealth": 20
    },
    "abilities": [
      "Dark fire: At the end of the round, take a speed challenge. If you get 0-12 - hero takes 5 damage ignoring armour",
      "Body of bone: Immune to Bleed, Venom",
      "Undead minions: You can use ashes, holy water, holy protector"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 249
    }
  },
  {
    "type": "enemy",
    "name": "High Priest",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 2,
      "health": 20,
      "maxHealth": 20
    },
    "abilities": [
      "Bone mending: +4 health (max 40) to Warriors at the end of the round",
      "Body of bone: Immune to Bleed, Venom",
      "Undead minions: You can use ashes, holy water, holy protector"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 249
    }
  },
  {
    "type": "enemy",
    "name": "Dagona",
    "stats": {
      "speed": 6,
      "brawn": 4,
      "magic": 0,
      "armour": 4,
      "health": 70,
      "maxHealth": 70
    },
    "abilities": [
      "Slash and burn: Roll 3 damage dice and take the highest result",
      "Ashes to ashes: When hero rolls double for speed, they lose the combat round"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 256
    }
  },
  {
    "type": "enemy",
    "name": "Zombie horde",
    "stats": {
      "speed": 3,
      "brawn": 3,
      "magic": 0,
      "armour": 2,
      "health": 28,
      "maxHealth": 28
    },
    "abilities": [
      "Unstoppable: If hero is alive at the end of round 5, the enemy is defeated",
      "All pile on: No special abilities or backpack items can be used in this combat"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 262
    }
  },
  {
    "type": "enemy",
    "name": "Poltergeist",
    "stats": {
      "speed": 5,
      "brawn": 0,
      "magic": 3,
      "armour": 3,
      "health": 35,
      "maxHealth": 35
    },
    "abilities": [],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 266
    }
  },
  {
    "type": "enemy",
    "name": "Orgorath",
    "stats": {
      "speed": 5,
      "brawn": 5,
      "magic": 0,
      "armour": 4,
      "health": 80,
      "maxHealth": 80
    },
    "abilities": [
      "Deadly thorns: Hero loses 3 health at the end of the round",
      "Earth golems: The enemy loses 2 health at the end of each round. If hero loses a round, they can sacrifice the Earth golems to avoid damage",
      "Furious roar: Instead of rolling for damage, increase speed, brawn and magic by 1 for 3 rounds"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 268
    }
  },
  {
    "type": "enemy",
    "name": "Manticore",
    "stats": {
      "speed": 2,
      "brawn": 3,
      "magic": 0,
      "armour": 1,
      "health": 25,
      "maxHealth": 25
    },
    "abilities": [
      "Benin's blessing: +1 speed, brawn and magic for hero",
      "Holy healer: When the hero's health is 1-8, restore full health and remove Venom (once per combat)",
      "Venom: Once hero receives damage, lose 1 health at the end of each combat round"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 280
    }
  },
  {
    "type": "enemy",
    "name": "Archer ants",
    "stats": {
      "speed": 2,
      "brawn": 1,
      "magic": 0,
      "armour": 1,
      "health": 20,
      "maxHealth": 20
    },
    "abilities": [],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 281
    }
  },
  {
    "type": "enemy",
    "name": "Headless",
    "stats": {
      "speed": 2,
      "brawn": 0,
      "magic": 3,
      "armour": 2,
      "health": 35,
      "maxHealth": 35
    },
    "abilities": [
      "Wrath of the witchfinder: +2 damage for the hero"
    ],
    "spawns": [
      "Flaming skull"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 284
    }
  },
  {
    "type": "enemy",
    "name": "Flaming skull",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 2,
      "health": 20,
      "maxHealth": 20
    },
    "abilities": [
      "Searing skull: At the end of each round, hero loses 2 health",
      "Head case: Immune to Bleed"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 284
    }
  },
  {
    "type": "enemy",
    "name": "Fungalus",
    "stats": {
      "speed": 4,
      "brawn": 0,
      "magic": 4,
      "armour": 12,
      "health": 30,
      "maxHealth": 30
    },
    "abilities": [
      "Sinister saps: At the end of the round, add 1 sap. Each sap deals 1 damage to the hero, ignoring armour",
      "Blast the bile: When hero wins round, instead of rolling for damage, destroy all saps",
      "Power pruning: If hero wins round, instead of rolling for damage, -4 armour (enemy)."
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 288
    }
  },
  {
    "type": "enemy",
    "name": "Bombardier ant",
    "stats": {
      "speed": 3,
      "brawn": 2,
      "magic": 0,
      "armour": 2,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Bullet storm: If the enemy wins a round, roll a die. 4-6 - ant does not deal damage"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 290
    }
  },
  {
    "type": "enemy",
    "name": "Billah the fish",
    "stats": {
      "speed": 5,
      "brawn": 4,
      "magic": 0,
      "armour": 2,
      "health": 35,
      "maxHealth": 35
    },
    "abilities": [],
    "spawns": [
      "Ruffians"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 295
    }
  },
  {
    "type": "enemy",
    "name": "Ruffians",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 2,
      "health": 20,
      "maxHealth": 20
    },
    "abilities": [
      "Motley crew: +3 damage (enemy)"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 295
    }
  },
  {
    "type": "enemy",
    "name": "Rap Unzal",
    "stats": {
      "speed": 11,
      "brawn": 0,
      "magic": 7,
      "armour": 3,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Dem bones: +2 health (enemy) at the end of the round",
      "Ghost of a victory: Immune to Cutpurse, Pillage"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 298
    }
  },
  {
    "type": "enemy",
    "name": "Queen Bellona",
    "stats": {
      "speed": 3,
      "brawn": 2,
      "magic": 0,
      "armour": 3,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Pin cushion: Each time hero causes damage they take 1 damage ignoring armour",
      "Look out for larvae: At the start of the combat round, roll a die. 1-3 adds one larvae. Each larvae deals 1 damage ignoring armour at the end of the round",
      "Bug blaster: Use borehole charge -  -10 health"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 307
    }
  },
  {
    "type": "enemy",
    "name": "Benin",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 2,
      "armour": 1,
      "health": 18,
      "maxHealth": 18
    },
    "abilities": [
      "Harm or heal: If enemy wins a round, roll a die. 1-2: +2 health (enemy, max 18), 3-6: roll for damage"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 312
    }
  },
  {
    "type": "enemy",
    "name": "Blood ticks",
    "stats": {
      "speed": 3,
      "brawn": 2,
      "magic": 0,
      "armour": 2,
      "health": 30,
      "maxHealth": 30
    },
    "abilities": [
      "Bombardement: At the start of a round, roll a die. 1-3: -2 health (hero)",
      "Blood suckers: When enemy wins round and causes damage to the enemy, +1 health (enemy, max 30)"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 327
    }
  },
  {
    "type": "enemy",
    "name": "Inkheart",
    "stats": {
      "speed": 5,
      "brawn": 4,
      "magic": 0,
      "armour": 3,
      "health": 35,
      "maxHealth": 35
    },
    "abilities": [
      "Back to black: +1 brawn at the end of round (max 8)",
      "Body of ink: Immune to Bleed, Thorns, Thorn Cage"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 362
    }
  },
  {
    "type": "enemy",
    "name": "Kaala",
    "stats": {
      "speed": 10,
      "brawn": 7,
      "magic": 0,
      "armour": 6,
      "health": 100,
      "maxHealth": 100
    },
    "abilities": [
      "Look into my eyes: When the hero rolls the 8th 1 die (after rerolling) and they don't have the Golden mirror, the hero loses",
      "if the enemy rolls the 8th 1 die and the hero has the Golden mirror, the hero wins",
      "Lethal venom: Once the hero receives damage, lose 6 health at the end of each combat round"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 371
    }
  },
  {
    "type": "enemy",
    "name": "Erkil",
    "stats": {
      "speed": 13,
      "brawn": 10,
      "magic": 0,
      "armour": 10,
      "health": 120,
      "maxHealth": 120
    },
    "abilities": [
      "Stone skin: At the start of the 5th round, raise armour to 28",
      "Chip away: After the start of the 5th round, instead of rolling for damage the hero can reduce armour of the enemy by 4, taking 4 damage ignoring armour",
      "",
      "Titan stone: At the start of round 5, enemy is immune to all passive damage"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 379
    }
  },
  {
    "type": "enemy",
    "name": "Gaia",
    "stats": {
      "speed": 5,
      "brawn": 4,
      "magic": 0,
      "armour": 4,
      "health": 45,
      "maxHealth": 45
    },
    "abilities": [],
    "spawns": [
      "Roots"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 384
    }
  },
  {
    "type": "enemy",
    "name": "Roots",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 1,
      "health": 20,
      "maxHealth": 20
    },
    "abilities": [
      "Feeding time: Every 3 rounds, if Roots are still alive hero receives 15 damage. Roots restore full health (even when defeated)"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 384
    }
  },
  {
    "type": "enemy",
    "name": "Xenos",
    "stats": {
      "speed": 12,
      "brawn": 0,
      "magic": 9,
      "armour": 9,
      "health": 65,
      "maxHealth": 65
    },
    "abilities": [
      "Knowledge is power: If the hero wins a round, instead for rolling for damage: -1 speed -1 magic -1 armour (enemy, min speed 9, min magic armour 6)"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 390
    }
  },
  {
    "type": "enemy",
    "name": "Stone giants",
    "stats": {
      "speed": 5,
      "brawn": 4,
      "magic": 0,
      "armour": 12,
      "health": 35,
      "maxHealth": 35
    },
    "abilities": [
      "Charged: Each time hero scores damage on the giant and don't have Insulated - -2 health",
      "Enchanted rock: Immune to Bleed, Sear, Thorns, Thorn Cage, Fire Aura"
    ],
    "spawns": [
      "Runed pilar"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 392
    }
  },
  {
    "type": "enemy",
    "name": "Runed pilar",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 3,
      "health": 10,
      "maxHealth": 10
    },
    "abilities": [
      "Pound those pillars: When destroyed, -4 armour (Stone giant), 6 damage (hero)",
      "Enchanted rock: Immune to Bleed, Sear, Thorns, Thorn Cage, Fire Aura"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 392
    }
  },
  {
    "type": "enemy",
    "name": "Runed pilar",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 3,
      "health": 10,
      "maxHealth": 10
    },
    "abilities": [
      "Pound those pillars: When destroyed, -4 armour (Stone giant), 6 damage (hero)",
      "Enchanted rock: Immune to Bleed, Sear, Thorns, Thorn Cage, Fire Aura"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 392
    }
  },
  {
    "type": "enemy",
    "name": "Runed pilar",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 3,
      "health": 10,
      "maxHealth": 10
    },
    "abilities": [
      "Pound those pillars: When destroyed, -4 armour (Stone giant), 6 damage (hero)",
      "Enchanted rock: Immune to Bleed, Sear, Thorns, Thorn Cage, Fire Aura"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 392
    }
  },
  {
    "type": "enemy",
    "name": "Saw",
    "stats": {
      "speed": 5,
      "brawn": 4,
      "magic": 0,
      "armour": 3,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Spinning saw: At the end of each round, roll a die. 1-2: -4 health (hero), 3-6: -4 health (Soldiers)",
      "Wood and metal: Immune to Bleet"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 398
    }
  },
  {
    "type": "enemy",
    "name": "Soldiers",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 1,
      "health": 25,
      "maxHealth": 25
    },
    "abilities": [
      "Stabbing swords: At the end of the combat round, -2 health (hero)",
      "Wood and metal: Immune to Bleet"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 398
    }
  },
  {
    "type": "enemy",
    "name": "Fisher king",
    "stats": {
      "speed": 8,
      "brawn": 6,
      "magic": 0,
      "armour": 5,
      "health": 80,
      "maxHealth": 80
    },
    "abilities": [
      "Jump around: At the start of the combat round, pick [North, Center, East] and roll a die. 1-2: Continue when North was picked, 3-4: Continue when Center was picked, 5-6: Continue when East was picked. Otherwise take speed challenge - 1-13: -6 health (hero). Continue with passive effects."
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 408
    }
  },
  {
    "type": "enemy",
    "name": "Custodian",
    "stats": {
      "speed": 5,
      "brawn": 0,
      "magic": 4,
      "armour": 3,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "Reanimator: Once per combat when Custodian is below 25 health - +40 health (Forty thieves)",
      "Hex of pain: At the end of the combat round, -1 health (hero)"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 419
    }
  },
  {
    "type": "enemy",
    "name": "Forty thieves",
    "stats": {
      "speed": 5,
      "brawn": 0,
      "magic": 5,
      "armour": 2,
      "health": 0,
      "maxHealth": 0
    },
    "abilities": [
      "Protector: Custodian cannot be damaged while Forty thieves are alive",
      "Reanimator 2: At the end of the round, +2 health (enemy, max 50)"
    ],
    "spawns": [
      "Forty thieves"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 419
    }
  },
  {
    "type": "enemy",
    "name": "The Forger",
    "stats": {
      "speed": 4,
      "brawn": 3,
      "magic": 0,
      "armour": 4,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Flame wrapper: At the start of the combat round, roll a die. 1-3: +1 brawn (enemy)",
      "Knockdown"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 422
    }
  },
  {
    "type": "enemy",
    "name": "Rocco",
    "stats": {
      "speed": 5,
      "brawn": 4,
      "magic": 0,
      "armour": 4,
      "health": 35,
      "maxHealth": 35
    },
    "abilities": [
      "Body of rock: Immune to Bleed"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 425
    }
  },
  {
    "type": "enemy",
    "name": "Umbra",
    "stats": {
      "speed": 6,
      "brawn": 5,
      "magic": 0,
      "armour": 4,
      "health": 60,
      "maxHealth": 60
    },
    "abilities": [
      "It's behind you: At the end of the combat round, roll a die. 1-2: 10 damage (hero)"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 432
    }
  },
  {
    "type": "enemy",
    "name": "Cuddles",
    "stats": {
      "speed": 5,
      "brawn": 3,
      "magic": 0,
      "armour": 3,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Piercing claws: Piercing",
      "Bleed"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 433
    }
  },
  {
    "type": "enemy",
    "name": "Papyrus",
    "stats": {
      "speed": 5,
      "brawn": 4,
      "magic": 0,
      "armour": 3,
      "health": 30,
      "maxHealth": 30
    },
    "abilities": [
      "Body of paper: Immune to Bleed"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 444
    }
  },
  {
    "type": "enemy",
    "name": "Quetzal",
    "stats": {
      "speed": 7,
      "brawn": 6,
      "magic": 0,
      "armour": 5,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Razor beak: Piercing"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 457
    }
  },
  {
    "type": "enemy",
    "name": "Totem",
    "stats": {
      "speed": 6,
      "brawn": 0,
      "magic": 5,
      "armour": 0,
      "health": 0,
      "maxHealth": 0
    },
    "abilities": [
      "Power cubed: When all cubes are alive, roll 3 damage dice."
    ],
    "spawns": [
      "Snake cube",
      "Spider cube",
      "Jaguar cube"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 459
    }
  },
  {
    "type": "enemy",
    "name": "Snake cube",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 5,
      "health": 25,
      "maxHealth": 25
    },
    "abilities": [
      "Snake cube: Venom (Totem)",
      "Enhanted rock: Immune to Bleed"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 459
    }
  },
  {
    "type": "enemy",
    "name": "Spider cube",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 5,
      "health": 25,
      "maxHealth": 25
    },
    "abilities": [
      "Spider cube: +1 speed (Totem)",
      "Enhanted rock: Immune to Bleed"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 459
    }
  },
  {
    "type": "enemy",
    "name": "Jaguar cube",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 5,
      "health": 25,
      "maxHealth": 25
    },
    "abilities": [
      "Jaguar cube: At the end of the combat round, -2 health (hero)",
      "Enhanted rock: Immune to Bleed"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 459
    }
  },
  {
    "type": "enemy",
    "name": "Succubus",
    "stats": {
      "speed": 10,
      "brawn": 0,
      "magic": 5,
      "armour": 9,
      "health": 80,
      "maxHealth": 80
    },
    "abilities": [
      "Mental daggers: -2 health * rd (Hero)",
      "Delirium: Inflicted when Hero takes damage. When hero wins a round, roll a die. 1-2: Skip damage roll phase",
      "Revenge of the tigris: +2 damage (hero)"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 463
    }
  },
  {
    "type": "enemy",
    "name": "Bill",
    "stats": {
      "speed": 9,
      "brawn": 8,
      "magic": 0,
      "armour": 8,
      "health": 90,
      "maxHealth": 90
    },
    "abilities": [
      "Backshot barrage: At the end of round, take a speed challenge. 1-14: 10 damage (hero)",
      "Animal attraction: If you have the rhinosaur pheromone & the rhinosaur has been freed from its cage, instead of rolling for damage: -4 health * every rd (enemy)",
      "Survival of the fittest: Immune to Strength in Numbers"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 466
    }
  },
  {
    "type": "enemy",
    "name": "Orgorath",
    "stats": {
      "speed": 5,
      "brawn": 5,
      "magic": 0,
      "armour": 4,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Deadly thorns: -3 health * rd (hero)"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 468
    }
  },
  {
    "type": "enemy",
    "name": "Sniper",
    "stats": {
      "speed": 9,
      "brawn": 6,
      "magic": 0,
      "armour": 5,
      "health": 60,
      "maxHealth": 60
    },
    "abilities": [],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 482
    }
  },
  {
    "type": "enemy",
    "name": "Maximus",
    "stats": {
      "speed": 5,
      "brawn": 5,
      "magic": 0,
      "armour": 15,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Dismantle: Instead of rolling for damage: -3 armour (enemy, min 0)",
      "Body or iron: Immune to bleed, thorsn and thorn cage"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 484
    }
  },
  {
    "type": "enemy",
    "name": "The furnace",
    "stats": {
      "speed": 5,
      "brawn": 0,
      "magic": 4,
      "armour": 2,
      "health": 70,
      "maxHealth": 70
    },
    "abilities": [
      "Fury of the furnace: -3 health * rd (hero)",
      "Holy vengeance: +3 damage (hero)"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 490
    }
  },
  {
    "type": "enemy",
    "name": "Lycanth",
    "stats": {
      "speed": 5,
      "brawn": 5,
      "magic": 0,
      "armour": 4,
      "health": 55,
      "maxHealth": 55
    },
    "abilities": [
      "Miasma of decay: -3 health * rd (hero)",
      "Disease"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 495
    }
  },
  {
    "type": "enemy",
    "name": "Succubus",
    "stats": {
      "speed": 10,
      "brawn": 0,
      "magic": 5,
      "armour": 9,
      "health": 80,
      "maxHealth": 80
    },
    "abilities": [
      "Mental daggers: -2 health * rd (Hero)",
      "Delirium: Inflicted when Hero takes damage. When hero wins a round, roll a die. 1-2: Skip damage roll phase",
      "Revenge of the tigris: +4 damage (hero)"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 505
    }
  },
  {
    "type": "enemy",
    "name": "Mandrills",
    "stats": {
      "speed": 9,
      "brawn": 6,
      "magic": 0,
      "armour": 8,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "Feral frency: +1 speed * rd (enemy, max 14)"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 517
    }
  },
  {
    "type": "enemy",
    "name": "Hunters",
    "stats": {
      "speed": 9,
      "brawn": 7,
      "magic": 0,
      "armour": 4,
      "health": 35,
      "maxHealth": 35
    },
    "abilities": [],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 521
    }
  },
  {
    "type": "enemy",
    "name": "Grub knight",
    "stats": {
      "speed": 6,
      "brawn": 5,
      "magic": 0,
      "armour": 4,
      "health": 55,
      "maxHealth": 55
    },
    "abilities": [
      "Grappling grubs: Damage (hero) -> roll a die. 1-3: -1 speed (hero)",
      "Disease"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 523
    }
  },
  {
    "type": "enemy",
    "name": "Fengz",
    "stats": {
      "speed": 11,
      "brawn": 0,
      "magic": 7,
      "armour": 3,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Whirling chains: -4 health * rd (hero)",
      "Ghost of a victory"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 533
    }
  },
  {
    "type": "enemy",
    "name": "Furies",
    "stats": {
      "speed": 11,
      "brawn": 0,
      "magic": 7,
      "armour": 3,
      "health": 100,
      "maxHealth": 100
    },
    "abilities": [
      "Endless assault: At the end of the round, roll a die. 1-2: +4 health (enemy), +4 maxHealth (enemy)",
      "Fury of the swarm: -2 health * rd (hero)"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 538
    }
  },
  {
    "type": "enemy",
    "name": "Boogaloo",
    "stats": {
      "speed": 6,
      "brawn": 4,
      "magic": 0,
      "armour": 3,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "It's `lectric: If not Insulated, -(2 + armour) health (hero)"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 552
    }
  },
  {
    "type": "enemy",
    "name": "Hounds",
    "stats": {
      "speed": 11,
      "brawn": 7,
      "magic": 0,
      "armour": 5,
      "health": 90,
      "maxHealth": 90
    },
    "abilities": [
      "Pack attack: If enemy rolls double for speed, -4 health (hero)",
      "Molten skin: -2 health * rd (hero)",
      "Body of flame: Immune to Backdraft, Fire Aura, Sear, Searing Mantle"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 564
    }
  },
  {
    "type": "enemy",
    "name": "Golden Guards",
    "stats": {
      "speed": 9,
      "brawn": 9,
      "magic": 0,
      "armour": 8,
      "health": 70,
      "maxHealth": 70
    },
    "abilities": [
      "Scything blades: Each time a speed or combat ability is played, roll a die. 1-4: -4 health (hero), ability is skipped",
      "Knockdown"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 568
    }
  },
  {
    "type": "enemy",
    "name": "Tigris",
    "stats": {
      "speed": 9,
      "brawn": 6,
      "magic": 0,
      "armour": 4,
      "health": 70,
      "maxHealth": 70
    },
    "abilities": [
      "Revenge of the tigris: 3 damage dice for highest value",
      "Bleed"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 570
    }
  },
  {
    "type": "enemy",
    "name": "Succubus",
    "stats": {
      "speed": 10,
      "brawn": 0,
      "magic": 5,
      "armour": 9,
      "health": 80,
      "maxHealth": 80
    },
    "abilities": [
      "Mental daggers: -2 health * rd (Hero)",
      "Delirium: Inflicted when Hero takes damage. When hero wins a round, roll a die. 1-2: Skip damage roll phase",
      "Revenge of the tigris: +2 damage (hero)"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 572
    }
  },
  {
    "type": "enemy",
    "name": "Zephyr",
    "stats": {
      "speed": 5,
      "brawn": 0,
      "magic": 4,
      "armour": 3,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "Slipstream: Hero wins speed, roll a die: 1-3: -4 health (hero), skip to passive phase",
      "Body of air: Immune to Bleed, Disease and Venom"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 573
    }
  },
  {
    "type": "enemy",
    "name": "Cernos",
    "stats": {
      "speed": 10,
      "brawn": 9,
      "magic": 0,
      "armour": 10,
      "health": 85,
      "maxHealth": 85
    },
    "abilities": [],
    "spawns": [
      "Rock fists"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 579
    }
  },
  {
    "type": "enemy",
    "name": "Rock fists",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 10,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Rock fists: +2 speed (enemy), 2 damage dice",
      "Body of rock: Immune to Barbs, Bleed, Disease, Piercing, Thorns, Thorn Cage, Venom"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 579
    }
  },
  {
    "type": "enemy",
    "name": "Arratoch",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 5,
      "health": 35,
      "maxHealth": 35
    },
    "abilities": [
      "Arratoch alarm: -2 brawn * rd (hero), -2 magic * rd (hero)",
      "Body of rock",
      "Companions courage: +2 damage (hero)",
      "Golem need: If both Otum and Atum are dead, hero wins fight"
    ],
    "spawns": [
      "Otum",
      "Atum"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 582
    }
  },
  {
    "type": "enemy",
    "name": "Olum",
    "stats": {
      "speed": 11,
      "brawn": 8,
      "magic": 0,
      "armour": 9,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "Brotherly love: If Atum is dead: +2 speed (Olum), +4 brawn (Olum)",
      "Body of rock",
      "Golem protector: When winning a round the hero can choose to Attack Arratoch instead"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 582
    }
  },
  {
    "type": "enemy",
    "name": "Atum",
    "stats": {
      "speed": 11,
      "brawn": 9,
      "magic": 0,
      "armour": 7,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "Brotherly love: If Olum is dead: +2 speed (Atum), +4 brawn (Atum)",
      "Body of rock",
      "Golem protector"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 582
    }
  },
  {
    "type": "enemy",
    "name": "Sitadell",
    "stats": {
      "speed": 10,
      "brawn": 7,
      "magic": 0,
      "armour": 8,
      "health": 60,
      "maxHealth": 60
    },
    "abilities": [
      "Rock bluff: +2 armour * rd. When hero wins round instead of rolling for damage: 7 armour (enemy)",
      "Body of rock"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 584
    }
  },
  {
    "type": "enemy",
    "name": "The weeper",
    "stats": {
      "speed": 7,
      "brawn": 5,
      "magic": 0,
      "armour": 4,
      "health": 60,
      "maxHealth": 60
    },
    "abilities": [
      "Septic seepage: -rd health * rd (hero)"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 586
    }
  },
  {
    "type": "enemy",
    "name": "Zambezi",
    "stats": {
      "speed": 9,
      "brawn": 7,
      "magic": 0,
      "armour": 6,
      "health": 60,
      "maxHealth": 60
    },
    "abilities": [
      "Sniper fire: At the end of the round roll a die. 1-3: -3 health (hero), 4-6: -3 health (enemy)"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 588
    }
  },
  {
    "type": "enemy",
    "name": "Langurs",
    "stats": {
      "speed": 10,
      "brawn": 4,
      "magic": 0,
      "armour": 6,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Leaf blades: Piercing"
    ],
    "spawns": [
      "Squirrels"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 596
    }
  },
  {
    "type": "enemy",
    "name": "Squirrels",
    "stats": {
      "speed": 0,
      "brawn": 0,
      "magic": 0,
      "armour": 2,
      "health": 30,
      "maxHealth": 30
    },
    "abilities": [
      "Angry mob: Speed challenge @ end of round. 1-16: -5 health (hero)"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 596
    }
  },
  {
    "type": "enemy",
    "name": "Perez",
    "stats": {
      "speed": 9,
      "brawn": 6,
      "magic": 0,
      "armour": 6,
      "health": 70,
      "maxHealth": 70
    },
    "abilities": [
      "Bark whip: For each 1 hero rolls for speed: -4 health"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 597
    }
  },
  {
    "type": "enemy",
    "name": "Lich",
    "stats": {
      "speed": 10,
      "brawn": 0,
      "magic": 9,
      "armour": 10,
      "health": 90,
      "maxHealth": 90
    },
    "abilities": [
      "Rune master: Roll a die @ end of round. 1-2: +4 health (enemy), 3-4: -armour health (hero), 5-6: -2 speed * 1 rd (hero), unless hero is Hexed"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 599
    }
  },
  {
    "type": "enemy",
    "name": "Fire sprite",
    "stats": {
      "speed": 11,
      "brawn": 0,
      "magic": 6,
      "armour": 4,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Blistering heat: -1 health (hero), unless hero has Fire Shield",
      "Fan the flames: Once, when reduced to <=20 health, roll a die: 1-2: +10 health, +3 magic (enemy), 3-4: +5 health (enemy), 5-6: +3 magic (enemy). If hero has Wind Breaker, 2 is addded to the die roll",
      "Body of flame",
      "Forge master: If hero has Fire Quencher: 30 health (enemy)"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 601
    }
  },
  {
    "type": "enemy",
    "name": "Nergal",
    "stats": {
      "speed": 10,
      "brawn": 0,
      "magic": 8,
      "armour": 10,
      "health": 100,
      "maxHealth": 100
    },
    "abilities": [
      "Hunger strike: Hero takes damage, roll a die. 1: Proceded, 2-6: +4 health (enemy, max 100), repeat max 6 times)",
      "Unstoppable feast: If hero loses round, no abilities can be used for the remainder of the round",
      "Companions' courage: +2 damage (hero)"
    ],
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 603
    }
  }
];

