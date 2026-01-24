import { describe, it, expect } from 'vitest';
import { startCombat, MOCK_ENEMY } from './CombatEngine';
import { MOCK_HERO } from '../tests/testUtils';
import { toCanonicalName } from './abilityRegistry';
import { useAbility } from '../types/combatState';

describe('CombatEngine Mutation Bugs', () => {
    it('should not mutate previous state active abilities when using an ability', () => {
        const heroWithAbility = { ...MOCK_HERO };
        let state = startCombat(heroWithAbility, [MOCK_ENEMY]);

        // Inject a dummy ability with uses
        const abilityName = 'Test Ability';
        const canonicalName = toCanonicalName(abilityName);
        const activeAbility = {
            name: abilityName,
            owner: 'hero' as const,
            def: { name: abilityName, type: 'combat', uses: 2 } as any,
            uses: 2
        };
        state.hero.activeAbilities.set(canonicalName, activeAbility);

        // Snapshot state 1
        const state1 = state;
        const usesBefore = state1.hero.activeAbilities.get(canonicalName)?.uses;

        // Perform action that modifies uses
        const state2 = useAbility(state1, 'hero', abilityName);

        // Check state 2
        expect(state2.hero.activeAbilities.get(canonicalName)?.uses).toBe(1);

        // Check state 1 - THIS SHOULD FAIL currently if mutation happens
        expect(state1.hero.activeAbilities.get(canonicalName)?.uses).toBe(usesBefore);
        expect(state1.hero.activeAbilities.get(canonicalName)).not.toBe(state2.hero.activeAbilities.get(canonicalName));
    });
});
