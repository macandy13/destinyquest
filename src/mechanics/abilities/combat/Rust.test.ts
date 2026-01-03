import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './Rust';
import { INITIAL_STATE } from '../../../tests/testUtils';
import { CombatState } from '../../../types/combat';

describe('Rust', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Rust')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should reduce opponent armour if damage dealt', () => {
        const state: CombatState = {
            ...INITIAL_STATE,
            damageDealt: [{ target: 'enemy', amount: 1, source: 'Attack' }],
        };

        expect(ability.canActivate?.(state, 'hero')).toBe(true);

        const result = ability.onActivate?.(state, 'hero');

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.stats.armour).toBe(-2);
    });

    it('should not activate if no damage dealt', () => {
        const state: CombatState = {
            ...INITIAL_STATE,
            damageDealt: [],
        };

        expect(ability.canActivate?.(state, 'hero')).toBe(false);
        const result = ability.onActivate?.(state, 'hero');
        expect(result).toEqual({});
    });
});
