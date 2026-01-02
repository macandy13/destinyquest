import { describe, it, expect, beforeEach } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './Lightning';
import { INITIAL_STATE, heroWithStats, enemyWithStats } from '../../tests/testUtils';
import { AbilityDefinition } from '../abilityRegistry';

describe('Lightning', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Lightning')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should inflict 2 damage back when hero takes damage', () => {
        const state = {
            ...INITIAL_STATE,
            hero: heroWithStats({ health: 20 }),
            enemy: enemyWithStats({ health: 20 })
        };

        // Hero takes damage (target='hero')
        const updates = ability?.onDamageDealt?.(state, 'hero', 'hero', 5);

        // Should trigger damage to Enemy
        expect(updates?.damageDealt).toHaveLength(1); // Appending to existing
        expect(updates?.damageDealt?.[0]).toMatchObject({ target: 'enemy', amount: 2, source: 'Lightning' });
        expect(updates?.logs?.[0].message).toContain('Lightning! Inflicted 2 damage back');
    });

    it('should NOT trigger when enemy takes damage (offensive)', () => {
        const state = {
            ...INITIAL_STATE,
            hero: heroWithStats({ health: 20 }),
            enemy: enemyWithStats({ health: 20 })
        };

        // Enemy takes damage (target='enemy')
        const updates = ability?.onDamageDealt?.(state, 'hero', 'enemy', 5);

        expect(updates).toEqual({});
    });
});
