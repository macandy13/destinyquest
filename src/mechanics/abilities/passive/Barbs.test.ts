import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../../abilityRegistry';
import { INITIAL_STATE, enemyWithStats } from '../../../tests/testUtils';
import './Barbs';

describe('Barbs', () => {
    it('should inflict 1 damage to enemy on round end', () => {
        const barbs = getAbilityDefinition('Barbs');
        const state = {
            ...INITIAL_STATE,
            enemy: enemyWithStats({ health: 10 })
        };

        const updates = barbs?.onPassiveAbility?.(state, 'hero');

        expect(updates?.enemy?.stats.health).toBe(9);
        expect(updates?.logs?.[0].message).toContain('Barbs dealt 1 damage');
    });

    it('should not reduce enemy health below 0', () => {
        const barbs = getAbilityDefinition('Barbs');
        const state = {
            ...INITIAL_STATE,
            enemy: enemyWithStats({ health: 0 })
        };

        const updates = barbs?.onPassiveAbility?.(state, 'hero');
        expect(updates).toEqual({});
    });
});
