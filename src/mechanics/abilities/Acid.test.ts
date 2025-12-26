import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './Acid';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Acid', () => {
    it('should add 1 damage per die rolled', () => {
        const acid = getAbilityDefinition('Acid');
        const rolls = [{ value: 1, isRerolled: false }, { value: 4, isRerolled: false }, { value: 6, isRerolled: false }];
        const bonus = acid?.onDamageCalculate?.(INITIAL_STATE, { total: 10, rolls });
        expect(bonus).toBe(3);
    });
});
