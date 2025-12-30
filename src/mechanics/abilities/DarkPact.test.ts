import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './DarkPact';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Dark Pact', () => {
    it('should sacrifice health for damage', () => {
        const ability = getAbilityDefinition('Dark Pact');
        const state = {
            ...INITIAL_STATE,
            hero: { ...INITIAL_STATE.hero!, stats: { ...INITIAL_STATE.hero!.stats, health: 10 } },
            logs: []
        };
        const result = ability?.onActivate?.(state);

        expect(result?.modifications).toHaveLength(2);
        // Cost
        expect(result?.modifications![0].modification.stats.health).toBe(-4);
        // Benefit
        expect(result?.modifications![1].modification.stats.damageModifier).toBe(4);
    });
});
