import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './Ensnare';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Ensnare', () => {
    it('should apply Ensnare effect', () => {
        const ability = getAbilityDefinition('Ensnare');
        const state = { ...INITIAL_STATE, logs: [] };
        const result = ability?.onActivate?.(state);

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.source).toBe('Ensnare');
    });
});
