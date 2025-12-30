import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './NaturesRevenge';
import { INITIAL_STATE } from '../../tests/testUtils';

describe("Nature's Revenge", () => {
    it('should inflict damage and slow opponent', () => {
        const ability = getAbilityDefinition("Nature's Revenge");
        const state = { ...INITIAL_STATE, phase: 'damage-roll' as const, winner: 'hero' as const, logs: [] };
        const result = ability?.onActivate?.(state);

        expect(result?.phase).toBe('round-end');
        expect(result?.damageDealt).toHaveLength(1);
        expect(result?.damageDealt![0].amount).toBeGreaterThanOrEqual(2);
        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.stats.speed).toBe(-1);
    });
});
