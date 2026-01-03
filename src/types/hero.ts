import { Stats } from './Stats';
import { Character } from './Character';
import { BookRef } from './BookRef';
import { Effect } from './Effect';

export interface HeroStats extends Stats { }

export type EquipmentSlot =
    | 'head' | 'cloak' | 'chest' | 'gloves'
    | 'mainHand' | 'leftHand' | 'talisman'
    | 'feet' | 'necklace' | 'ring1' | 'ring2';

export type EquipmentType =
    | 'head' | 'cloak' | 'chest' | 'gloves'
    | 'mainHand' | 'leftHand' | 'talisman'
    | 'feet' | 'necklace' | 'ring';

export interface Item {
    id: string;
    name: string;
    bookRef: BookRef;
    location?: string;
}

export interface EquipmentItem extends Item {
    type: EquipmentType; // The type of item (e.g., 'ring')
    cost?: number; // Cost in gold (if applicable)
    careerPreference?: HeroPath; // W/M/R requirement
    description?: string;
    stats?: Partial<HeroStats>;
    abilities?: string[];
}

export type HeroPath = '' | 'Warrior' | 'Mage' | 'Rogue';

export interface BackpackItem extends Item {
    type: 'backpack';
    description: string; // Full modifier string (e.g. "+2 speed")
    effect: Effect;
    notes?: string;
    uses?: number;
}

export interface Hero extends Character {
    name: string;
    path: HeroPath;
    career: string;
    stats: HeroStats;
    equipment: Partial<Record<EquipmentSlot, EquipmentItem>>;
    backpack: (BackpackItem | null)[];
    money: number;
}

export const INITIAL_HERO: Hero = {
    type: 'hero',
    name: 'New Hero',
    path: '',
    career: '',
    stats: {
        speed: 0,
        brawn: 0,
        magic: 0,
        armour: 0,
        health: 30,
        maxHealth: 30
    },
    equipment: {},
    backpack: [null, null, null, null, null],
    money: 0
};
