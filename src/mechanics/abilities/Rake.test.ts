import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './Rake';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Rake', () => {
    it('should inflict 3 dice damage', () => {
        const ability = getAbilityDefinition('Rake');
        const state = { ...INITIAL_STATE, phase: 'damage-roll' as const, winner: 'hero' as const, logs: [] };
        const result = ability?.onActivate?.(state);

        expect(result?.phase).toBe('round-end');
        expect(result?.damageDealt).toHaveLength(1);
        expect(result?.damageDealt![0].amount).toBeGreaterThanOrEqual(3);
    });
});
