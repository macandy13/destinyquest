import { Enemy } from '../types/combat';

export const ENEMIES: Enemy[] = [
  {
    "name": "Ruffians",
    "stats": {
      "speed": 3,
      "brawn": 2,
      "magic": 0,
      "armour": 0,
      "health": 15,
      "maxHealth": 15
    },
    "abilities": [],
    "bookRef": {
      "book": "Legions of Shadow",
      "act": 1,
      "section": 40
    }
  },
  {
    "name": "Mauler",
    "stats": {
      "speed": 5,
      "brawn": 4,
      "magic": 0,
      "armour": 0,
      "health": 25,
      "maxHealth": 25
    },
    "abilities": [
      "Savagery"
    ],
    "bookRef": {
      "book": "Legions of Shadow",
      "act": 1,
      "section": 26
    }
  },
  {
    "name": "Zombie",
    "stats": {
      "speed": 2,
      "brawn": 4,
      "magic": 0,
      "armour": 0,
      "health": 20,
      "maxHealth": 20
    },
    "abilities": [
      "Undead"
    ],
    "bookRef": {
      "book": "Legions of Shadow",
      "act": 1,
      "section": 68
    }
  },
  {
    "name": "Spindlesilk",
    "stats": {
      "speed": 7,
      "brawn": 5,
      "magic": 0,
      "armour": 1,
      "health": 35,
      "maxHealth": 35
    },
    "abilities": [
      "Webbed"
    ],
    "bookRef": {
      "book": "Legions of Shadow",
      "act": 1,
      "section": 132
    }
  },
  {
    "name": "The Witch (Hag)",
    "stats": {
      "speed": 4,
      "brawn": 0,
      "magic": 5,
      "armour": 0,
      "health": 20,
      "maxHealth": 20
    },
    "abilities": [
      "Charm"
    ],
    "bookRef": {
      "book": "Legions of Shadow",
      "act": 1,
      "section": 155
    }
  },
  {
    "name": "Valadin Roth",
    "stats": {
      "speed": 6,
      "brawn": 6,
      "magic": 0,
      "armour": 1,
      "health": 40,
      "maxHealth": 40
    },
    "abilities": [
      "Boss"
    ],
    "bookRef": {
      "book": "Legions of Shadow",
      "act": 1,
      "section": 160
    }
  },
  {
    "name": "Ratling",
    "stats": {
      "speed": 4,
      "brawn": 3,
      "magic": 0,
      "armour": 0,
      "health": 18,
      "maxHealth": 18
    },
    "abilities": [
      "Tail Lash"
    ],
    "bookRef": {
      "book": "Legions of Shadow",
      "act": 1,
      "section": 233
    }
  },
  {
    "name": "Goblin Chieftain",
    "stats": {
      "speed": 5,
      "brawn": 5,
      "magic": 0,
      "armour": 2,
      "health": 30,
      "maxHealth": 30
    },
    "abilities": [
      "Command"
    ],
    "bookRef": {
      "book": "Legions of Shadow",
      "act": 1,
      "section": 260
    }
  },
  {
    "name": "Trog Spearman",
    "stats": {
      "speed": 5,
      "brawn": 6,
      "magic": 0,
      "armour": 1,
      "health": 25,
      "maxHealth": 25
    },
    "abilities": [
      "Impale"
    ],
    "bookRef": {
      "book": "Legions of Shadow",
      "act": 1,
      "section": 327
    }
  },
  {
    "name": "Mud Golem",
    "stats": {
      "speed": 4,
      "brawn": 7,
      "magic": 0,
      "armour": 3,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "Body of Stone"
    ],
    "bookRef": {
      "book": "Legions of Shadow",
      "act": 2,
      "section": 283
    }
  },
  {
    "name": "Logan",
    "stats": {
      "speed": 10,
      "brawn": 9,
      "magic": 0,
      "armour": 2,
      "health": 50,
      "maxHealth": 50
    },
    "abilities": [
      "Legendary"
    ],
    "bookRef": {
      "book": "Legions of Shadow",
      "act": 2,
      "section": 313
    }
  },
  {
    "name": "Hive Queen",
    "stats": {
      "speed": 8,
      "brawn": 0,
      "magic": 8,
      "armour": 2,
      "health": 65,
      "maxHealth": 65
    },
    "abilities": [
      "Infest"
    ],
    "bookRef": {
      "book": "Legions of Shadow",
      "act": 2,
      "section": 314
    }
  },
  {
    "name": "King Louis",
    "stats": {
      "speed": 8,
      "brawn": 9,
      "magic": 0,
      "armour": 2,
      "health": 55,
      "maxHealth": 55
    },
    "abilities": [
      "Agility"
    ],
    "bookRef": {
      "book": "Legions of Shadow",
      "act": 2,
      "section": 359
    }
  },
  {
    "name": "Vesuvius",
    "stats": {
      "speed": 7,
      "brawn": 0,
      "magic": 11,
      "armour": 2,
      "health": 60,
      "maxHealth": 60
    },
    "abilities": [
      "Sear"
    ],
    "bookRef": {
      "book": "Legions of Shadow",
      "act": 2,
      "section": 377
    }
  },
  {
    "name": "Nalsa",
    "stats": {
      "speed": 9,
      "brawn": 9,
      "magic": 0,
      "armour": 2,
      "health": 55,
      "maxHealth": 55
    },
    "abilities": [
      "Roar"
    ],
    "bookRef": {
      "book": "Legions of Shadow",
      "act": 2,
      "section": 379
    }
  },
  {
    "name": "Zen",
    "stats": {
      "speed": 9,
      "brawn": 10,
      "magic": 0,
      "armour": 3,
      "health": 65,
      "maxHealth": 65
    },
    "abilities": [
      "Counter"
    ],
    "bookRef": {
      "book": "Legions of Shadow",
      "act": 2,
      "section": 382
    }
  },
  {
    "name": "Baron Greyloc",
    "stats": {
      "speed": 10,
      "brawn": 12,
      "magic": 0,
      "armour": 4,
      "health": 80,
      "maxHealth": 80
    },
    "abilities": [
      "Legendary"
    ],
    "bookRef": {
      "book": "Legions of Shadow",
      "act": 2,
      "section": 385
    }
  },
  {
    "name": "Shara Khana",
    "stats": {
      "speed": 10,
      "brawn": 11,
      "magic": 0,
      "armour": 2,
      "health": 70,
      "maxHealth": 70
    },
    "abilities": [
      "Swift"
    ],
    "bookRef": {
      "book": "Legions of Shadow",
      "act": 2,
      "section": 386
    }
  },
  {
    "name": "Stone Giant",
    "stats": {
      "speed": 5,
      "brawn": 11,
      "magic": 0,
      "armour": 8,
      "health": 75,
      "maxHealth": 75
    },
    "abilities": [
      "Body of Rock"
    ],
    "bookRef": {
      "book": "Legions of Shadow",
      "act": 2,
      "section": 443
    }
  },
  {
    "name": "The Count",
    "stats": {
      "speed": 9,
      "brawn": 10,
      "magic": 0,
      "armour": 3,
      "health": 60,
      "maxHealth": 60
    },
    "abilities": [
      "Feint"
    ],
    "bookRef": {
      "book": "Legions of Shadow",
      "act": 2,
      "section": 487
    }
  },
  {
    "name": "Swamp Giant",
    "stats": {
      "speed": 6,
      "brawn": 10,
      "magic": 0,
      "armour": 7,
      "health": 70,
      "maxHealth": 70
    },
    "abilities": [
      "Knockdown"
    ],
    "bookRef": {
      "book": "Legions of Shadow",
      "act": 2,
      "section": 509
    }
  },
  {
    "name": "Phoenix",
    "stats": {
      "speed": 9,
      "brawn": 0,
      "magic": 10,
      "armour": 1,
      "health": 60,
      "maxHealth": 60
    },
    "abilities": [
      "Fire Aura"
    ],
    "bookRef": {
      "book": "Legions of Shadow",
      "act": 2,
      "section": 565
    }
  },
  {
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
      "Haste"
    ],
    "bookRef": {
      "book": "Legions of Shadow",
      "act": 3,
      "section": 454
    }
  },
  {
    "name": "Grindle",
    "stats": {
      "speed": 10,
      "brawn": 12,
      "magic": 0,
      "armour": 5,
      "health": 85,
      "maxHealth": 85
    },
    "abilities": [
      "Dragonscale"
    ],
    "bookRef": {
      "book": "Legions of Shadow",
      "act": 3,
      "section": 708
    }
  },
  {
    "name": "Magmageddon",
    "stats": {
      "speed": 11,
      "brawn": 12,
      "magic": 12,
      "armour": 10,
      "health": 100,
      "maxHealth": 100
    },
    "abilities": [
      "Hybrid"
    ],
    "bookRef": {
      "book": "Legions of Shadow",
      "act": 3,
      "section": 738
    }
  },
  {
    "name": "Sharroth",
    "stats": {
      "speed": 12,
      "brawn": 15,
      "magic": 15,
      "armour": 6,
      "health": 150,
      "maxHealth": 150
    },
    "abilities": [
      "Final Boss"
    ],
    "bookRef": {
      "book": "Legions of Shadow",
      "act": 3,
      "section": 782
    }
  }
];
