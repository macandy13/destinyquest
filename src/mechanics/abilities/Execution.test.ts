import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './Execution';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Execution', () => {
    it('should reduce enemy health to zero if conditions are met', () => {
        const ability = getAbilityDefinition('Execution');
        // Hero Speed 5, Enemy Health 5 -> Success
        const state = {
            ...INITIAL_STATE,
            hero: { ...INITIAL_STATE.hero!, stats: { ...INITIAL_STATE.hero!.stats, speed: 5 } },
            enemy: { ...INITIAL_STATE.enemy!, stats: { ...INITIAL_STATE.enemy!.stats, health: 5 } },
            logs: []
        };
        const result = ability?.onActivate?.(state);

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.stats.health).toBe(-5);
        expect(result?.modifications![0].modification.target).toBe('enemy');
    });

    it('should fail if enemy health is greater than hero speed', () => {
        const ability = getAbilityDefinition('Execution');
        // Hero Speed 4, Enemy Health 5 -> Failure
        const state = {
            ...INITIAL_STATE,
            hero: { ...INITIAL_STATE.hero!, stats: { ...INITIAL_STATE.hero!.stats, speed: 4 } },
            enemy: { ...INITIAL_STATE.enemy!, stats: { ...INITIAL_STATE.enemy!.stats, health: 5 } },
            logs: []
        };
        const result = ability?.onActivate?.(state);

        expect(result).toBeNull();
    });

    it('should report canActivate correctly', () => {
        const ability = getAbilityDefinition('Execution');
        // Hero Speed 5, Enemy Health 5 -> True
        const stateSuccess = {
            ...INITIAL_STATE,
            hero: { ...INITIAL_STATE.hero!, stats: { ...INITIAL_STATE.hero!.stats, speed: 5 } },
            enemy: { ...INITIAL_STATE.enemy!, stats: { ...INITIAL_STATE.enemy!.stats, health: 5 } }
        };
        expect(ability?.canActivate?.(stateSuccess)).toBe(true);

        // Hero Speed 4, Enemy Health 5 -> False
        const stateFail = {
            ...INITIAL_STATE,
            hero: { ...INITIAL_STATE.hero!, stats: { ...INITIAL_STATE.hero!.stats, speed: 4 } },
            enemy: { ...INITIAL_STATE.enemy!, stats: { ...INITIAL_STATE.enemy!.stats, health: 5 } }
        };
        expect(ability?.canActivate?.(stateFail)).toBe(false);
    });
});
