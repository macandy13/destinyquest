import { BookRef } from '../types/book';
import { CombatState, Enemy } from '../types/combat';
import { Combatant } from '../types/combatant';
import { EquipmentItem, Hero } from '../types/hero';

export const MOCK_HERO: Hero = {
    name: 'Test Hero',
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

export const TEST_BOOK: BookRef = {
    book: 'Test',
    act: 99
};

export const MOCK_ENEMY: Enemy = {
    name: 'Test Enemy',
    stats: {
        speed: 0,
        brawn: 0,
        magic: 0,
        armour: 0,
        health: 20,
        maxHealth: 20,
    },
    bookRef: TEST_BOOK,
    abilities: []
};

const heroCombatant: Combatant<Hero> = {
    type: 'hero',
    id: 'hero',
    name: MOCK_HERO.name,
    stats: { ...MOCK_HERO.stats },
    original: MOCK_HERO
};

const enemyCombatant: Combatant<Enemy> = {
    type: 'enemy',
    id: 'enemy',
    name: MOCK_ENEMY.name,
    stats: { ...MOCK_ENEMY.stats },
    original: MOCK_ENEMY
};

// Generic mock state for ability testing
export const INITIAL_STATE: CombatState = {
    hero: heroCombatant,
    enemy: enemyCombatant,
    round: 1,
    phase: 'combat-start',
    heroSpeedRolls: undefined,
    enemySpeedRolls: undefined,
    damageRolls: undefined,
    winner: null,
    activeAbilities: [],
    modifications: [],
    backpack: [],
    logs: [],
    damageDealt: [],
    activeEffects: []
};

export const heroWithStats = (stats: Partial<Hero['stats']>): Combatant<Hero> => {
    const hero = {
        ...MOCK_HERO,
        stats: {
            ...MOCK_HERO.stats,
            ...stats
        }
    };
    return {
        type: 'hero',
        id: 'hero',
        name: hero.name,
        stats: { ...hero.stats },
        original: hero
    };
};


export const testEquipment = (stats: Partial<EquipmentItem>): EquipmentItem => {
    return {
        id: stats.name?.toLowerCase().replaceAll(' ', '-') || 'test-equipment',
        type: 'cloak',
        name: 'Test Equipment',
        abilities: [],
        bookRef: TEST_BOOK,
        ...stats
    };
};

export const createHeroCombatant = heroWithStats;

export const createEnemyCombatant = (stats: Partial<Enemy['stats']> = {}): Combatant<Enemy> => {
    const enemy = {
        ...MOCK_ENEMY,
        stats: {
            ...MOCK_ENEMY.stats,
            ...stats
        }
    };
    return {
        type: 'enemy',
        id: 'enemy',
        name: enemy.name,
        stats: { ...enemy.stats },
        original: enemy
    };
};
