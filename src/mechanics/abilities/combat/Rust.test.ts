import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import { INITIAL_STATE } from '../../../tests/testUtils';
import { CombatState } from '../../../types/CombatState';
import './Rust';

describe('Rust', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Rust')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should reduce opponent armour if damage dealt', () => {
        let state: CombatState = {
            ...INITIAL_STATE,
        };

        const result = ability.onDamageDealt!(state, { owner: 'hero', target: 'enemy' }, 'Attack', 5);

        expect(result.enemy!.activeEffects).toHaveLength(1);
        expect(result.enemy!.activeEffects[0].stats.armour).toBe(-2);
    });

    it('should not activate if no damage dealt', () => {
        const state: CombatState = {
            ...INITIAL_STATE,
        };

        const result = ability.onDamageDealt!(state, { owner: 'hero', target: 'enemy' }, 'Attack', 0);
        expect(result).toBe(state);
    });
});
