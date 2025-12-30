import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './IceShards';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Ice Shards', () => {
    it('should inflict magic score damage', () => {
        const ability = getAbilityDefinition('Ice Shards');
        const state = {
            ...INITIAL_STATE,
            hero: { ...INITIAL_STATE.hero!, stats: { ...INITIAL_STATE.hero!.stats, magic: 5 } },
            phase: 'damage-roll' as const,
            winner: 'hero' as const,
            logs: []
        };
        const result = ability?.onActivate?.(state);

        expect(result?.phase).toBe('round-end');
        expect(result?.damageDealt).toHaveLength(1);
        expect(result?.damageDealt![0].amount).toBe(5);
    });
});
