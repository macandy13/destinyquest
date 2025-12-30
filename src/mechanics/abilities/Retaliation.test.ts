import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './Retaliation';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Retaliation', () => {
    it('should inflict damage back', () => {
        const ability = getAbilityDefinition('Retaliation');
        const state = { ...INITIAL_STATE, logs: [] };
        const result = ability?.onDamageDealt?.(state, 'hero', 5);

        expect(result?.damageDealt).toHaveLength(1);
        expect(result?.damageDealt![0].amount).toBeGreaterThanOrEqual(1);
    });
});
