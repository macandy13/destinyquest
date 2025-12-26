import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './Charge';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Charge', () => {
    it('should increase speed by 2', () => {
        const charge = getAbilityDefinition('Charge');
        const state = { ...INITIAL_STATE, logs: [] };
        const result = charge?.onActivate?.(state);

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.stats.speed).toBe(2);
        expect(result?.modifications![0].duration).toBe(1);
    });
});
