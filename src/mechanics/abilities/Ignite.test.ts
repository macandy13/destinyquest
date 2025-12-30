import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './Ignite';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Ignite', () => {
    it('should inflict damage and apply burn', () => {
        const ability = getAbilityDefinition('Ignite');
        const state = { ...INITIAL_STATE, phase: 'damage-roll' as const, winner: 'hero' as const, logs: [] };
        const result = ability?.onActivate?.(state);

        expect(result?.phase).toBe('round-end');
        expect(result?.damageDealt).toHaveLength(1);
        expect(result?.damageDealt![0].amount).toBeGreaterThanOrEqual(2);
        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.source).toBe('Ignite');
    });
});
