import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './ThornArmour';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Thorn Armour', () => {
    it('should buff armour and inflict damage', () => {
        const ability = getAbilityDefinition('Thorn Armour');
        const state = { ...INITIAL_STATE, logs: [] };
        const result = ability?.onActivate?.(state);

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.stats.armour).toBe(3);
        expect(result?.damageDealt).toHaveLength(1);
        expect(result?.damageDealt![0].amount).toBeGreaterThanOrEqual(1);
    });
});
