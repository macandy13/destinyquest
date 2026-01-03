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
            damage: {
                damageRolls: [
                    { value: 1, isRerolled: false },
                    { value: 3, isRerolled: false }],
                modifiers: []
            }
        };

        const updates = ability.onActivate!(state, { owner: 'hero' });

        expect(updates!.damage!.damageRolls).toEqual([
            { value: 6, isRerolled: false },
            { value: 6, isRerolled: false }
        ]);
    });
});
