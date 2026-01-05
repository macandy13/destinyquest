import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './Corruption';
import { INITIAL_STATE } from '../../../tests/testUtils';
import { CombatState } from '../../../types/combatState';

describe('Corruption', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Corruption')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should apply corruption buff on damage dealt', () => {
        const state: CombatState = {
            ...INITIAL_STATE,
        };

        const result = ability.onDamageDealt!(state, { owner: 'hero', target: 'enemy' }, 'Attack', 5);

        expect(result.enemy.activeEffects).toHaveLength(1);
        expect(result.enemy.activeEffects[0].stats.brawn).toBe(-2);
        expect(result.enemy.activeEffects[0].stats.magic).toBe(-2);
        expect(result.enemy.activeEffects[0].target).toBe('enemy');
    });

    it('should not activate if no damage dealt (0 damage)', () => {
        const state: CombatState = {
            ...INITIAL_STATE,
        };

        const result = ability.onDamageDealt!(state, { owner: 'hero' }, 'Attack', 0);
        expect(result).toBe(state);
    });
});
