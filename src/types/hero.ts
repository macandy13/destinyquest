import { Stats } from './stats';

export interface HeroStats extends Stats { }

export type EquipmentSlot =
    | 'head' | 'cloak' | 'chest' | 'gloves'
    | 'mainHand' | 'leftHand' | 'talisman'
    | 'feet' | 'necklace' | 'ring1' | 'ring2';

export type EquipmentType =
    | 'head' | 'cloak' | 'chest' | 'gloves'
    | 'mainHand' | 'leftHand' | 'talisman'
    | 'feet' | 'necklace' | 'ring';

export interface EquipmentItem {
    id: string;
    name: string;
    type: EquipmentType; // The type of item (e.g., 'ring')
    act: number;
    cost?: number; // Cost in gold (if applicable)
    careerPreference?: HeroPath; // W/M/R requirement
    description?: string;
    stats?: Partial<HeroStats>;
    abilities?: string[];
    entry?: string; // Entry number (e.g., "123")
    location?: string; // Location or enemy where found
}

export type HeroPath = '' | 'Warrior' | 'Mage' | 'Rogue';

export interface Item {
    name: string;
}

export interface Hero {
    name: string;
    path: HeroPath;
    career: string;
    stats: HeroStats;
    equipment: Partial<Record<EquipmentSlot, EquipmentItem>>;
    backpack: Item[];
    money: number;
}

export const INITIAL_HERO: Hero = {
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
    backpack: [],
    money: 0
};
