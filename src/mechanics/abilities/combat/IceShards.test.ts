import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './IceShards';
import { enemyWithStats, heroWithStats, INITIAL_STATE } from '../../../tests/testUtils';
import { CombatState } from '../../../types/combatState';

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
            enemies: [enemyWithStats()], activeEnemyIndex: 0,
            phase: 'damage-roll' as const,
            winner: 'hero' as const,
        };
        const result = ability.onActivate?.(state, { owner: 'hero' });
        expect(result?.logs.some(l => l.message?.includes('Ice Shards'))).toBe(true);
        // Also check if health decreased (magic is 5)
        expect(result?.enemies[0].stats.health).toBe(INITIAL_STATE.enemies[0].stats.health - 5);
    });
});
