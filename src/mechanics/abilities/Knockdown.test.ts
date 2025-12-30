import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './Knockdown';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Knockdown', () => {
    it('should add speed reduction to enemy on activation', () => {
        const ability = getAbilityDefinition('Knockdown');
        const state = { ...INITIAL_STATE, logs: [] };
        const result = ability?.onActivate?.(state);

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.stats.speed).toBe(-1);
        expect(result?.modifications![0].modification.target).toBe('enemy');
        expect(result?.modifications![0].duration).toBe(1);
    });
});
