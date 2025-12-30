import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './Overload';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Overload', () => {
    it('should add extra damage die', () => {
        const ability = getAbilityDefinition('Overload');
        const state = { ...INITIAL_STATE, logs: [] };
        const result = ability?.onActivate?.(state);

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.stats.damageDice).toBe(1);
    });
});
