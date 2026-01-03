import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './Leech';
import { INITIAL_STATE, heroWithStats } from '../../../tests/testUtils';

describe('Leech', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Leech')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should heal hero when damage is dealt to enemy', () => {
        const state = {
            ...INITIAL_STATE,
            // Hero missing health
            hero: heroWithStats({ health: 20, maxHealth: 30 })
        };

        const updates = ability.onDamageDealt?.(state, 'hero', 'enemy', 5);

        expect(updates?.hero?.stats.health).toBe(22);
        expect(updates?.logs?.[0].message).toContain('Leech healed 2 health');
    });

    it('should not heal if no damage dealt', () => {
        const state = {
            ...INITIAL_STATE,
            hero: heroWithStats({ health: 20, maxHealth: 30 })
        };

        const updates = ability.onDamageDealt?.(state, 'hero', 'enemy', 0);
        expect(updates).toEqual({});
    });

    it('should not heal beyond max health', () => {
        const state = {
            ...INITIAL_STATE,
            hero: heroWithStats({ health: 29, maxHealth: 30 })
        };

        const updates = ability.onDamageDealt?.(state, 'hero', 'enemy', 5);
        expect(updates?.hero?.stats.health).toBe(30);
    });
});
