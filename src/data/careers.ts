import { HeroPath } from '../types/hero';

export interface Career {
    name: string;
    path: HeroPath;
    abilities: string[];
}

export const CAREERS: Career[] = [
    // Warrior Careers
    {
        name: 'Gladiator',
        path: 'Warrior',
        abilities: ['Blood Rage', 'Head Butt']
    }, {
        name: 'Berserker',
        path: 'Warrior',
        abilities: ['Seeing Red', 'Raining Blows']
    }, {
        name: 'Ranger',
        path: 'Warrior',
        abilities: ['Lay of the Land', 'Nature\'s Revenge']
    }, {
        name: 'Cavalier',
        path: 'Warrior',
        abilities: ['Shield Spind', 'Shield Wall']
    }, {
        name: 'Shadow Ranger',
        path: 'Warrior',
        abilities: ['Black Rain', 'Thorn Fist']
    }, {
        name: 'Inquisitor',
        path: 'Warrior',
        abilities: ['Cleansing Light', 'Avenging Spirit']
    },
    // Mage Careers
    {
        name: 'Alchemist',
        path: 'Mage',
        abilities: ['Good Taste', 'Midas Touch']
    }, {
        name: 'Pyromancer',
        path: 'Mage',
        abilities: ['Ignite', 'Burn']
    }, {
        name: 'Medic',
        path: 'Mage',
        abilities: ['Mend', 'Torniquet']
    }, {
        name: 'Icelock',
        path: 'Mage',
        abilities: ['Ice Shards', 'Ice Shield']
    }, {
        name: 'Necromancer',
        path: 'Mage',
        abilities: ['Shades', 'Sacrifice']
    },
    // Rogue Careers
    {
        name: 'Pickpocket',
        path: 'Rogue',
        abilities: ['Patchwork Pauper', 'Loot Master']
    }, {
        name: 'Assassin',
        path: 'Rogue',
        abilities: ['First Strike', 'Deadly Poisons']
    }, {
        name: 'Shadowstalker',
        path: 'Rogue',
        abilities: ['Shadow Speed', 'Shadow Fury']
    }, {
        name: 'Swordsmaster',
        path: 'Rogue',
        abilities: ['Swift Strikes', 'Ambidextrous']
    }
];

export function getCareersForPath(path: HeroPath): Career[] {
    return CAREERS.filter(c => c.path === path);
}

export function getCareer(name: string): Career | undefined {
    return CAREERS.find(c => c.name === name);
}
