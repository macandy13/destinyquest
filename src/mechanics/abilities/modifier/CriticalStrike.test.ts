import { describe, it, expect, beforeEach } from 'vitest';
import { INITIAL_STATE } from '../../../tests/testUtils';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './CriticalStrike';

describe('Critical Strike', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Critical Strike')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should change all damage rolls to 6', () => {
        const state = {
            ...INITIAL_STATE,
            damageRolls: [
                { value: 1, isRerolled: false },
                { value: 3, isRerolled: false }]
        };

        const updates = ability.onActivate?.(state, 'hero');

        expect(updates!.damageRolls![0].value).toBe(6);
        expect(updates!.damageRolls![1].value).toBe(6);
    });
});
