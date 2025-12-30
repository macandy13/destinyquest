import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './Hamstring';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Hamstring', () => {
    it('should apply Hamstring effect', () => {
        const ability = getAbilityDefinition('Hamstring');
        const state = { ...INITIAL_STATE, logs: [] };
        const result = ability?.onActivate?.(state);

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.source).toBe('Hamstring');
    });
});
