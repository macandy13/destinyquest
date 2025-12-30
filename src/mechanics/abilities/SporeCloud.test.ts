import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './SporeCloud';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Spore Cloud', () => {
    it('should inflict 2 dice damage back', () => {
        const ability = getAbilityDefinition('Spore Cloud');
        const state = { ...INITIAL_STATE, logs: [] };
        const result = ability?.onDamageDealt?.(state, 'hero', 5);

        expect(result?.damageDealt).toHaveLength(1);
        expect(result?.damageDealt![0].amount).toBeGreaterThanOrEqual(2);
    });
});
