import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './DarkClaw';
import { INITIAL_STATE, enemyWithStats, heroWithStats } from '../../tests/testUtils';

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
            enemy: enemyWithStats({ health: 20 })
        };
        const doubles = [{ value: 3, isRerolled: false }, { value: 3, isRerolled: false }];

        // Mock state to define hero properly
        const updates = ability.onSpeedRoll?.(state, 'hero', doubles);

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
        expect(updates?.enemy?.stats.health).toBe(16);
        expect(updates?.logs?.[0].message).toContain('Dark Claw dealt 4 damage to Test Enemy');
    });

    it('should inflict 4 damage on damage roll doubles', () => {
        const state = {
            ...INITIAL_STATE,
            hero: heroWithStats({ speed: 4 }),
            enemy: enemyWithStats({ health: 20 })
        };
        const doubles = [{ value: 5, isRerolled: false }, { value: 5, isRerolled: false }];

        const updates = ability.onDamageRoll?.(state, 'hero', doubles);

        expect(updates?.enemy?.stats.health).toBe(16);
        expect(updates?.logs?.[0].message).toContain('Dark Claw dealt 4 damage to Test Enemy');
    });

    it('should not inflict damage on speed roll without doubles', () => {
        const state = {
            ...INITIAL_STATE,
            hero: heroWithStats({ speed: 4 }),
            enemy: enemyWithStats({ health: 20 })
        };
        const nonDoubles = [{ value: 3, isRerolled: false }, { value: 4, isRerolled: false }];

        const updates = ability.onSpeedRoll?.(state, 'hero', nonDoubles);

        expect(updates).toEqual({});
    });

    it('should not inflict damage on damage roll without doubles', () => {
        const state = {
            ...INITIAL_STATE,
            hero: heroWithStats({ speed: 4 }),
            enemy: enemyWithStats({ health: 20 })
        };
        const nonDoubles = [{ value: 5, isRerolled: false }, { value: 2, isRerolled: false }];

        const updates = ability.onDamageRoll?.(state, 'hero', nonDoubles);

        expect(updates).toEqual({});
    });

});
