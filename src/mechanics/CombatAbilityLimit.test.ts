import { describe, it, expect, beforeEach } from 'vitest';
import { activateAbility, startCombat, startRound, resolveInteraction } from './CombatEngine';
import { Hero } from '../types/hero';
import { Enemy } from '../types/character';
import { registerAbility } from './abilityRegistry';
import { AbilityDefinition } from './abilityRegistry';
import { CombatState, setDamageRoll } from '../types/combatState';

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

const mockModifierWithIgnore: AbilityDefinition = {
    name: 'Mock Modifier Ignore',
    type: 'modifier',
    description: 'A modifier that ignores phase limits',
    canActivate: () => true,
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
        registerAbility(mockModifierWithIgnore);
        registerAbility(mockInteractionAbility);

        hero = {
            name: 'Test Hero',
            type: 'hero',
            stats: { speed: 1, brawn: 1, magic: 1, armour: 0, health: 10, maxHealth: 10 },
            money: 0,
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

        initialState = startCombat(hero, [enemy]);
        // Add abilities manually to hero
        initialState.hero.activeAbilities.set('mock-speed', { name: 'Mock Speed', owner: 'hero', def: mockSpeedAbility, uses: 1 });
        initialState.hero.activeAbilities.set('mock-speed-2', { name: 'Mock Speed 2', owner: 'hero', def: mockSpeedAbility2, uses: 1 });
        initialState.hero.activeAbilities.set('mock-combat', { name: 'Mock Combat', owner: 'hero', def: mockCombatAbility, uses: 1 });
        initialState.hero.activeAbilities.set('mock-combat-2', { name: 'Mock Combat 2', owner: 'hero', def: mockCombatAbility2, uses: 1 });
        initialState.hero.activeAbilities.set('mock-modifier', { name: 'Mock Modifier', owner: 'hero', def: mockModifierAbility, uses: 99 });
        initialState.hero.activeAbilities.set('mock-modifier-ignore', { name: 'Mock Modifier Ignore', owner: 'hero', def: mockModifierWithIgnore, uses: 99 });
        initialState.hero.activeAbilities.set('mock-interaction', { name: 'Mock Interaction', owner: 'hero', def: mockInteractionAbility, uses: 1 });

        // Advance to round 1 (phase is 'round-start')
        initialState = startRound(initialState);
    });

    it('should initialize usedAbilities as empty array at start of round', () => {
        expect(initialState.usedAbilities).toEqual([]);
    });

    it('should track usage of speed ability', () => {
        let state = activateAbility(initialState, 'Mock Speed');
        expect(state.usedAbilities).toHaveLength(1);
        expect(state.usedAbilities![0]).toEqual({ name: 'mock-speed', type: 'speed', phase: 'round-start' });
    });

    it('should prevent using a second speed ability in the same round', () => {
        let state = activateAbility(initialState, 'Mock Speed');

        // Transition to speed-roll first to avoid the one-per-phase block
        state.phase = 'speed-roll';

        // Try to activate another speed ability (blocked by round limit of 1 speed ability per round)
        state = activateAbility(state, 'Mock Speed 2');

        expect(state.usedAbilities).toHaveLength(1);
        expect(state.usedAbilities![0].name).toBe('mock-speed');
    });

    it('should prevent speed ability activation outside of round-start phase', () => {
        let state: CombatState = { ...initialState, phase: 'speed-roll' };
        let nextState = activateAbility(state, 'Mock Speed');
        expect(nextState).toBe(state);
    });

    it('should allow using a combat ability after a speed ability (in correct phases)', () => {
        let state = activateAbility(initialState, 'Mock Speed');
        
        // Transition to damage roll where hero won
        state = setDamageRoll(state, [{ value: 3, isRerolled: false }]);
        state.winner = 'hero';
        
        state = activateAbility(state, 'Mock Combat');

        expect(state.usedAbilities).toHaveLength(2);
        expect(state.usedAbilities).toContainEqual({ name: 'mock-speed', type: 'speed', phase: 'round-start' });
        expect(state.usedAbilities).toContainEqual({ name: 'mock-combat', type: 'combat', phase: 'damage-roll' });
    });

    it('should prevent using a second combat ability in the same round', () => {
        let state: CombatState = { ...initialState, phase: 'damage-roll', winner: 'hero' };
        state = activateAbility(state, 'Mock Combat');
        
        // Transition to apply-damage to clear phase limit (but keep round limit)
        state.phase = 'apply-damage';

        state = activateAbility(state, 'Mock Combat 2');

        expect(state.usedAbilities).toHaveLength(1);
        expect(state.usedAbilities![0].name).toBe('mock-combat');
    });

    it('should prevent combat ability activation outside of damage-roll phase or if opponent won', () => {
        // Test wrong phase
        let state: CombatState = { ...initialState, phase: 'round-start', winner: 'hero' };
        let nextState = activateAbility(state, 'Mock Combat');
        expect(nextState).toBe(state);

        // Test opponent won
        state = { ...initialState, phase: 'damage-roll', winner: 'enemy' };
        nextState = activateAbility(state, 'Mock Combat');
        expect(nextState).toBe(state);
    });

    it('should prevent using two active abilities in the same phase', () => {
        let state = activateAbility(initialState, 'Mock Speed');
        const stateBeforeSecond = state;

        // Try to activate a modifier in the same phase ('round-start')
        state = activateAbility(state, 'Mock Modifier');

        expect(state).toBe(stateBeforeSecond);
    });

    it('should allow using multiple modifiers if they are in different phases', () => {
        let state = activateAbility(initialState, 'Mock Modifier');
        expect(state.usedAbilities?.some(a => a.phase === state.phase)).toBe(true);

        // Transition to speed-roll phase
        state.phase = 'speed-roll';

        // Can activate another modifier now
        state = activateAbility(state, 'Mock Modifier');
        expect(state.usedAbilities?.filter(a => a.phase === state.phase)).toHaveLength(1);
    });

    it('should allow using modifiers with custom canActivate returning true even if phase limit is reached', () => {
        let state = activateAbility(initialState, 'Mock Modifier');
        expect(state.usedAbilities?.some(a => a.phase === state.phase)).toBe(true);

        // Can activate a modifier that overrides phase limits via canActivate
        let nextState = activateAbility(state, 'Mock Modifier Ignore');
        expect(nextState).not.toBe(state);
    });

    it('should track modifier abilities in usedAbilities list', () => {
        let state = activateAbility(initialState, 'Mock Modifier');
        expect(state.usedAbilities).toHaveLength(1);
        expect(state.usedAbilities![0].name).toBe('mock-modifier');
    });

    it('should reset usage tracking when starting a new round', () => {
        let state = activateAbility(initialState, 'Mock Speed');
        state = startRound(state);
        expect(state.usedAbilities).toEqual([]);
    });

    it('should track usage upon resolving interaction', () => {
        let state = activateAbility(initialState, 'Mock Interaction');
        expect(state.pendingInteraction).toBeDefined();
        // Tracked immediately upon activation
        expect(state.usedAbilities).toHaveLength(1);
        expect(state.usedAbilities![0]).toEqual({ name: 'mock-interaction', type: 'speed', phase: 'round-start' });

        state = resolveInteraction(state, []);
        // Stays tracked
        expect(state.usedAbilities).toHaveLength(1);
    });
});
