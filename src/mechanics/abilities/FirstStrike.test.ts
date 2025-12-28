import { describe, it, expect, vi } from 'vitest';
import { INITIAL_STATE } from '../../tests/testUtils';
import { getAbilityDefinition } from '../abilityRegistry';
import './FirstStrike';

describe('First Strike', () => {
    it('should deal 1d6 damage before combat', () => {
        const def = getAbilityDefinition('First Strike');
        expect(def).toBeDefined();

        const enemy = { ...INITIAL_STATE.enemy!, health: 20 };
        const state = { ...INITIAL_STATE, enemy };

        // Mock Math.random to return 0.5 (=> 3.5 => floor 3 + 1 = 4)
        vi.spyOn(Math, 'random').mockReturnValue(0.5);

        const updates = def!.onCombatStart!(state);

        expect(updates.enemy!.health).toBe(16); // 20 - 4
        expect(updates.logs![0].message).toContain('First Strike deals 4 damage');

        vi.restoreAllMocks();
    });
});
