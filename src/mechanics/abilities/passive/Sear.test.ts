import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './Sear';
import { INITIAL_STATE } from '../../../tests/testUtils';

describe('Sear', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Sear')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should add 1 per damage die', () => {
        const state = {
            ...INITIAL_STATE,
            damage: {
                damageRolls: [{ value: 1, isRerolled: false }, { value: 6, isRerolled: false }],
                modifiers: []
            }
        };
        const bonus = ability.onDamageCalculate?.(state, { owner: 'hero' });

        expect(bonus).toBe(2);
    });

    it('should return 0 if no dice', () => {
        const state = {
            ...INITIAL_STATE,
            damage: {
                damageRolls: [],
                modifiers: []
            }
        };
        const bonus = ability.onDamageCalculate?.(state, { owner: 'hero' });
        expect(bonus).toBe(0);
    });
});
