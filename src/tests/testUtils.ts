import { vi } from 'vitest';
import { BookRef } from '../types/book';
import { Character } from '../types/character';
import { CombatState, Enemy } from '../types/combat';
import { Combatant } from '../types/combatant';
import { BackpackItem, EquipmentItem, Hero } from '../types/hero';

export const MOCK_HERO: Hero = {
    type: 'hero',
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
    type: 'enemy',
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

const HERO_COMBATANT: Combatant<Hero> = {
    type: 'hero',
    id: 'hero',
    name: MOCK_HERO.name,
    stats: { ...MOCK_HERO.stats },
    original: MOCK_HERO
};

const ENEMY_COMBATANT: Combatant<Enemy> = {
    type: 'enemy',
    id: 'enemy',
    name: MOCK_ENEMY.name,
    stats: { ...MOCK_ENEMY.stats },
    original: MOCK_ENEMY
};

// Generic mock state for ability testing
export const INITIAL_STATE: CombatState = {
    hero: HERO_COMBATANT,
    enemy: ENEMY_COMBATANT,
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
    return createCombatant(hero) as Combatant<Hero>;
};

export function testEquipment(stats: Partial<EquipmentItem>): EquipmentItem {
    return {
        id: stats.name?.toLowerCase().replaceAll(' ', '-') || 'test-equipment',
        type: 'cloak',
        name: 'Test Equipment',
        abilities: [],
        bookRef: TEST_BOOK,
        ...stats
    };
};

export function testBackpackItem(stats: Partial<BackpackItem>): BackpackItem {
    return {
        id: stats.name?.toLowerCase().replaceAll(' ', '-') || 'test-backpack-item',
        type: 'backpack',
        name: 'Test Backpack Item',
        bookRef: TEST_BOOK,
        ...stats
    };
}

export const enemyWithStats = (stats: Partial<Enemy['stats']> = {}): Combatant<Enemy> => {
    const enemy = {
        ...MOCK_ENEMY,
        stats: {
            ...MOCK_ENEMY.stats,
            ...stats
        }
    };
    return createCombatant(enemy) as Combatant<Enemy>;
};

export function createCombatant(char: Character): Combatant<Character> {
    return {
        id: char.name.replace(' ', '-').toLowerCase(),
        type: char.type,
        name: char.name,
        stats: { ...char.stats },
        original: char
    };
}

export function mockDiceRolls(rolls: number[]) {
    const rollValues = rolls.map(r => (r - 1) / 6);
    vi.spyOn(Math, 'random').mockImplementation(() => rollValues.shift()!);
}
