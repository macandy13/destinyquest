import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './Reflect';
import { INITIAL_STATE } from '../../tests/testUtils';
import { CombatState } from '../../types/combat';

describe('Reflect', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Reflect')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should reflect damage to vampire', () => {
        const state: CombatState = {
            ...INITIAL_STATE,
            enemy: {
                ...INITIAL_STATE.enemy!,
                name: 'Vampire Lord',
                original: {
                    ...INITIAL_STATE.enemy!.original!,
                    abilities: ['Vampire']
                }
            },
        };
        const result = ability.onDamageDealt?.(state, 'hero', 'hero', 5);

        expect(result?.damageDealt).toHaveLength(1);
        expect(result?.damageDealt![0].amount).toBe(5);
    });

    it('should NOT reflect damage to non-vampire', () => {
        const state = {
            ...INITIAL_STATE,
            enemy: { ...INITIAL_STATE.enemy!, name: 'Goblin' },
        };
        const result = ability.onDamageDealt?.(state, 'hero', 'enemy', 5);

        expect(result).toEqual({});
    });
});
