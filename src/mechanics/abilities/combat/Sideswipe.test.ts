import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './Sideswipe';
import { INITIAL_STATE, mockDiceRolls } from '../../../tests/testUtils';

describe('Sideswipe', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Sideswipe')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should inflict damage back', () => {
        const state = INITIAL_STATE;
        mockDiceRolls([3]);

        const result = ability.onDamageDealt?.(state, { owner: 'hero', target: 'hero' }, 'Attack', 5);
        expect(result?.enemy.stats.health).toBe(state.enemy.stats.health - 3);
    });
});
