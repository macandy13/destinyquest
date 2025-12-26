import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './Barbs';
import { INITIAL_STATE, MOCK_ENEMY } from '../../tests/testUtils';

describe('Barbs', () => {
    it('should inflict 1 damage to enemy on round end', () => {
        const barbs = getAbilityDefinition('Barbs');
        const state = { ...INITIAL_STATE, enemy: { ...MOCK_ENEMY, health: 10 } };

        const updates = barbs?.onRoundEnd?.(state);

        expect(updates?.enemy?.health).toBe(9);
        expect(updates?.logs?.[0].message).toContain('Barbs inflicts 1 damage');
    });

    it('should not reduce enemy health below 0', () => {
        const barbs = getAbilityDefinition('Barbs');
        const state = { ...INITIAL_STATE, enemy: { ...MOCK_ENEMY, health: 0 } };

        const updates = barbs?.onRoundEnd?.(state);
        expect(updates).toEqual({});
    });
});
