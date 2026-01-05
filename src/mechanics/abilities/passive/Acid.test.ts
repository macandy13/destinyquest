import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './Acid';
import { INITIAL_STATE } from '../../../tests/testUtils';
import { deterministicRoll } from '../../../types/dice';

describe('Acid', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Acid')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should add 1 damage per die rolled', () => {
        const state = {
            ...INITIAL_STATE,
            damage: { damageRolls: deterministicRoll([1, 2, 3]), modifiers: [] }
        };
        const bonus = ability.onDamageCalculate!(state, { owner: 'hero' });
        expect(bonus).toBe(3);
    });
});
