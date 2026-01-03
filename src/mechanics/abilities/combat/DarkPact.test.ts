import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './DarkPact';
import { heroWithStats, INITIAL_STATE } from '../../../tests/testUtils';

describe('Dark Pact', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Dark Pact')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should sacrifice health for damage', () => {
        const state = {
            ...INITIAL_STATE,
            // heroWithStats creates a hero with stats.
            hero: heroWithStats({ health: 10 }),
            logs: []
        };
        const result = ability.onActivate?.(state, { owner: 'hero' });

        expect(result?.hero.activeEffects).toHaveLength(1);

        // Damage buff
        const damageMod = result?.hero.activeEffects.find(e => e.stats.damageModifier === 4);
        expect(damageMod).toBeDefined();

        // Health cost applied directly
        expect(result?.hero.stats.health).toBe(6); // 10 - 4
    });
});
