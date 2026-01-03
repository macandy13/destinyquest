import { describe, it, expect, beforeEach } from 'vitest';
import { getAbilityDefinition } from '../../abilityRegistry';
import './Lightning';
import { INITIAL_STATE, heroWithStats, enemyWithStats } from '../../../tests/testUtils';
import { AbilityDefinition } from '../../abilityRegistry';

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
        const updates = ability!.onDamageDealt!(state, { owner: 'hero', target: 'hero' }, 'Attack', 5);

        // Should trigger damage to Enemy
        expect(updates?.logs?.[0].message).toContain('Lightning dealt 2 damage');
    });

    it('should NOT trigger when enemy takes damage (offensive)', () => {
        const state = {
            ...INITIAL_STATE,
            hero: heroWithStats({ health: 20 }),
            enemy: enemyWithStats({ health: 20 })
        };

        // Enemy takes damage (target='enemy')
        const updates = ability!.onDamageDealt!(state, { owner: 'hero', target: 'enemy' }, 'Attack', 5);

        expect(updates).toBe(state);
    });
});
