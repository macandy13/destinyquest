import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './ThornFist';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Thorn Fist', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Thorn Fist')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should inflict 2 dice damage back', () => {
        const state = INITIAL_STATE;
        const result = ability.onDamageDealt?.(state, 'hero', 5);

        expect(result?.damageDealt).toHaveLength(1);
        expect(result?.damageDealt![0].amount).toBeGreaterThanOrEqual(2);
    });
});
