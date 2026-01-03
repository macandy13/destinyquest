import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './Disrupt';
import { INITIAL_STATE } from '../../../tests/testUtils';

describe('Disrupt', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Disrupt')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should apply magic reduction on damage dealt', () => {
        const state = {
            ...INITIAL_STATE,
            round: 1
        };

        const result = ability.onDamageDealt!(state, { owner: 'hero', target: 'enemy' }, 'Attack', 5);

        expect(result.enemy.activeEffects).toHaveLength(1);
        expect(result.enemy.activeEffects[0].stats.magic).toBe(-3);
        expect(result.enemy.activeEffects[0].target).toBe('enemy');
    });

    it('should not activate if no damage dealt (0 damage)', () => {
        const state = {
            ...INITIAL_STATE,
            round: 1
        };

        const result = ability.onDamageDealt!(state, { owner: 'hero', target: 'enemy' }, 'Attack', 0);
        expect(result).toEqual(state);
    });
});
