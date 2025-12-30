import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './Vanish';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Vanish', () => {
    it('should avoid damage', () => {
        const ability = getAbilityDefinition('Vanish');
        const state = { ...INITIAL_STATE, phase: 'damage-roll' as const, winner: 'enemy' as const, logs: [] };
        const result = ability?.onActivate?.(state);

        expect(result?.phase).toBe('round-end');
        expect(result?.damageRolls).toEqual([{ value: 0, isRerolled: false }]);
    });
});
