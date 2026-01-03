import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './IceShards';
import { enemyWithStats, heroWithStats, INITIAL_STATE } from '../../../tests/testUtils';
import { CombatState } from '../../../types/combat';

describe('Ice Shards', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Ice Shards')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should inflict magic score damage', () => {
        const state: CombatState = {
            ...INITIAL_STATE,
            hero: heroWithStats({ magic: 5 }),
            enemy: enemyWithStats(),
            phase: 'damage-roll' as const,
            winner: 'hero' as const,
        };
        const result = ability.onActivate?.(state, 'hero');
        expect(result?.damageDealt).toHaveLength(1);
        expect(result?.damageDealt![0].amount).toBe(5);
    });
});
