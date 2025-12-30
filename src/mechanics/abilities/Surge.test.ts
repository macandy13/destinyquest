import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './Surge';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Surge', () => {
    it('should buff magic and debuff speed', () => {
        const ability = getAbilityDefinition('Surge');
        const state = { ...INITIAL_STATE, logs: [] };
        const result = ability?.onActivate?.(state);

        expect(result?.modifications).toHaveLength(2);
        expect(result?.modifications![0].modification.stats.magic).toBe(3);
        expect(result?.modifications![1].modification.stats.speed).toBe(-1);
    });
});
