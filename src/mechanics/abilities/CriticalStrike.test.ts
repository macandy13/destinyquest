import { describe, it, expect } from 'vitest';
import { INITIAL_STATE } from '../../tests/testUtils';
import { getAbilityDefinition } from '../abilityRegistry';
import './CriticalStrike';

describe('Critical Strike', () => {
    it('should change all damage rolls to 6', () => {
        const def = getAbilityDefinition('Critical Strike');
        const state = {
            ...INITIAL_STATE,
            damageRolls: [{ value: 1, isRerolled: false }, { value: 3, isRerolled: false }]
        };

        const updates = def!.onActivate!(state);

        expect(updates!.damageRolls![0].value).toBe(6);
        expect(updates!.damageRolls![1].value).toBe(6);
    });
});
