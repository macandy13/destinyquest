import { CombatState, Enemy } from '../types/combat';
import { Hero } from '../types/hero';

export const MOCK_HERO: Hero = {
    name: 'Test Hero',
    path: '',
    career: '',
    stats: { speed: 0, brawn: 0, magic: 0, armour: 0, health: 30, maxHealth: 30 },
    equipment: {},
    backpack: [],
    money: 0
};

export const MOCK_ENEMY: Enemy = {
    name: 'Test Enemy',
    speed: 0,
    brawn: 0,
    magic: 0,
    armour: 0,
    health: 20,
    maxHealth: 20,
    abilities: []
};

// Generic mock state for ability testing
export const INITIAL_STATE: CombatState = {
    hero: MOCK_HERO,
    enemy: MOCK_ENEMY,
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

export const heroWithStats = (stats: Partial<Hero['stats']>) => ({
    ...MOCK_HERO,
    stats: {
        ...MOCK_HERO.stats,
        ...stats
    }
});
