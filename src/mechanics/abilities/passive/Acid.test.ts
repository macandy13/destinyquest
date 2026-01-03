import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './Acid';
import { INITIAL_STATE } from '../../../tests/testUtils';

describe('Acid', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Acid')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should add 1 damage per die rolled', () => {
        const state = { ...INITIAL_STATE, damageRolls: [{ value: 1, isRerolled: false }, { value: 4, isRerolled: false }, { value: 6, isRerolled: false }] };
        const bonus = ability.onDamageCalculate?.(state, 'hero', 'hero', 10);
        expect(bonus).toBe(3);
    });
});
