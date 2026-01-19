import { describe, expect, it, beforeEach } from 'vitest';
import {
    CombatState,
    requireAbilityDefinition
} from '../../../types/combatState';
import {
    createCombatant,
    MOCK_HERO,
    MOCK_ENEMY,
    INITIAL_STATE,
    mockDiceRolls
} from '../../../tests/testUtils';
import '../../allAbilities';

describe('Roll Check Abilities', () => {
    let state: CombatState;

    beforeEach(() => {
        state = {
            ...INITIAL_STATE,
            enemy: createCombatant(MOCK_ENEMY),
            hero: createCombatant(MOCK_HERO),
        };
    });

    describe('Mud Pie', () => {
        it('should deal 2 damage when roll > speed', () => {
            state.hero.stats.speed = 5;
            mockDiceRolls([4, 4]); // total 8 > speed 5

            const def = requireAbilityDefinition('Mud Pie');
            state = def.onRoundStart!(state, { owner: 'enemy' });

            expect(state.hero.stats.health).toBe(MOCK_HERO.stats.health - 2);
        });

        it('should not deal damage when roll <= speed', () => {
            state.hero.stats.speed = 10;
            mockDiceRolls([2, 3]); // total 5 <= speed 10

            const def = requireAbilityDefinition('Mud Pie');
            state = def.onRoundStart!(state, { owner: 'enemy' });

            expect(state.hero.stats.health).toBe(MOCK_HERO.stats.health);
        });
    });

    describe('Vortex of fire', () => {
        it('should deal 4 damage when roll > speed', () => {
            state.hero.stats.speed = 5;
            mockDiceRolls([5, 5]); // total 10 > speed 5

            const def = requireAbilityDefinition('Vortex of fire');
            state = def.onRoundStart!(state, { owner: 'enemy' });

            expect(state.hero.stats.health).toBe(MOCK_HERO.stats.health - 4);
        });
    });

    describe('Clobbering Time', () => {
        it('should deal 15 - armour/2 damage when roll > speed', () => {
            state.hero.stats.speed = 5;
            state.hero.stats.armour = 10;
            mockDiceRolls([4, 4, 4, 4]); // total 16 > speed 5

            const def = requireAbilityDefinition('Clobbering Time');
            state = def.onRoundStart!(state, { owner: 'enemy' });

            // 15 - 10/2 = 10 damage
            expect(state.hero.stats.health).toBe(MOCK_HERO.stats.health - 10);
        });
    });

    describe('Pincer Movement', () => {
        it('should deal 2 damage when rolling a 1', () => {
            mockDiceRolls([1]);

            const def = requireAbilityDefinition('Pincer Movement');
            state = def.onRoundStart!(state, { owner: 'enemy' });

            expect(state.hero.stats.health).toBe(MOCK_HERO.stats.health - 2);
        });

        it('should not deal damage on other rolls', () => {
            mockDiceRolls([3]);

            const def = requireAbilityDefinition('Pincer Movement');
            state = def.onRoundStart!(state, { owner: 'enemy' });

            expect(state.hero.stats.health).toBe(MOCK_HERO.stats.health);
        });
    });

    describe('Shield Slam', () => {
        it('should deal 6 damage when rolling a 1', () => {
            mockDiceRolls([1]);

            const def = requireAbilityDefinition('Shield Slam');
            state = def.onRoundStart!(state, { owner: 'enemy' });

            expect(state.hero.stats.health).toBe(MOCK_HERO.stats.health - 6);
        });
    });

    describe('Tangled roots', () => {
        it('should deal 5 damage when rolling a 1 or 2', () => {
            mockDiceRolls([2]);

            const def = requireAbilityDefinition('Tangled roots');
            state = def.onRoundStart!(state, { owner: 'enemy' });

            expect(state.hero.stats.health).toBe(MOCK_HERO.stats.health - 5);
        });

        it('should not deal damage on other rolls', () => {
            mockDiceRolls([3]);

            const def = requireAbilityDefinition('Tangled roots');
            state = def.onRoundStart!(state, { owner: 'enemy' });

            expect(state.hero.stats.health).toBe(MOCK_HERO.stats.health);
        });
    });
});
