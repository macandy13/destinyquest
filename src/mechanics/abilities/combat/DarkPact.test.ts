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
            hero: heroWithStats({ health: 10 }),
            logs: []
        };
        const result = ability.onActivate?.(state, 'hero');

        expect(result?.modifications).toHaveLength(2);
        expect(result?.modifications![0].modification.stats.health).toBe(-4);
        expect(result?.modifications![1].modification.stats.damageModifier).toBe(4);
    });
});
