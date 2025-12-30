import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './TimeShift';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Time Shift', () => {
    it('should add modifier to match enemy speed', () => {
        const ability = getAbilityDefinition('Time Shift');
        // Hero Speed 0, Enemy Speed 4 -> Modifier +4
        const state = {
            ...INITIAL_STATE,
            hero: { ...INITIAL_STATE.hero!, stats: { ...INITIAL_STATE.hero!.stats, speed: 0 } },
            enemy: { ...INITIAL_STATE.enemy!, stats: { ...INITIAL_STATE.enemy!.stats, speed: 4 } },
            logs: []
        };
        const result = ability?.onActivate?.(state);

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.stats.speed).toBe(4);
        expect(result?.modifications![0].modification.target).toBe('hero');
        expect(result?.modifications![0].duration).toBe(3);
    });

    it('should reduce speed if enemy is slower', () => {
        const ability = getAbilityDefinition('Time Shift');
        // Hero Speed 5, Enemy Speed 2 -> Modifier -3
        const state = {
            ...INITIAL_STATE,
            hero: { ...INITIAL_STATE.hero!, stats: { ...INITIAL_STATE.hero!.stats, speed: 5 } },
            enemy: { ...INITIAL_STATE.enemy!, stats: { ...INITIAL_STATE.enemy!.stats, speed: 2 } },
            logs: []
        };
        const result = ability?.onActivate?.(state);

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.stats.speed).toBe(-3);
        expect(result?.modifications![0].modification.target).toBe('hero');
        expect(result?.modifications![0].duration).toBe(3);
    });
});
