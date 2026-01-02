import { describe, it, expect, beforeEach } from 'vitest';
import './FireAura'; // Register ability
import { getAbilityDefinition } from '../abilityRegistry';
import { INITIAL_STATE, enemyWithStats } from '../../tests/testUtils';
import { AbilityDefinition } from '../abilityRegistry';

describe('Fire Aura', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Fire Aura')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should inflict 1 damage to enemy on round end', () => {
        const state = {
            ...INITIAL_STATE,
            enemy: enemyWithStats({ health: 10 })
        };

        const updates = ability?.onRoundEnd?.(state, 'hero');

        expect(updates?.enemy?.stats.health).toBe(9);
        expect(updates?.logs?.[0].message).toContain('Fire Aura dealt 1 damage to Test Enemy');
    });
});
