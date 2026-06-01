import { HeroPath } from '../types/hero';
import { BookRef } from '../types/bookRef';

export interface Career {
    name: string;
    path: HeroPath;
    abilities: string[];
    bookRef?: BookRef;
}

export const CAREERS: Career[] = [
    // Warrior Careers
    {
        name: 'Gladiator',
        path: 'Warrior',
        abilities: ['Blood Rage', 'Head Butt'],
        bookRef: {
            book: 'The Legion of Shadow',
            act: 2,
            section: 307
        }
    }, {
        name: 'Berserker',
        path: 'Warrior',
        abilities: ['Seeing Red', 'Raining Blows'],
        bookRef: {
            book: 'The Legion of Shadow',
            act: 2,
            section: 398
        }
    }, {
        name: 'Ranger',
        path: 'Warrior',
        abilities: ['Lay of the Land', 'Nature's Revenge'],
        bookRef: {
            book: 'The Legion of Shadow',
            act: 2,
            section: 417
        }
    }, {
        name: 'Cavalier',
        path: 'Warrior',
        abilities: ['Shield Spind', 'Shield Wall'],
        bookRef: {
            book: 'The Legion of Shadow',
            act: 3,
            section: 634
        }
    }, {
        name: 'Shadow Ranger',
        path: 'Warrior',
        abilities: ['Black Rain', 'Thorn Fist'],
        bookRef: {
            book: 'The Legion of Shadow',
            act: 3,
            section: 814
        }
    }, {
        name: 'Inquisitor',
        path: 'Warrior',
        abilities: ['Cleansing Light', 'Avenging Spirit'],
        bookRef: {
            book: 'The Legion of Shadow',
            act: 3,
            section: 668
        }
    },
    // Mage Careers
    {
        name: 'Alchemist',
        path: 'Mage',
        abilities: ['Good Taste', 'Midas Touch'],
        bookRef: {
            book: 'The Legion of Shadow',
            act: 2,
            section: 401
        }
    }, {
        name: 'Pyromancer',
        path: 'Mage',
        abilities: ['Ignite', 'Burn'],
        bookRef: {
            book: 'The Legion of Shadow',
            act: 2,
            section: 407
        }
    }, {
        name: 'Medic',
        path: 'Mage',
        abilities: ['Mend', 'Torniquet'],
        bookRef: {
            book: 'The Legion of Shadow',
            act: 3,
            section: 680
        }
    }, {
        name: 'Icelock',
        path: 'Mage',
        abilities: ['Ice Shards', 'Ice Shield'],
        bookRef: {
            book: 'The Legion of Shadow',
            act: 3,
            section: 761
        }
    }, {
        name: 'Necromancer',
        path: 'Mage',
        abilities: ['Shades', 'Sacrifice'],
        bookRef: {
            book: 'The Legion of Shadow',
            act: 3,
            section: 850
        }
    },
    // Rogue Careers
    {
        name: 'Pickpocket',
        path: 'Rogue',
        abilities: ['Patchwork Pauper', 'Loot Master'],
        bookRef: {
            book: 'The Legion of Shadow',
            act: 2,
            section: 369
        }
    }, {
        name: 'Assassin',
        path: 'Rogue',
        abilities: ['First Strike', 'Deadly Poisons'],
        bookRef: {
            book: 'The Legion of Shadow',
            act: 2,
            section: 410
        }
    }, {
        name: 'Shadowstalker',
        path: 'Rogue',
        abilities: ['Shadow Speed', 'Shadow Fury'],
        bookRef: {
            book: 'The Legion of Shadow',
            act: 2,
            section: 586
        }
    }, {
        name: 'Swordsmaster',
        path: 'Rogue',
        abilities: ['Swift Strikes', 'Ambidextrous'],
        bookRef: {
            book: 'The Legion of Shadow',
            act: 3,
            section: 611
        }
    }
];

export function getCareersForPath(path: HeroPath): Career[] {
    return CAREERS.filter(c => c.path === path);
}

export function getCareer(name: string): Career | undefined {
    return CAREERS.find(c => c.name === name);
}
