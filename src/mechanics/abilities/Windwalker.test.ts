import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './Windwalker';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Windwalker', () => {
    it('should use speed dice for damage', () => {
        const ability = getAbilityDefinition('Windwalker');
        const state = {
            ...INITIAL_STATE,
            hero: { ...INITIAL_STATE.hero!, stats: { ...INITIAL_STATE.hero!.stats, speed: 5 } },
            phase: 'damage-roll' as const,
            winner: 'hero' as const,
            logs: []
        };
        const result = ability?.onActivate?.(state);

        expect(result?.phase).toBe('round-end');
        expect(result?.damageDealt).toHaveLength(1);
        // Should have rolled 5 dice. Sum >= 5.
        expect(result?.damageDealt![0].amount).toBeGreaterThanOrEqual(5);
        expect(result?.damageDealt![0].source).toBe('Windwalker');
    });
});
