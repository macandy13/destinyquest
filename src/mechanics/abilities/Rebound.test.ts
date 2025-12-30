import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './Rebound';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Rebound', () => {
    it('should increase speed after taking damage', () => {
        const ability = getAbilityDefinition('Rebound');
        const state = { ...INITIAL_STATE, logs: [] };
        const result = ability?.onDamageDealt?.(state, 'hero', 5);

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.stats.speed).toBe(2);
    });
});
