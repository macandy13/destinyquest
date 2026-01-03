import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './Rebound';
import { INITIAL_STATE } from '../../../tests/testUtils';

describe('Rebound', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Rebound')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should increase speed after taking damage', () => {
        const state = INITIAL_STATE;
        const result = ability.onDamageDealt?.(state, { owner: 'hero', target: 'hero' }, 'Attack', 5);

        expect(result?.hero.activeEffects).toHaveLength(1);
        expect(result?.hero.activeEffects![0].stats.speed).toBe(2);
    });
});
