import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './FatalBlow';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Fatal Blow', () => {
    it('should apply modifier on activate', () => {
        const ability = getAbilityDefinition('Fatal Blow');
        const state = { ...INITIAL_STATE, logs: [] };
        const result = ability?.onActivate?.(state);

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.source).toBe('Fatal Blow');
    });
});
