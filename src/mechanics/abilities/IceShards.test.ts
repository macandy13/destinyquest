import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './IceShards';
import { enemyWithStats, heroWithStats, INITIAL_STATE } from '../../tests/testUtils';
import { CombatState } from '../../types/combat';

describe('Ice Shards', () => {
    it('should inflict magic score damage', () => {
        const ability = getAbilityDefinition('Ice Shards');
        const state: CombatState = {
            ...INITIAL_STATE,
            hero: heroWithStats({ magic: 5 }),
            enemy: enemyWithStats(),
            phase: 'damage-roll' as const,
            winner: 'hero' as const,
        };
        const result = ability?.onActivate?.(state);
        expect(result?.damageDealt).toHaveLength(1);
        expect(result?.damageDealt![0].amount).toBe(5);
    });
});
