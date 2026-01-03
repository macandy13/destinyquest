import { describe, it, expect, beforeEach } from 'vitest';
import { INITIAL_STATE, heroWithStats } from '../../../tests/testUtils';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './LifeSpark';

describe('Life Spark', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Life Spark')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should heal on doubles in speed roll', () => {
        const hero = heroWithStats({ health: 10, maxHealth: 20 });
        const state = { ...INITIAL_STATE, hero };

        const rolls = [{ value: 4, isRerolled: false }, { value: 4, isRerolled: false }];
        state.heroSpeedRolls = rolls;

        const updates = ability.onSpeedRoll!(state, { owner: 'hero' });

        expect(updates.hero!.stats.health).toBe(14);
        expect(updates.logs![0].message).toContain('Life Spark healed 4');
    });

    it('should heal on doubles in damage roll', () => {
        const hero = heroWithStats({ health: 10, maxHealth: 20 });
        const state = { ...INITIAL_STATE, hero, winner: 'hero' as const, phase: 'damage-roll' as const };

        const rolls = [{ value: 6, isRerolled: false }, { value: 6, isRerolled: false }];
        state.damage = { damageRolls: rolls, modifiers: [] };

        const updates = ability.onDamageRoll!(state, { owner: 'hero' });

        expect(updates.hero!.stats.health).toBe(14);
    });

    it('should not heal without doubles', () => {
        const hero = heroWithStats({ health: 10, maxHealth: 20 });
        const state = { ...INITIAL_STATE, hero };

        const rolls = [{ value: 1, isRerolled: false }, { value: 2, isRerolled: false }];
        state.heroSpeedRolls = rolls;

        const updates = ability.onSpeedRoll!(state, { owner: 'hero' });

        // healDamage returns state with updated logs even if no heal? 
        // No, healDamage returns state.
        // If Logic: `if (!hasDouble) return state;`
        // If returns state (input state), checking equal:
        expect(updates).toBe(state);
    });
});
