import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import { INITIAL_STATE, mockDiceRolls } from '../../../tests/testUtils';
import './ThornFist';

describe('Thorn Fist', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Thorn Fist')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should inflict 2 dice damage back', () => {
        const state = INITIAL_STATE;
        mockDiceRolls([2, 3]);

        const result = ability.onDamageDealt?.(state, { owner: 'hero', target: 'hero' }, 'Attack', 5);

        expect(result?.enemy.stats.health).toBe(INITIAL_STATE.enemy.stats.health - 5);
    });
});
