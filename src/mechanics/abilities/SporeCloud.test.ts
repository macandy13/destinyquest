import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './SporeCloud';
import { INITIAL_STATE, mockDiceRolls } from '../../tests/testUtils';

describe('Spore Cloud', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Spore Cloud')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should inflict 2 dice damage back', () => {
        const state = INITIAL_STATE;
        mockDiceRolls([2, 3]);

        const result = ability.onDamageDealt?.(state, 'hero', 'hero', 5);

        expect(result?.damageDealt).toHaveLength(1);
        expect(result?.damageDealt![0].amount).toBeGreaterThanOrEqual(5);
    });
});
