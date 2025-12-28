import { describe, it, expect } from 'vitest';
import { INITIAL_STATE, heroWithStats } from '../../tests/testUtils';
import { getAbilityDefinition } from '../abilityRegistry';
import './LifeSpark';

describe('Life Spark', () => {
    it('should heal on doubles in speed roll', () => {
        const def = getAbilityDefinition('Life Spark');
        const hero = heroWithStats({ health: 10, maxHealth: 20 });
        const state = { ...INITIAL_STATE, hero };

        const rolls = [{ value: 4, isRerolled: false }, { value: 4, isRerolled: false }];

        const updates = def!.onSpeedRoll!(state, rolls);

        expect(updates.hero!.stats.health).toBe(14);
        expect(updates.logs![0].message).toContain('Life Spark');
    });

    it('should heal on doubles in damage roll', () => {
        const def = getAbilityDefinition('Life Spark');
        const hero = heroWithStats({ health: 10, maxHealth: 20 });
        const state = { ...INITIAL_STATE, hero };

        const rolls = [{ value: 6, isRerolled: false }, { value: 6, isRerolled: false }];

        const updates = def!.onDamageRoll!(state, rolls);

        expect(updates.hero!.stats.health).toBe(14);
    });

    it('should not heal without doubles', () => {
        const def = getAbilityDefinition('Life Spark');
        const hero = heroWithStats({ health: 10, maxHealth: 20 });
        const state = { ...INITIAL_STATE, hero };

        const rolls = [{ value: 1, isRerolled: false }, { value: 2, isRerolled: false }];

        const updates = def!.onSpeedRoll!(state, rolls);

        expect(updates.hero).toBeUndefined(); // No update
    });
});
