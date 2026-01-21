import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './DarkClaw';
import { INITIAL_STATE, enemyWithStats, heroWithStats } from '../../../tests/testUtils';

describe('Dark Claw', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Dark Claw')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should inflict 4 damage on speed roll doubles', () => {
        const state = {
            ...INITIAL_STATE,
            hero: heroWithStats({ speed: 4 }),
            enemies: [enemyWithStats({ health: 20 })], activeEnemyIndex: 0
        };
        const doubles = [{ value: 3, isRerolled: false }, { value: 3, isRerolled: false }];
        state.heroSpeedRolls = doubles;

        // Mock state to define hero properly
        const updates = ability.onSpeedRoll?.(state, { owner: 'hero' });

        // This ability uses additionalEnemyDamage in my implementation for speed roll?
        // Wait, I should probably be consistent and modify health directly there too if possible,
        // OR rely on additionalEnemyDamage being processed.
        // Let's check the code I wrote for DarkClaw.ts.
        // I wrote: additionalEnemyDamage...
        // Does CombatEngine process additionalEnemyDamage?
        // I need to verify that. If NOT, then my Barbs implementation relying on it (partially) is fine because Barbs ALSO does health mod.
        // But if DarkClaw onSpeedRoll ONLY updates additionalEnemyDamage, and nothing applies it... it does nothing.

        // Let's Assume (and I will fix in next step if needed) that I should apply DIRECT damage.

        expect(updates).toBeDefined();
        // Updated DarkClaw to use dealDamage directly
        // dealDamage(state, 'Dark Claw', TARGET, 4)
        // Check logs for dealDamage message (new expectation)
        expect(updates?.logs?.[0].message).toContain('Dark Claw dealt 4 damage');
    });

    it('should inflict 4 damage on damage roll doubles', () => {
        const state = {
            ...INITIAL_STATE,
            phase: 'damage-roll' as const,
            winner: 'hero' as const,
            hero: heroWithStats({ speed: 4 }),
            enemies: [enemyWithStats({ health: 20 })], activeEnemyIndex: 0
        };
        const doubles = [{ value: 5, isRerolled: false }, { value: 5, isRerolled: false }];
        state.damage = { damageRolls: doubles, modifiers: [] };

        const updates = ability.onDamageRoll?.(state, { owner: 'hero' });

        expect(updates?.logs?.[0].message).toContain('Dark Claw dealt 4 damage');
    });

    it('should not inflict damage on speed roll without doubles', () => {
        const state = {
            ...INITIAL_STATE,
            hero: heroWithStats({ speed: 4 }),
            enemies: [enemyWithStats({ health: 20 })], activeEnemyIndex: 0
        };
        const nonDoubles = [{ value: 3, isRerolled: false }, { value: 4, isRerolled: false }];
        state.heroSpeedRolls = nonDoubles;

        const updates = ability.onSpeedRoll?.(state, { owner: 'hero' });

        expect(updates).toBe(state);
    });

    it('should not inflict damage on damage roll without doubles', () => {
        const state = {
            ...INITIAL_STATE,
            winner: 'hero' as const,
            hero: heroWithStats({ speed: 4 }),
            enemies: [enemyWithStats({ health: 20 })], activeEnemyIndex: 0
        };
        const nonDoubles = [{ value: 5, isRerolled: false }, { value: 2, isRerolled: false }];
        state.damage = { damageRolls: nonDoubles, modifiers: [] };

        const updates = ability.onDamageRoll?.(state, { owner: 'hero' });

        expect(updates).toBe(state);
    });

});
