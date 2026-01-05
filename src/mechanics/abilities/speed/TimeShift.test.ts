import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './TimeShift';
import { INITIAL_STATE } from '../../../tests/testUtils';
import { CombatState } from '../../../types/combatState';

describe('Time Shift', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Time Shift')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should add modifier to match enemy speed', () => {
        const state: CombatState = {
            ...INITIAL_STATE,
            hero: { ...INITIAL_STATE.hero!, stats: { ...INITIAL_STATE.hero!.stats, speed: 0 } },
            enemy: { ...INITIAL_STATE.enemy!, stats: { ...INITIAL_STATE.enemy!.stats, speed: 4 } },
        };
        const result = ability.onActivate?.(state, { owner: 'hero' });

        expect(result?.hero.activeEffects).toHaveLength(1);
        expect(result?.hero.activeEffects[0].stats.speed).toBe(4);
        expect(result?.hero.activeEffects[0].target).toBe('hero');
        expect(result?.hero.activeEffects[0].duration).toBe(3);
    });

    it('should reduce speed if enemy is slower', () => {
        const state = {
            ...INITIAL_STATE,
            hero: { ...INITIAL_STATE.hero!, stats: { ...INITIAL_STATE.hero!.stats, speed: 5 } },
            enemy: { ...INITIAL_STATE.enemy!, stats: { ...INITIAL_STATE.enemy!.stats, speed: 2 } },
            logs: []
        };
        const result = ability.onActivate?.(state, { owner: 'hero' });

        expect(result?.hero.activeEffects).toHaveLength(1);
        expect(result?.hero.activeEffects[0].stats.speed).toBe(-3);
        expect(result?.hero.activeEffects[0].target).toBe('hero');
        expect(result?.hero.activeEffects[0].duration).toBe(3);
    });
});
