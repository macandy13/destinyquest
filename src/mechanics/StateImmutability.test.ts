import { describe, it, expect } from 'vitest';
import { startCombat, useBackpackItem } from './CombatEngine';
import { setDamageRoll, modifyDamageRolls } from '../types/combatState';
import { MOCK_HERO } from '../tests/testUtils';
import { MOCK_ENEMY } from './CombatEngine';
import { toCanonicalName, registerAbility } from './abilityRegistry';

describe('State Immutability Bugs', () => {
    it('should not mutate backpack items when used', () => {
        const item = { name: 'Potion', description: 'Heals', effect: { target: 'hero', stats: { health: 5 }, duration: 0 }, uses: 2 };
        const hero = { ...MOCK_HERO, backpack: [item] };
        const state = startCombat(hero as any, [MOCK_ENEMY]);

        const state1 = state;
        const usesBefore = state1.backpack[0].uses;

        // Use item
        const state2 = useBackpackItem(state1, 0);

        // state2 should have decremented uses
        expect(state2.backpack[0].uses).toBe(1);

        // state1 should UNCHANGED
        expect(state1.backpack[0].uses).toBe(usesBefore);
        expect(state1.backpack[0]).not.toBe(state2.backpack[0]);
    });

    it('should not mutate damage modifiers array during calculation', () => {
        // Setup: Start combat first
        let state = startCombat(MOCK_HERO, [MOCK_ENEMY]);

        // Inject active ability that adds damage mod
        const abilityName = 'Power Strike';
        const abilityDef = {
            name: abilityName,
            description: 'Adds +2 damage',
            type: 'combat',
            onDamageCalculate: () => 2
        };
        // Register it so "getAbilityDefinition" finds it inside the hook system
        registerAbility(abilityDef as any);

        const activeAbility = { name: abilityName, owner: 'hero' as const, def: abilityDef as any };
        state.hero.activeAbilities.set(toCanonicalName(abilityName), activeAbility);

        state = { ...state, winner: 'hero' }; // Force hero win

        // Calculate damage (state1)
        const state1 = setDamageRoll(state, [{ value: 6, isRerolled: false }]);
        const modifiersLength1 = state1.damage?.modifiers.length;

        // Verify we actually have a modifier
        expect(modifiersLength1).toBe(1);

        // Calculate damage again (state2)
        const state2 = setDamageRoll(state1, [{ value: 6, isRerolled: false }]);

        expect(state2.damage?.modifiers.length).toBe(modifiersLength1);
        expect(state1.damage?.modifiers.length).toBe(modifiersLength1);

        // Test modifyDamageRolls
        const state3 = modifyDamageRolls(state1, [{ value: 5, isRerolled: false }], 'testing');

        expect(state1.damage?.modifiers.length).toBe(1);
        expect(state3.damage?.modifiers.length).toBe(1);
        expect(state1.damage?.modifiers).not.toBe(state3.damage?.modifiers);
    });
});
