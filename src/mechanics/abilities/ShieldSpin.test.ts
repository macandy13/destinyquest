import { describe, it, expect, beforeEach, assert } from 'vitest';
import { getAbilityDefinition, AbilityDefinition } from '../abilityRegistry';
import './ShieldSpin';
import { INITIAL_STATE, heroWithStats, enemyWithStats } from '../../tests/testUtils';

describe('Shield Spin', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Shield Spin');
        assert(def !== undefined);
        ability = def!;
    })

    it('should inflict damage equal to 1 die per opponent [1] rolled', () => {
        const state = {
            ...INITIAL_STATE,
            hero: heroWithStats({ health: 20 }),
            enemy: enemyWithStats({ health: 20 }),
            // Mock enemy rolls (Context: Hero owns ability, implies Target=Enemy)
            enemySpeedRolls: [{ value: 1, isRerolled: false }, { value: 1, isRerolled: false }, { value: 6, isRerolled: false }]
        };

        // Hook is called with (state, source, rolls). source is who rolled.
        // If ability targets enemy, source is 'enemy'.
        const updates = ability!.onSpeedRoll!(state, 'enemy', [{ value: 1, isRerolled: false }, { value: 1, isRerolled: false }, { value: 6, isRerolled: false }]);

        expect(updates?.enemy?.stats.health).toBeLessThan(20);
        expect(updates?.logs?.[0].message).toContain('Shield Spin: Opponent rolled 2x[1]');
    });

    it('should do nothing if no 1s rolled', () => {
        const state = {
            ...INITIAL_STATE,
            enemySpeedRolls: [{ value: 2, isRerolled: false }, { value: 6, isRerolled: false }]
        };


        const updates = ability!.onSpeedRoll!(state, 'enemy', [{ value: 2, isRerolled: false }, { value: 6, isRerolled: false }]);
        expect(updates).toEqual({});
    });
});
