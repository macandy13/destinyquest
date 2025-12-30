import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './Cleave';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Cleave', () => {
    it('should inflict damage to enemy', () => {
        const ability = getAbilityDefinition('Cleave');
        const state = { ...INITIAL_STATE, phase: 'damage-roll' as const, winner: 'hero' as const, logs: [] };
        const result = ability?.onActivate?.(state);

        expect(result?.phase).toBe('round-end');
        expect(result?.damageDealt).toHaveLength(1);
        expect(result?.damageDealt![0].amount).toBeGreaterThanOrEqual(1);
    });
});
