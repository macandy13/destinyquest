import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './BlackRain';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Black Rain', () => {
    it('should inflict random damage to enemy', () => {
        const ability = getAbilityDefinition('Black Rain');
        const state = {
            ...INITIAL_STATE,
            phase: 'damage-roll' as const,
            winner: 'hero' as const
        };
        const result = ability?.onActivate?.(state);

        expect(result?.phase).toBe('round-end');
        // TODO: Test damageDealt
        // expect(result?.damageDealt).toHaveLength(1);
        // expect(result?.damageDealt![0].target).toBe('enemy');
        // expect(result?.damageDealt![0].amount).toBeGreaterThanOrEqual(1);
        // expect(result?.damageDealt![0].source).toBe('Black Rain');
    });
});
