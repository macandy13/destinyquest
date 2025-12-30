import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './Pound';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Pound', () => {
    it('should apply damage buff and self speed debuff', () => {
        const ability = getAbilityDefinition('Pound');
        const state = { ...INITIAL_STATE, logs: [] };
        const result = ability?.onActivate?.(state);

        expect(result?.modifications).toHaveLength(2);
        expect(result?.modifications![0].modification.stats.damageModifier).toBe(3);
        expect(result?.modifications![1].modification.stats.speed).toBe(-1);
    });
});
