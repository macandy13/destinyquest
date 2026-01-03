import { describe, it, expect, vi, beforeEach } from 'vitest';
import { INITIAL_STATE, enemyWithStats } from '../../../tests/testUtils';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './FirstStrike';

describe('First Strike', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('First Strike')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should deal 1d6 damage before combat', () => {
        const enemy = enemyWithStats({ health: 20 });
        const state = { ...INITIAL_STATE, enemy };

        // Mock Math.random to return 0.5 (=> 3.5 => floor 3 + 1 = 4)
        vi.spyOn(Math, 'random').mockReturnValue(0.5);

        const updates = ability.onCombatStart!(state, 'hero');

        expect(updates.enemy!.stats.health).toBe(16); // 20 - 4
        expect(updates.logs![0].message).toContain('First Strike dealt 4 damage');

        vi.restoreAllMocks();
    });
});
