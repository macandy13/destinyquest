import { describe, it, expect } from 'vitest';
import { activateAbility, resolveInteraction, startCombat } from '../../CombatEngine';
import { getAbilityDefinition } from '../../abilityRegistry';
import { Hero } from '../../../types/hero';
import { Enemy } from '../../../types/character';
import { calculateEffectiveStats } from '../../../types/effect';
import './Steal'; // Register the ability

const MOCK_HERO: Hero = {
    name: 'Test Hero',
    type: 'hero',
    stats: { speed: 2, brawn: 5, magic: 3, armour: 1, health: 30, maxHealth: 30 },
    backpack: [],
    equipment: {},
    money: 0,
    path: 'Warrior',
    career: 'Gladiator'
};

const MOCK_ENEMY: Enemy = {
    name: 'Test Enemy',
    type: 'enemy',
    stats: { speed: 5, brawn: 2, magic: 2, armour: 0, health: 10, maxHealth: 10 },
    abilities: [],
    bookRef: { book: 'test', act: 1 }
};

describe('Steal Ability', () => {
    it('should request stat selection and apply modification', () => {
        // Start combat
        let state = startCombat(MOCK_HERO, MOCK_ENEMY);

        // Add Steal ability
        const def = getAbilityDefinition('Steal');
        if (!def) throw new Error('Steal ability not registered');

        state.hero.activeAbilities.set('steal', {
            name: 'Steal',
            owner: 'hero',
            def: {
                ...def,
                description: 'steal'
            },
            uses: 1
        });

        // Activate ability
        state = activateAbility(state, 'Steal');

        // Verify pending interaction
        expect(state.pendingInteraction).toBeDefined();
        // Check requests safely
        expect(state.pendingInteraction?.requests).toBeDefined();
        expect(state.pendingInteraction?.requests[0].choices).toEqual(['Speed', 'Brawn', 'Magic', 'Armour']);

        // Resolve interaction: Choice 0 (Speed)
        // state.hero.speed = 2, state.enemy.speed = 5. Diff = 3.
        state = resolveInteraction(state, [{ request: state.pendingInteraction!.requests[0], selectedIndex: 0 }]);

        // Verify interaction cleared
        expect(state.pendingInteraction).toBeUndefined();

        // Verify Effect applied
        // Hero base speed is 2. Effect should add 3.
        const effectiveStats = calculateEffectiveStats(state.hero.stats, state.hero.activeEffects);
        expect(effectiveStats.speed).toBe(5);

        // Check effect details
        const effect = state.hero.activeEffects.find(e => e.source === 'Steal');
        expect(effect).toBeDefined();
        expect(effect?.stats.speed).toBe(3);
        expect(effect?.duration).toBe(1);
    });

    it('should not apply negative modification if hero stat is higher', () => {
        // Hero Brawn 5, Enemy Brawn 2.
        let state = startCombat(MOCK_HERO, MOCK_ENEMY);
        const def = getAbilityDefinition('Steal');
        if (!def) throw new Error('Steal ability not registered');

        state.hero.activeAbilities.set('steal', {
            name: 'Steal',
            owner: 'hero',
            def: {
                ...def,
                description: 'steal'
            },
            uses: 1
        });

        state = activateAbility(state, 'Steal');

        // Resolve interaction: Choice 1 (Brawn)
        state = resolveInteraction(state, [{ request: state.pendingInteraction!.requests[0], selectedIndex: 1 }]);

        // Verify no effect applied (diff would be negative)
        const effect = state.hero.activeEffects.find(e => e.source === 'Steal');
        expect(effect).toBeUndefined();

        // Stats remain same
        const effectiveStats = calculateEffectiveStats(state.hero.stats, state.hero.activeEffects);
        expect(effectiveStats.brawn).toBe(5);
    });
});
