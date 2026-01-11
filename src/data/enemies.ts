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
      "Knowndown",
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
      "Whirlwird"
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
      "Wayling Bride",
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
      "Heal me!",
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
  }
];

