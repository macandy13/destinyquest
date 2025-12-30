import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './HeadButt';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Head Butt', () => {
    it('should stop opponent damage', () => {
        const ability = getAbilityDefinition('Head Butt');
        const state = { ...INITIAL_STATE, phase: 'damage-roll' as const, winner: 'enemy' as const, logs: [] };
        const result = ability?.onActivate?.(state);

        expect(result?.phase).toBe('round-end');
        expect(result?.damageRolls).toEqual([{ value: 0, isRerolled: false }]);
    });
});
