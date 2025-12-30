import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './BansheeWail';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Banshee Wail', () => {
    it('should stop opponent damage roll', () => {
        const ability = getAbilityDefinition('Banshee Wail');
        const state = { ...INITIAL_STATE, phase: 'damage-roll' as const, winner: 'enemy' as const, logs: [] };
        const result = ability?.onActivate?.(state);

        expect(result?.phase).toBe('round-end');
        expect(result?.damageRolls).toEqual([{ value: 0, isRerolled: false }]);
    });
});
