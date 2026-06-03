import { BackpackItem } from '../types/hero';

export const BACKPACK_ITEMS: BackpackItem[] = [
  {
    "id": "healing_potion",
    "name": "Healing Potion",
    "type": "backpack",
    "effect": {
      "stats": {
        "health": 6
      },
      "source": "Healing Potion",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "description": "",
    "notes": "Sold by the Apothecary",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 56
    }
  },
  {
    "id": "speed_potion",
    "name": "Speed Potion",
    "type": "backpack",
    "effect": {
      "stats": {
        "speed": 2
      },
      "source": "Speed Potion",
      "target": "hero",
      "duration": 1
    },
    "uses": 1,
    "description": "",
    "notes": "Sold by the Apothecary",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 56
    }
  },
  {
    "id": "brawn_potion",
    "name": "Brawn Potion",
    "type": "backpack",
    "effect": {
      "stats": {
        "brawn": 2
      },
      "source": "Brawn Potion",
      "target": "hero",
      "duration": 1
    },
    "uses": 1,
    "description": "",
    "notes": "Sold by the Apothecary",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 56
    }
  },
  {
    "id": "magic_potion",
    "name": "Magic Potion",
    "type": "backpack",
    "effect": {
      "stats": {
        "magic": 2
      },
      "source": "Magic Potion",
      "target": "hero",
      "duration": 1
    },
    "uses": 1,
    "description": "",
    "notes": "Sold by the Apothecary",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 56
    }
  },
  {
    "id": "crocodile_skin",
    "name": "Crocodile Skin",
    "type": "backpack",
    "effect": {
      "stats": {},
      "source": "Crocodile Skin",
      "target": "hero",
      "duration": 0
    },
    "uses": 0,
    "description": "",
    "notes": "Dropped by the Crocodile",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 118
    }
  },
  {
    "id": "goblin_grog",
    "name": "Goblin Grog",
    "type": "backpack",
    "effect": {
      "stats": {
        "health": 4
      },
      "source": "Goblin Grog",
      "target": "hero",
      "duration": 0
    },
    "uses": 2,
    "description": "",
    "notes": "Found in Goblin loot",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 125
    }
  },
  {
    "id": "healing_salve",
    "name": "Healing Salve",
    "type": "backpack",
    "effect": {
      "stats": {
        "health": 6
      },
      "source": "Healing Salve",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "description": "",
    "notes": "Found in Goblin loot",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 125
    }
  },
  {
    "id": "miracle_grow",
    "name": "Miracle Grow",
    "type": "backpack",
    "effect": {
      "stats": {
        "brawn": 2
      },
      "source": "Miracle Grow",
      "target": "hero",
      "duration": 1
    },
    "uses": 1,
    "description": "",
    "notes": "Found in Goblin loot",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 125
    }
  },
  {
    "id": "ghoul_hair",
    "name": "Ghoul Hair",
    "type": "backpack",
    "effect": {
      "stats": {},
      "source": "Ghoul Hair",
      "target": "hero",
      "duration": 0
    },
    "uses": 0,
    "description": "",
    "notes": "Dropped by Ghouls",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 127
    }
  },
  {
    "id": "explosives_bombs",
    "name": "Explosives / Bombs",
    "type": "backpack",
    "effect": {
      "stats": {
        "damageModifier": 10
      },
      "source": "Explosives / Bombs",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "description": "",
    "notes": "Sold by the Tinker",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 175
    }
  },
  {
    "id": "spiders_leg",
    "name": "Spider's Leg",
    "type": "backpack",
    "effect": {
      "stats": {},
      "source": "Spider's Leg",
      "target": "hero",
      "duration": 0
    },
    "uses": 0,
    "description": "",
    "notes": "Dropped by Spiders",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 179
    }
  },
  {
    "id": "goblin_grog",
    "name": "Goblin Grog",
    "type": "backpack",
    "effect": {
      "stats": {
        "health": 4
      },
      "source": "Goblin Grog",
      "target": "hero",
      "duration": 0
    },
    "uses": 2,
    "description": "",
    "notes": "Found in Goblin Chief's loot",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 260
    }
  },
  {
    "id": "da_boss",
    "name": "Da Boss",
    "type": "backpack",
    "effect": {
      "stats": {
        "damageModifier": 10
      },
      "source": "Da Boss",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "description": "",
    "notes": "Sold by Sea-Spray Steve",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 432
    }
  },
  {
    "id": "spindle_silk",
    "name": "Spindle Silk",
    "type": "backpack",
    "effect": {
      "stats": {},
      "source": "Spindle Silk",
      "target": "hero",
      "duration": 0
    },
    "uses": 2,
    "description": "Perhaps a master clothier could do something with this fine silk",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 48
    }
  },
  {
    "id": "jar_of_night_creeps",
    "name": "Jar of Night Creeps",
    "type": "backpack",
    "effect": {
      "stats": {},
      "source": "Jar of Night Creeps",
      "target": "hero",
      "duration": 0
    },
    "uses": 0,
    "description": "They're slimey",
    "notes": "",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 640
    }
  },
  {
    "id": "borehole_explosives",
    "name": "Borehole Explosives",
    "type": "backpack",
    "effect": {
      "stats": {},
      "source": "Borehole Explosives",
      "target": "hero",
      "duration": 0
    },
    "uses": 0,
    "description": "Warning: Handle with Care",
    "notes": "",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 648
    }
  },
  {
    "id": "flask_of_healing",
    "name": "Flask of Healing",
    "type": "backpack",
    "effect": {
      "stats": {
        "health": 10
      },
      "source": "Flask of Healing",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "description": "",
    "notes": "Sold by Lansbury",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 697
    }
  },
  {
    "id": "elixir_of_swiftness",
    "name": "Elixir of Swiftness",
    "type": "backpack",
    "effect": {
      "stats": {
        "speed": 4
      },
      "source": "Elixir of Swiftness",
      "target": "hero",
      "duration": 1
    },
    "uses": 1,
    "description": "",
    "notes": "Sold by Lansbury",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 697
    }
  },
  {
    "id": "pot_of_mending",
    "name": "Pot of Mending",
    "type": "backpack",
    "effect": {
      "stats": {
        "health": 12
      },
      "source": "Pot of Mending",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "description": "",
    "notes": "Found",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 724
    }
  },
  {
    "id": "pot_of_mending",
    "name": "Pot of Mending",
    "type": "backpack",
    "effect": {
      "stats": {
        "health": 12
      },
      "source": "Pot of Mending",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "description": "",
    "notes": "Found",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 726
    }
  },
  {
    "id": "elixir_of_life",
    "name": "Elixir of Life",
    "type": "backpack",
    "effect": {
      "stats": {
        "health": -1
      },
      "source": "Elixir of Life",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "description": "",
    "notes": "Found",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 776
    }
  },
  {
    "id": "fluffy_dice",
    "name": "Fluffy dice",
    "type": "backpack",
    "effect": {
      "stats": {},
      "source": "Fluffy dice",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "description": "The ultimate in backpack accessories",
    "notes": "Found",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 776
    }
  },
  {
    "id": "scarron_bile",
    "name": "Scarron bile",
    "type": "backpack",
    "effect": {
      "stats": {},
      "source": "Scarron bile",
      "target": "hero",
      "duration": 0
    },
    "uses": 2,
    "description": "It smells bad. Very bad.",
    "notes": "Dropped by Scarrons",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 785
    }
  },
  {
    "id": "spirit_tincture",
    "name": "Spirit Tincture",
    "type": "backpack",
    "effect": {
      "stats": {
        "health": -4,
        "brawn": 2,
        "magic": 2
      },
      "source": "Spirit Tincture",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "description": "",
    "notes": "Dropped by Ghasts",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 794
    }
  },
  {
    "id": "ghoolish_gloup",
    "name": "Ghoolish Gloup",
    "type": "backpack",
    "effect": {
      "stats": {
        "armour": 2
      },
      "source": "Ghoolish Gloup",
      "target": "hero",
      "duration": 0
    },
    "uses": 2,
    "description": "",
    "notes": "Dropped by Mages",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 1,
      "section": 802
    }
  },
  {
    "id": "arthurians_horn",
    "name": "Arthurian's Horn",
    "type": "backpack",
    "effect": {
      "stats": {
        "damageModifier": 20
      },
      "source": "Arthurian's Horn",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "description": "",
    "notes": "Dropped by Necromancers",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 808
    }
  },
  {
    "id": "oil_flask",
    "name": "Oil flask",
    "type": "backpack",
    "effect": {
      "stats": {
        "damageModifier": 0
      },
      "source": "Oil flask",
      "target": "hero",
      "duration": 0
    },
    "uses": 2,
    "description": "",
    "notes": "",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 827
    }
  },
  {
    "id": "portable_shield",
    "name": "Portable Shield",
    "type": "backpack",
    "effect": {
      "stats": {
        "damageModifier": -10
      },
      "source": "Portable Shield",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "description": "",
    "notes": "",
    "bookRef": {
      "book": "The Legion of Shadow",
      "act": 3,
      "section": 890
    }
  },
  {
    "id": "trolls_bones",
    "name": "Troll's bones",
    "type": "backpack",
    "effect": {
      "stats": {},
      "source": "Troll's bones",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "description": "These might prove valuable to the right person",
    "notes": "",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 43
    }
  },
  {
    "id": "pot_of_healing",
    "name": "Pot of healing",
    "type": "backpack",
    "effect": {
      "stats": {
        "health": 4
      },
      "source": "Pot of healing",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "description": "",
    "notes": "Donated by Benin",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 69
    }
  },
  {
    "id": "flask_of_healing",
    "name": "Flask of healing",
    "type": "backpack",
    "effect": {
      "stats": {
        "health": 6
      },
      "source": "Flask of healing",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "description": "",
    "notes": "Donated by Benin",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 69
    }
  },
  {
    "id": "pot_of_magic",
    "name": "Pot of magic",
    "type": "backpack",
    "effect": {
      "stats": {
        "magic": 2
      },
      "source": "Pot of magic",
      "target": "hero",
      "duration": 1
    },
    "uses": 1,
    "description": "",
    "notes": "Donated by Benin",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 69
    }
  },
  {
    "id": "book_of_binding",
    "name": "Book of binding",
    "type": "backpack",
    "effect": {
      "stats": {},
      "source": "Book of binding",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "description": "This ancient tome might prove useful in the future",
    "notes": "Deciphered",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 81
    }
  },
  {
    "id": "unknown_elixir",
    "name": "Unknown elixir",
    "type": "backpack",
    "effect": {
      "stats": {},
      "source": "Unknown elixir",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "description": "This could be the miraclecure that Eldias needs",
    "notes": "Brewn",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 83
    }
  },
  {
    "id": "healing_salve",
    "name": "Healing salve",
    "type": "backpack",
    "effect": {
      "stats": {
        "health": 2
      },
      "source": "Healing salve",
      "target": "hero"
    },
    "uses": 2,
    "description": "",
    "notes": "",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 88
    }
  },
  {
    "id": "elixir_of_life",
    "name": "Elixir of life",
    "type": "backpack",
    "effect": {
      "stats": {
        "health": -1
      },
      "source": "Elixir of life",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "description": "",
    "notes": "",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 88
    }
  },
  {
    "id": "pot_of_healing",
    "name": "Pot of healing",
    "type": "backpack",
    "effect": {
      "stats": {
        "health": 4
      },
      "source": "Pot of healing",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "description": "",
    "notes": "",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 120
    }
  },
  {
    "id": "pot_of_brawn",
    "name": "Pot of brawn",
    "type": "backpack",
    "effect": {
      "stats": {
        "brawn": 2
      },
      "source": "Pot of brawn",
      "target": "hero",
      "duration": 1
    },
    "uses": 1,
    "description": "",
    "notes": "",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 120
    }
  },
  {
    "id": "pot_of_magic",
    "name": "Pot of magic",
    "type": "backpack",
    "effect": {
      "stats": {
        "magic": 2
      },
      "source": "Pot of magic",
      "target": "hero",
      "duration": 1
    },
    "uses": 1,
    "description": "",
    "notes": "",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 120
    }
  },
  {
    "id": "goblin_bones",
    "name": "Goblin bones",
    "type": "backpack",
    "effect": {
      "stats": {},
      "source": "Goblin bones",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "description": "These might prove valuable to the right person",
    "notes": "",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 164
    }
  },
  {
    "id": "pot_of_speed",
    "name": "Pot of speed",
    "type": "backpack",
    "effect": {
      "stats": {
        "speed": 2
      },
      "source": "Pot of speed",
      "target": "hero",
      "duration": 1
    },
    "uses": 1,
    "description": "",
    "notes": "2",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 164
    }
  },
  {
    "id": "glyph_of_power",
    "name": "Glyph of Power",
    "type": "backpack",
    "effect": {
      "stats": {
        "magic": 1
      },
      "source": "Glyph of Power",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "description": "Use on any item to add 1 magic",
    "notes": "",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 176
    }
  },
  {
    "id": "rune_of_healing",
    "name": "Rune of Healing",
    "type": "backpack",
    "effect": {
      "stats": {},
      "source": "Rune of Healing",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "description": "Use on any item to add Heal ability",
    "notes": "",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 176
    }
  },
  {
    "id": "borehole_charge",
    "name": "Borehole Charge",
    "type": "backpack",
    "effect": {
      "stats": {},
      "source": "Borehole Charge",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "description": "The writing on the side states: Handle with care",
    "notes": "",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 189
    }
  },
  {
    "id": "pumpkin_squash",
    "name": "Pumpkin Squash",
    "type": "backpack",
    "effect": {
      "stats": {
        "brawn": 1,
        "magic": 1
      },
      "source": "Pumpkin Squash",
      "target": "hero",
      "duration": 1
    },
    "uses": 2,
    "description": "",
    "notes": "",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 201
    }
  },
  {
    "id": "goblin_bones",
    "name": "Goblin bones",
    "type": "backpack",
    "effect": {
      "stats": {},
      "source": "Goblin bones",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "description": "These might prove valuable to the right person",
    "notes": "",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 205
    }
  },
  {
    "id": "giant_bones",
    "name": "Giant bones",
    "type": "backpack",
    "effect": {
      "stats": {},
      "source": "Giant bones",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "description": "These might prove valuable to the right person",
    "notes": "",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 234
    }
  },
  {
    "id": "book_of_alpha",
    "name": "Book of Alpha",
    "type": "backpack",
    "effect": {
      "stats": {},
      "source": "Book of Alpha",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "description": "An ancient Lamuri spell book",
    "notes": "Found in Temple",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 239
    }
  },
  {
    "id": "goblin_bones",
    "name": "Goblin bones",
    "type": "backpack",
    "effect": {
      "stats": {},
      "source": "Goblin bones",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "description": "These might prove valuable to the right person",
    "notes": "",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 258
    }
  },
  {
    "id": "goblin_bones",
    "name": "Goblin bones",
    "type": "backpack",
    "effect": {
      "stats": {},
      "source": "Goblin bones",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "description": "These might prove valuable to the right person",
    "notes": "",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 292
    }
  },
  {
    "id": "a_bottle_of_wisps",
    "name": "A bottle of wisps",
    "type": "backpack",
    "effect": {
      "stats": {},
      "source": "A bottle of wisps",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "description": "Tiny glowing lights are trapped inside",
    "notes": "",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 318
    }
  },
  {
    "id": "goblin_bones",
    "name": "Goblin bones",
    "type": "backpack",
    "effect": {
      "stats": {},
      "source": "Goblin bones",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "description": "These might prove valuable to the right person",
    "notes": "",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 336
    }
  },
  {
    "id": "sanctified_ashes",
    "name": "Sanctified ashes",
    "type": "backpack",
    "effect": {
      "stats": {},
      "source": "Sanctified ashes",
      "target": "hero",
      "duration": 0
    },
    "uses": 2,
    "description": "",
    "notes": "",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 340
    }
  },
  {
    "id": "holy_water",
    "name": "Holy water",
    "type": "backpack",
    "effect": {
      "stats": {
        "damageModifier": 2
      },
      "source": "Holy water",
      "target": "hero",
      "duration": 0
    },
    "uses": 2,
    "description": "",
    "notes": "",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 340
    }
  },
  {
    "id": "angelica_wreath",
    "name": "Angelica wreath",
    "type": "backpack",
    "effect": {
      "stats": {},
      "source": "Angelica wreath",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "description": "",
    "notes": "",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 340
    }
  },
  {
    "id": "borehole_charge",
    "name": "Borehole Charge",
    "type": "backpack",
    "effect": {
      "stats": {},
      "source": "Borehole Charge",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "description": "The writing on the side states: Handle with care",
    "notes": "",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 345
    }
  },
  {
    "id": "might_monster_metal",
    "name": "Might monster metal",
    "type": "backpack",
    "effect": {
      "stats": {
        "armour": 1
      },
      "source": "Might monster metal",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "description": "",
    "notes": "",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 349
    }
  },
  {
    "id": "putrid_pixie_puke",
    "name": "Putrid pixie puke",
    "type": "backpack",
    "effect": {
      "stats": {
        "magic": 1
      },
      "source": "Putrid pixie puke",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "description": "",
    "notes": "",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 349
    }
  },
  {
    "id": "slimy_stringy_snot",
    "name": "Slimy stringy snot",
    "type": "backpack",
    "effect": {
      "stats": {
        "brawn": 1
      },
      "source": "Slimy stringy snot",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "description": "",
    "notes": "",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 349
    }
  },
  {
    "id": "coat_of_many_scales",
    "name": "Coat of many scales",
    "type": "backpack",
    "effect": {
      "stats": {},
      "source": "Coat of many scales",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "description": "A dazzling coat made of basilisk scales",
    "notes": "",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 367
    }
  },
  {
    "id": "pot_of_speed",
    "name": "Pot of speed",
    "type": "backpack",
    "effect": {
      "stats": {
        "speed": 2
      },
      "source": "Pot of speed",
      "target": "hero",
      "duration": 1
    },
    "uses": 2,
    "description": "",
    "notes": "",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 367
    }
  },
  {
    "id": "saints_blessing",
    "name": "Saints blessing",
    "type": "backpack",
    "effect": {
      "stats": {
        "health": -1
      },
      "source": "Saints blessing",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "description": "",
    "notes": "",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 368
    }
  },
  {
    "id": "runed_rod",
    "name": "Runed rod",
    "type": "backpack",
    "effect": {
      "stats": {},
      "source": "Runed rod",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "description": "A splintered length of black metal",
    "notes": "",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 377
    }
  },
  {
    "id": "mothers_medicine",
    "name": "Mother's medicine",
    "type": "backpack",
    "effect": {
      "stats": {
        "health": 4
      },
      "source": "Mother's medicine",
      "target": "hero",
      "duration": 0
    },
    "uses": 2,
    "description": "",
    "notes": "",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 425
    }
  },
  {
    "id": "jacobs_special_mix",
    "name": "Jacob's special mix",
    "type": "backpack",
    "effect": {
      "stats": {
        "speed": 1
      },
      "source": "Jacob's special mix",
      "target": "hero",
      "duration": 1
    },
    "uses": 2,
    "description": "",
    "notes": "",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 425
    }
  },
  {
    "id": "secret_brew",
    "name": "Secret brew",
    "type": "backpack",
    "effect": {
      "stats": {
        "brawn": 2
      },
      "source": "Secret brew",
      "target": "hero",
      "duration": 1
    },
    "uses": 1,
    "description": "",
    "notes": "",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 425
    }
  },
  {
    "id": "snakebite_shake",
    "name": "Snakebite shake",
    "type": "backpack",
    "effect": {
      "stats": {},
      "conditions": {
        "remove": [
          "venom"
        ]
      },
      "source": "Snakebite shake",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "description": "",
    "notes": "",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 2,
      "section": 433
    }
  },
  {
    "id": "gourd_of_healing",
    "name": "Gourd of healing",
    "type": "backpack",
    "effect": {
      "stats": {
        "health": 6
      },
      "source": "Gourd of healing",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "description": "",
    "notes": "",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 433
    }
  },
  {
    "id": "elixir_of_invisibility",
    "name": "Elixir of invisibility",
    "type": "backpack",
    "effect": {
      "stats": {},
      "source": "Elixir of invisibility",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "description": "",
    "notes": "",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 433
    }
  },
  {
    "id": "",
    "name": "",
    "type": "backpack",
    "effect": {
      "stats": {},
      "source": "",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "description": "",
    "notes": "",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 201
    }
  },
  {
    "id": "",
    "name": "",
    "type": "backpack",
    "effect": {
      "stats": {},
      "source": "",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "description": "",
    "notes": "",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 201
    }
  },
  {
    "id": "",
    "name": "",
    "type": "backpack",
    "effect": {
      "stats": {},
      "source": "",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "description": "",
    "notes": "",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 201
    }
  },
  {
    "id": "",
    "name": "",
    "type": "backpack",
    "effect": {
      "stats": {},
      "source": "",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "description": "",
    "notes": "",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 201
    }
  },
  {
    "id": "",
    "name": "",
    "type": "backpack",
    "effect": {
      "stats": {},
      "source": "",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "description": "",
    "notes": "",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 201
    }
  },
  {
    "id": "",
    "name": "",
    "type": "backpack",
    "effect": {
      "stats": {},
      "source": "",
      "target": "hero",
      "duration": 0
    },
    "uses": 1,
    "description": "",
    "notes": "",
    "bookRef": {
      "book": "The Heart of Fire",
      "act": 1,
      "section": 201
    }
  }
];

