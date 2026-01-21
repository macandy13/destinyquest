import { describe, it, expect, beforeEach, assert } from 'vitest';
import { getAbilityDefinition, AbilityDefinition } from '../../abilityRegistry';
import './ShieldSpin';
import { INITIAL_STATE, heroWithStats, enemyWithStats } from '../../../tests/testUtils';

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
            enemies: [enemyWithStats({ health: 20 })], activeEnemyIndex: 0,
            // Mock enemy rolls (Context: Hero owns ability, implies Target=Enemy)
            enemySpeedRolls: [{ value: 1, isRerolled: false }, { value: 1, isRerolled: false }, { value: 6, isRerolled: false }]
        };

        // ShieldSpin logic: "opponent === 'enemy' (since owner='hero')". "rolls = state.enemySpeedRolls".
        const updates = ability!.onSpeedRoll!(state, { owner: 'hero' });

        expect(updates?.enemies[0].stats.health).toBeLessThan(20);
        expect(updates?.logs?.[0].message).toContain('Shield Spin dealt');
    });

    it('should do nothing if no 1s rolled', () => {
        const state = {
            ...INITIAL_STATE,
            enemySpeedRolls: [{ value: 2, isRerolled: false }, { value: 6, isRerolled: false }]
        };


        const updates = ability!.onSpeedRoll!(state, { owner: 'hero' });
        expect(updates).toBe(state);
    });
});
