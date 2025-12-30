import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './Dodge';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Dodge', () => {
    it('should avoid damage', () => {
        const ability = getAbilityDefinition('Dodge');
        const state = { ...INITIAL_STATE, phase: 'damage-roll' as const, winner: 'enemy' as const, logs: [] };
        const result = ability?.onActivate?.(state);

        expect(result?.phase).toBe('round-end');
        expect(result?.damageRolls).toEqual([{ value: 0, isRerolled: false }]);
    });

    it('should be disabled if Ensnared', () => {
        const ability = getAbilityDefinition('Dodge');
        const state = {
            ...INITIAL_STATE,
            phase: 'damage-roll' as const,
            winner: 'enemy' as const,
            logs: [],
            activeEffects: [{ modification: { source: 'Ensnare', target: 'hero' }, id: 'ensnare-1' }]
        };

        const canActivate = ability?.canActivate?.(state);
        expect(canActivate).toBe(false);
    });
});
