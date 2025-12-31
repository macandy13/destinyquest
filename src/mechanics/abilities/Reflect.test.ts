import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './Reflect';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Reflect', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Reflect')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should reflect damage to vampire', () => {
        const state = {
            ...INITIAL_STATE,
            enemy: { ...INITIAL_STATE.enemy!, name: 'Vampire Lord' },
        };
        const result = ability.onDamageDealt?.(state, 'hero', 5);

        expect(result?.damageDealt).toHaveLength(1);
        expect(result?.damageDealt![0].amount).toBe(5);
    });

    it('should NOT reflect damage to non-vampire', () => {
        const state = {
            ...INITIAL_STATE,
            enemy: { ...INITIAL_STATE.enemy!, name: 'Goblin' },
        };
        const result = ability.onDamageDealt?.(state, 'hero', 5);

        expect(result).toEqual({});
    });
});
