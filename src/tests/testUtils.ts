import { vi } from 'vitest';
import { BookRef } from '../types/bookRef';
import { CombatState, Combatant } from '../types/combatState';
import { DiceRoll } from '../types/dice';
import { BackpackItem, EquipmentItem, Hero } from '../types/hero';
import { Enemy } from '../types/character';
import { AbilityDefinition, getAbilityDefinition, toCanonicalName } from '../mechanics/abilityRegistry';

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

const HERO_COMBATANT: Combatant<Hero> = createCombatant(MOCK_HERO);

const ENEMY_COMBATANT: Combatant<Enemy> = createCombatant(MOCK_ENEMY);

// Generic mock state for ability testing
export const INITIAL_STATE: CombatState = {
    hero: HERO_COMBATANT,
    enemy: ENEMY_COMBATANT,
    round: 0,
    phase: 'combat-start',
    logs: [],
    heroSpeedRolls: undefined,
    enemySpeedRolls: undefined,
    damage: undefined,
    damageDealt: [],
    winner: undefined,
    backpack: [],
};

export const heroWithStats = (stats: Partial<Hero['stats']>): Combatant<Hero> => {
    const hero = {
        ...MOCK_HERO,
        stats: {
            ...MOCK_HERO.stats,
            ...stats
        },
        equipment: { ...MOCK_HERO.equipment },
        backpack: [...MOCK_HERO.backpack]
    };
    return createCombatant(hero);
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
        description: 'Test Backpack Item',
        bookRef: TEST_BOOK,
        effect: {
            stats: {
            },
            duration: 0,
            source: 'hero',
            target: 'hero'
        },
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

export function createCombatant<T extends Hero | Enemy>(char: T): Combatant<T> {
    return {
        id: char.name.replace(' ', '-').toLowerCase(),
        type: char.type,
        name: char.name,
        stats: { ...char.stats },
        original: char,
        activeAbilities: new Map(),
        activeEffects: []
    };
}

export function requireAbilityDefinition(name: string): AbilityDefinition {
    const def = getAbilityDefinition(name);
    if (!def) throw new Error(`Ability ${name} not found`);
    return def;
}

export function addAbility(combatant: any, name: string): AbilityDefinition {
    const def = requireAbilityDefinition(name);
    const canonical = toCanonicalName(name);
    combatant.activeAbilities.set(canonical, {
        name,
        owner: combatant.type,
        def,
        uses: undefined
    });
    return def;
};

export function mockDiceRolls(rolls: number[]) {
    const rollValues = rolls.map(r => (r - 1) / 6);
    vi.spyOn(Math, 'random').mockImplementation(() => {
        if (rollValues.length === 0) {
            throw new Error('No more dice rolls available');
        }
        const value = rollValues.shift()!
        console.log('Random dice roll result:', (6 * value) + 1);
        return value;
    });
}

export function deterministicRoll(rolls: number[]): DiceRoll[] {
    return rolls.map(val => ({ value: val, isRerolled: false }));
}
