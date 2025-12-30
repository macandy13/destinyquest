import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './Impale';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Impale', () => {
    it('should apply damage buff and speed debuff', () => {
        const ability = getAbilityDefinition('Impale');
        const state = { ...INITIAL_STATE, logs: [] };
        const result = ability?.onActivate?.(state);

        expect(result?.modifications).toHaveLength(2);
        // Damage
        expect(result?.modifications![0].modification.stats.damageModifier).toBe(3);
        // Speed
        expect(result?.modifications![1].modification.stats.speed).toBe(-1);
    });
});
