import { describe, it, expect, beforeEach } from 'vitest';
import { activateAbility, startCombat, startRound, resolveInteraction } from './CombatEngine';
import { Hero } from '../types/hero';
import { Enemy } from '../types/character';
import { registerAbility } from './abilityRegistry';
import { AbilityDefinition } from './abilityRegistry';
import { CombatState } from '../types/combatState';

// Mock abilities
const mockSpeedAbility: AbilityDefinition = {
    name: 'Mock Speed',
    type: 'speed',
    description: 'A speed ability',
    onActivate: (state) => state,
};

const mockCombatAbility: AbilityDefinition = {
    name: 'Mock Combat',
    type: 'combat',
    description: 'A combat ability',
    onActivate: (state) => state,
};

const mockModifierAbility: AbilityDefinition = {
    name: 'Mock Modifier',
    type: 'modifier',
    description: 'A modifier ability',
    onActivate: (state) => state,
};

const mockSpeedAbility2: AbilityDefinition = {
    name: 'Mock Speed 2',
    type: 'speed',
    description: 'Another speed ability',
    onActivate: (state) => state,
};

const mockCombatAbility2: AbilityDefinition = {
    name: 'Mock Combat 2',
    type: 'combat',
    description: 'Another combat ability',
    onActivate: (state) => state,
};

const mockInteractionAbility: AbilityDefinition = {
    name: 'Mock Interaction',
    type: 'speed',
    description: 'A speed ability with interaction',
    onActivate: (state, { ability }) => ({
        ...state,
        pendingInteraction: {
            ability: ability!,
            requests: [],
            callback: (s) => s
        }
    })
};

describe('Combat Ability Usage Limits', () => {
    let initialState: CombatState;
    let hero: Hero;
    let enemy: Enemy;

    beforeEach(() => {
        registerAbility(mockSpeedAbility);
        registerAbility(mockSpeedAbility2);
        registerAbility(mockCombatAbility);
        registerAbility(mockCombatAbility2);
        registerAbility(mockModifierAbility);
        registerAbility(mockInteractionAbility);

        hero = {
            name: 'Test Hero',
            type: 'hero',
            stats: { speed: 1, brawn: 1, magic: 1, armour: 0, health: 10, maxHealth: 10 },
            backpack: [],
            equipment: {}
        };
        enemy = {
            name: 'Test Enemy',
            type: 'enemy',
            stats: { speed: 1, brawn: 1, magic: 1, armour: 0, health: 10, maxHealth: 10 },
            abilities: [],
            bookRef: { book: 'Test', act: 1 }
        };

        initialState = startCombat(hero, enemy);
        // Add abilities manually to hero
        initialState.hero.activeAbilities.set('mock-speed', { name: 'Mock Speed', owner: 'hero', def: mockSpeedAbility, uses: 1 });
        initialState.hero.activeAbilities.set('mock-speed-2', { name: 'Mock Speed 2', owner: 'hero', def: mockSpeedAbility2, uses: 1 });
        initialState.hero.activeAbilities.set('mock-combat', { name: 'Mock Combat', owner: 'hero', def: mockCombatAbility, uses: 1 });
        initialState.hero.activeAbilities.set('mock-combat-2', { name: 'Mock Combat 2', owner: 'hero', def: mockCombatAbility2, uses: 1 });
        initialState.hero.activeAbilities.set('mock-modifier', { name: 'Mock Modifier', owner: 'hero', def: mockModifierAbility, uses: 1 });
        initialState.hero.activeAbilities.set('mock-interaction', { name: 'Mock Interaction', owner: 'hero', def: mockInteractionAbility, uses: 1 });

        // Advance to round 1
        initialState = startRound(initialState);
    });

    it('should initialize usedAbilities as empty array at start of round', () => {
        expect(initialState.usedAbilities).toEqual([]);
    });

    it('should track usage of speed ability', () => {
        let state = activateAbility(initialState, 'Mock Speed');
        expect(state.usedAbilities).toHaveLength(1);
        expect(state.usedAbilities![0]).toEqual({ name: 'mock-speed', type: 'speed' });
    });

    it('should prevent using a second speed ability in the same round', () => {
        let state = activateAbility(initialState, 'Mock Speed');
        const stateBeforeSecond = state;

        state = activateAbility(state, 'Mock Speed 2');

        expect(state).toBe(stateBeforeSecond);
        expect(state.usedAbilities).toHaveLength(1);
        expect(state.usedAbilities![0].name).toBe('mock-speed');
    });

    it('should allow using a combat ability after a speed ability', () => {
        let state = activateAbility(initialState, 'Mock Speed');
        state = activateAbility(state, 'Mock Combat');

        expect(state.usedAbilities).toHaveLength(2);
        expect(state.usedAbilities).toContainEqual({ name: 'mock-speed', type: 'speed' });
        expect(state.usedAbilities).toContainEqual({ name: 'mock-combat', type: 'combat' });
    });

    it('should prevent using a second combat ability', () => {
        let state = activateAbility(initialState, 'Mock Combat');
        const stateBeforeSecond = state;

        state = activateAbility(state, 'Mock Combat 2');

        expect(state).toBe(stateBeforeSecond);
        expect(state.usedAbilities).toHaveLength(1);
        expect(state.usedAbilities![0].name).toBe('mock-combat');
    });

    it('should not track modifier abilities', () => {
        let state = activateAbility(initialState, 'Mock Modifier');
        expect(state.usedAbilities).toEqual([]);
    });

    it('should reset usage tracking when starting a new round', () => {
        let state = activateAbility(initialState, 'Mock Speed');
        state = startRound(state);
        expect(state.usedAbilities).toEqual([]);
    });

    it('should track usage upon resolving interaction', () => {
        let state = activateAbility(initialState, 'Mock Interaction');
        expect(state.pendingInteraction).toBeDefined();
        // Usage not tracked yet
        expect(state.usedAbilities).toEqual([]);

        state = resolveInteraction(state, []);
        expect(state.usedAbilities).toHaveLength(1);
        expect(state.usedAbilities![0]).toEqual({ name: 'Mock Interaction', type: 'speed' });
    });
});
