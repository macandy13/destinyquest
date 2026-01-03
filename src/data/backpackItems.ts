import { BackpackItem } from '../types/hero';

export const BACKPACK_ITEMS: BackpackItem[] = [
  {
    "id": "healing_potion",
    "name": "Healing Potion",
    "type": "backpack",
    "effect": {
      "id": "healing_potion",
      "modification": {
        "stats": {
          "health": 6
        },
        "source": "Healing Potion",
        "target": "hero"
      },
      "duration": 0
    },
    "uses": 1,
    "notes": "Sold by the Apothecary",
    "bookRef": {
      "book": "Legions of Shadows",
      "act": 1,
      "section": 56
    }
  },
  {
    "id": "speed_potion",
    "name": "Speed Potion",
    "type": "backpack",
    "effect": {
      "id": "speed_potion",
      "modification": {
        "stats": {
          "speed": 2
        },
        "source": "Speed Potion",
        "target": "hero"
      },
      "duration": 1
    },
    "uses": 1,
    "notes": "Sold by the Apothecary",
    "bookRef": {
      "book": "Legions of Shadows",
      "act": 1,
      "section": 56
    }
  },
  {
    "id": "brawn_potion",
    "name": "Brawn Potion",
    "type": "backpack",
    "effect": {
      "id": "brawn_potion",
      "modification": {
        "stats": {
          "brawn": 2
        },
        "source": "Brawn Potion",
        "target": "hero"
      },
      "duration": 1
    },
    "uses": 1,
    "notes": "Sold by the Apothecary",
    "bookRef": {
      "book": "Legions of Shadows",
      "act": 1,
      "section": 56
    }
  },
  {
    "id": "magic_potion",
    "name": "Magic Potion",
    "type": "backpack",
    "effect": {
      "id": "magic_potion",
      "modification": {
        "stats": {
          "magic": 2
        },
        "source": "Magic Potion",
        "target": "hero"
      },
      "duration": 1
    },
    "uses": 1,
    "notes": "Sold by the Apothecary",
    "bookRef": {
      "book": "Legions of Shadows",
      "act": 1,
      "section": 56
    }
  },
  {
    "id": "crocodile_skin",
    "name": "Crocodile Skin",
    "type": "backpack",
    "effect": {
      "id": "crocodile_skin",
      "modification": {
        "stats": {},
        "source": "Crocodile Skin",
        "target": "hero"
      },
      "duration": 0
    },
    "uses": 0,
    "notes": "Dropped by the Crocodile",
    "bookRef": {
      "book": "Legions of Shadows",
      "act": 1,
      "section": 118
    }
  },
  {
    "id": "goblin_grog",
    "name": "Goblin Grog",
    "type": "backpack",
    "effect": {
      "id": "goblin_grog",
      "modification": {
        "stats": {
          "health": 4
        },
        "source": "Goblin Grog",
        "target": "hero"
      },
      "duration": 0
    },
    "uses": 2,
    "notes": "Found in Goblin loot",
    "bookRef": {
      "book": "Legions of Shadows",
      "act": 1,
      "section": 125
    }
  },
  {
    "id": "healing_salve",
    "name": "Healing Salve",
    "type": "backpack",
    "effect": {
      "id": "healing_salve",
      "modification": {
        "stats": {
          "health": 6
        },
        "source": "Healing Salve",
        "target": "hero"
      },
      "duration": 0
    },
    "uses": 1,
    "notes": "Found in Goblin loot",
    "bookRef": {
      "book": "Legions of Shadows",
      "act": 1,
      "section": 125
    }
  },
  {
    "id": "miracle_grow",
    "name": "Miracle Grow",
    "type": "backpack",
    "effect": {
      "id": "miracle_grow",
      "modification": {
        "stats": {
          "brawn": 2
        },
        "source": "Miracle Grow",
        "target": "hero"
      },
      "duration": 1
    },
    "uses": 1,
    "notes": "Found in Goblin loot",
    "bookRef": {
      "book": "Legions of Shadows",
      "act": 1,
      "section": 125
    }
  },
  {
    "id": "ghoul_hair",
    "name": "Ghoul Hair",
    "type": "backpack",
    "effect": {
      "id": "ghoul_hair",
      "modification": {
        "stats": {},
        "source": "Ghoul Hair",
        "target": "hero"
      },
      "duration": 0
    },
    "uses": 0,
    "notes": "Dropped by Ghouls",
    "bookRef": {
      "book": "Legions of Shadows",
      "act": 1,
      "section": 127
    }
  },
  {
    "id": "explosives_bombs",
    "name": "Explosives / Bombs",
    "type": "backpack",
    "effect": {
      "id": "explosives_bombs",
      "modification": {
        "stats": {
          "damageModifier": 10
        },
        "source": "Explosives / Bombs",
        "target": "hero"
      },
      "duration": 0
    },
    "uses": 1,
    "notes": "Sold by the Tinker",
    "bookRef": {
      "book": "Legions of Shadows",
      "act": 1,
      "section": 175
    }
  },
  {
    "id": "spiders_leg",
    "name": "Spider's Leg",
    "type": "backpack",
    "effect": {
      "id": "spiders_leg",
      "modification": {
        "stats": {},
        "source": "Spider's Leg",
        "target": "hero"
      },
      "duration": 0
    },
    "uses": 0,
    "notes": "Dropped by Spiders",
    "bookRef": {
      "book": "Legions of Shadows",
      "act": 1,
      "section": 179
    }
  },
  {
    "id": "goblin_grog",
    "name": "Goblin Grog",
    "type": "backpack",
    "effect": {
      "id": "goblin_grog",
      "modification": {
        "stats": {
          "health": 4
        },
        "source": "Goblin Grog",
        "target": "hero"
      },
      "duration": 0
    },
    "uses": 2,
    "notes": "Found in Goblin Chief's loot",
    "bookRef": {
      "book": "Legions of Shadows",
      "act": 1,
      "section": 260
    }
  },
  {
    "id": "da_boss",
    "name": "Da Boss",
    "type": "backpack",
    "effect": {
      "id": "da_boss",
      "modification": {
        "stats": {
          "damageModifier": 10
        },
        "source": "Da Boss",
        "target": "hero"
      },
      "duration": 0
    },
    "uses": 1,
    "notes": "Sold by Sea-Spray Steve",
    "bookRef": {
      "book": "Legions of Shadows",
      "act": 1,
      "section": 432
    }
  }
];

