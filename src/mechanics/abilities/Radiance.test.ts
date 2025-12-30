import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './Radiance';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Radiance', () => {
    it('should add speed reduction to enemy on activation', () => {
        const ability = getAbilityDefinition('Radiance');
        const state = { ...INITIAL_STATE, logs: [] };
        const result = ability?.onActivate?.(state);

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.stats.speed).toBe(-2);
        expect(result?.modifications![0].modification.target).toBe('enemy');
        expect(result?.modifications![0].duration).toBe(1);
    });
});
