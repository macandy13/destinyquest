import { describe, it, expect } from 'vitest';
import { activateAbility, resolveInteraction, cancelInteraction, startCombat } from './CombatEngine';
import { registerAbility, AbilityDefinition } from './abilityRegistry';
import { addLogs } from '../types/combatState';
import { Hero } from '../types/hero';
import { Enemy } from '../types/character';

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
    stats: { speed: 2, brawn: 2, magic: 2, armour: 0, health: 10, maxHealth: 10 },
    abilities: [],
    bookRef: { book: 'test', act: 1 }
};

describe('Ability Interactions', () => {
    it('should handle dice selection interaction', () => {
        // 1. Register a test ability with interaction
        const testAbility: AbilityDefinition = {
            name: 'Dice Selector',
            description: 'Selects a die',
            type: 'combat',
            onActivate: (state, context) => {
                if (!context.ability) return state;
                return {
                    ...state,
                    pendingInteraction: {
                        ability: context.ability,
                        requests: [{
                            type: 'dice',
                            mode: 'select',
                            count: 1,
                            target: 'hero', // default
                        }],
                        callback: (state) => {
                            return addLogs(state, { message: 'Selected 1 dice' });
                        }
                    }
                };
            }
        };
        registerAbility(testAbility);

        // 2. Start combat and give hero the ability
        let state = startCombat(MOCK_HERO, MOCK_ENEMY);
        state.hero.activeAbilities.set('dice-selector', {
            name: 'Dice Selector',
            owner: 'hero',
            def: testAbility,
            uses: 1
        });

        // 3. Activate ability
        state = activateAbility(state, 'Dice Selector');

        // 4. Verify pending interaction
        expect(state.pendingInteraction).toBeDefined();
        expect(state.pendingInteraction?.requests[0].type).toBe('dice');
        expect(state.pendingInteraction?.ability.name).toBe('Dice Selector');

        // Verify uses NOT decremented yet
        expect(state.hero.activeAbilities.get('dice-selector')?.uses).toBe(1);

        // 5. Resolve interaction
        state = resolveInteraction(state, [{ request: state.pendingInteraction!.requests[0], selectedIndex: 0 }]);

        // 6. Verify interaction resolved
        expect(state.pendingInteraction).toBeUndefined();
        // Verify callback was called (check logs)
        expect(state.logs.some(l => l.message === 'Selected 1 dice')).toBe(true);
        // Verify uses decremented (ability removed)
        expect(state.hero.activeAbilities.has('dice-selector')).toBe(false);
    });

    it('should handle cancellation', () => {
        const testAbility: AbilityDefinition = {
            name: 'Cancellable Ability',
            description: 'Can be cancelled',
            type: 'combat',
            onActivate: (state, context) => {
                if (!context.ability) return state;
                return {
                    ...state,
                    pendingInteraction: {
                        ability: context.ability,
                        requests: [{
                            type: 'choices',
                            mode: 'select',
                            count: 1
                        }],
                        callback: (s) => s
                    }
                };
            }
        };
        registerAbility(testAbility);

        let state = startCombat(MOCK_HERO, MOCK_ENEMY);
        state.hero.activeAbilities.set('cancellable-ability', {
            name: 'Cancellable Ability',
            owner: 'hero',
            def: testAbility,
            uses: 1
        });

        state = activateAbility(state, 'Cancellable Ability');
        expect(state.pendingInteraction).toBeDefined();

        state = cancelInteraction(state);

        expect(state.pendingInteraction).toBeUndefined();
        // Uses should NOT be decremented
        expect(state.hero.activeAbilities.get('cancellable-ability')?.uses).toBe(1);
    });
});
