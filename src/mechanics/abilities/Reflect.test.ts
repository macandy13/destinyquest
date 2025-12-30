import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './Reflect';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Reflect', () => {
    it('should reflect damage to vampire', () => {
        const ability = getAbilityDefinition('Reflect');
        const state = {
            ...INITIAL_STATE,
            enemy: { ...INITIAL_STATE.enemy!, name: 'Vampire Lord' },
            logs: []
        };
        const result = ability?.onDamageDealt?.(state, 'hero', 5);

        expect(result?.damageDealt).toHaveLength(1);
        expect(result?.damageDealt![0].amount).toBe(5);
    });

    it('should NOT reflect damage to non-vampire', () => {
        const ability = getAbilityDefinition('Reflect');
        const state = {
            ...INITIAL_STATE,
            enemy: { ...INITIAL_STATE.enemy!, name: 'Goblin' },
            logs: []
        };
        const result = ability?.onDamageDealt?.(state, 'hero', 5);

        expect(result).toEqual({});
    });
});
