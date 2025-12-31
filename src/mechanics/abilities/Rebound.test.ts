import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './Rebound';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Rebound', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Rebound')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should increase speed after taking damage', () => {
        const state = INITIAL_STATE;
        const result = ability.onDamageDealt?.(state, 'hero', 5);

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.stats.speed).toBe(2);
    });
});
