import { Enemy } from '../types/combat';

export const ENEMIES: (Enemy & { act: number; entry: string })[] = [
  {
    "name": "Ruffians",
    "speed": 3,
    "brawn": 2,
    "magic": 0,
    "armour": 0,
    "health": 15,
    "maxHealth": 15,
    "abilities": [],
    "act": 1,
    "entry": "40"
  },
  {
    "name": "Mauler",
    "speed": 5,
    "brawn": 4,
    "magic": 0,
    "armour": 0,
    "health": 25,
    "maxHealth": 25,
    "abilities": [
      "Savagery"
    ],
    "act": 1,
    "entry": "26"
  },
  {
    "name": "Zombie",
    "speed": 2,
    "brawn": 4,
    "magic": 0,
    "armour": 0,
    "health": 20,
    "maxHealth": 20,
    "abilities": [
      "Undead"
    ],
    "act": 1,
    "entry": "68"
  },
  {
    "name": "Spindlesilk",
    "speed": 7,
    "brawn": 5,
    "magic": 0,
    "armour": 1,
    "health": 35,
    "maxHealth": 35,
    "abilities": [
      "Webbed"
    ],
    "act": 1,
    "entry": "132"
  },
  {
    "name": "The Witch (Hag)",
    "speed": 4,
    "brawn": 0,
    "magic": 5,
    "armour": 0,
    "health": 20,
    "maxHealth": 20,
    "abilities": [
      "Charm"
    ],
    "act": 1,
    "entry": "155"
  },
  {
    "name": "Valadin Roth",
    "speed": 6,
    "brawn": 6,
    "magic": 0,
    "armour": 1,
    "health": 40,
    "maxHealth": 40,
    "abilities": [
      "Boss"
    ],
    "act": 1,
    "entry": "160"
  },
  {
    "name": "Ratling",
    "speed": 4,
    "brawn": 3,
    "magic": 0,
    "armour": 0,
    "health": 18,
    "maxHealth": 18,
    "abilities": [
      "Tail Lash"
    ],
    "act": 1,
    "entry": "233"
  },
  {
    "name": "Goblin Chieftain",
    "speed": 5,
    "brawn": 5,
    "magic": 0,
    "armour": 2,
    "health": 30,
    "maxHealth": 30,
    "abilities": [
      "Command"
    ],
    "act": 1,
    "entry": "260"
  },
  {
    "name": "Trog Spearman",
    "speed": 5,
    "brawn": 6,
    "magic": 0,
    "armour": 1,
    "health": 25,
    "maxHealth": 25,
    "abilities": [
      "Impale"
    ],
    "act": 1,
    "entry": "327"
  },
  {
    "name": "Mud Golem",
    "speed": 4,
    "brawn": 7,
    "magic": 0,
    "armour": 3,
    "health": 50,
    "maxHealth": 50,
    "abilities": [
      "Body of Stone"
    ],
    "act": 2,
    "entry": "283"
  },
  {
    "name": "Logan",
    "speed": 10,
    "brawn": 9,
    "magic": 0,
    "armour": 2,
    "health": 50,
    "maxHealth": 50,
    "abilities": [
      "Legendary"
    ],
    "act": 2,
    "entry": "313"
  },
  {
    "name": "Hive Queen",
    "speed": 8,
    "brawn": 0,
    "magic": 8,
    "armour": 2,
    "health": 65,
    "maxHealth": 65,
    "abilities": [
      "Infest"
    ],
    "act": 2,
    "entry": "314"
  },
  {
    "name": "King Louis",
    "speed": 8,
    "brawn": 9,
    "magic": 0,
    "armour": 2,
    "health": 55,
    "maxHealth": 55,
    "abilities": [
      "Agility"
    ],
    "act": 2,
    "entry": "359"
  },
  {
    "name": "Vesuvius",
    "speed": 7,
    "brawn": 0,
    "magic": 11,
    "armour": 2,
    "health": 60,
    "maxHealth": 60,
    "abilities": [
      "Sear"
    ],
    "act": 2,
    "entry": "377"
  },
  {
    "name": "Nalsa",
    "speed": 9,
    "brawn": 9,
    "magic": 0,
    "armour": 2,
    "health": 55,
    "maxHealth": 55,
    "abilities": [
      "Roar"
    ],
    "act": 2,
    "entry": "379"
  },
  {
    "name": "Zen",
    "speed": 9,
    "brawn": 10,
    "magic": 0,
    "armour": 3,
    "health": 65,
    "maxHealth": 65,
    "abilities": [
      "Counter"
    ],
    "act": 2,
    "entry": "382"
  },
  {
    "name": "Baron Greyloc",
    "speed": 10,
    "brawn": 12,
    "magic": 0,
    "armour": 4,
    "health": 80,
    "maxHealth": 80,
    "abilities": [
      "Legendary"
    ],
    "act": 2,
    "entry": "385"
  },
  {
    "name": "Shara Khana",
    "speed": 10,
    "brawn": 11,
    "magic": 0,
    "armour": 2,
    "health": 70,
    "maxHealth": 70,
    "abilities": [
      "Swift"
    ],
    "act": 2,
    "entry": "386"
  },
  {
    "name": "Stone Giant",
    "speed": 5,
    "brawn": 11,
    "magic": 0,
    "armour": 8,
    "health": 75,
    "maxHealth": 75,
    "abilities": [
      "Body of Rock"
    ],
    "act": 2,
    "entry": "443"
  },
  {
    "name": "The Count",
    "speed": 9,
    "brawn": 10,
    "magic": 0,
    "armour": 3,
    "health": 60,
    "maxHealth": 60,
    "abilities": [
      "Feint"
    ],
    "act": 2,
    "entry": "487"
  },
  {
    "name": "Swamp Giant",
    "speed": 6,
    "brawn": 10,
    "magic": 0,
    "armour": 7,
    "health": 70,
    "maxHealth": 70,
    "abilities": [
      "Knockdown"
    ],
    "act": 2,
    "entry": "509"
  },
  {
    "name": "Phoenix",
    "speed": 9,
    "brawn": 0,
    "magic": 10,
    "armour": 1,
    "health": 60,
    "maxHealth": 60,
    "abilities": [
      "Fire Aura"
    ],
    "act": 2,
    "entry": "565"
  },
  {
    "name": "Kindle",
    "speed": 12,
    "brawn": 11,
    "magic": 0,
    "armour": 9,
    "health": 90,
    "maxHealth": 90,
    "abilities": [
      "Haste"
    ],
    "act": 3,
    "entry": "454"
  },
  {
    "name": "Grindle",
    "speed": 10,
    "brawn": 12,
    "magic": 0,
    "armour": 5,
    "health": 85,
    "maxHealth": 85,
    "abilities": [
      "Dragonscale"
    ],
    "act": 3,
    "entry": "708"
  },
  {
    "name": "Magmageddon",
    "speed": 11,
    "brawn": 12,
    "magic": 12,
    "armour": 10,
    "health": 100,
    "maxHealth": 100,
    "abilities": [
      "Hybrid"
    ],
    "act": 3,
    "entry": "738"
  },
  {
    "name": "Sharroth",
    "speed": 12,
    "brawn": 15,
    "magic": 15,
    "armour": 6,
    "health": 150,
    "maxHealth": 150,
    "abilities": [
      "Final Boss"
    ],
    "act": 3,
    "entry": "782"
  }
];
