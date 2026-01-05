import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './Reflect';
import { INITIAL_STATE } from '../../../tests/testUtils';
import { CombatState } from '../../../types/combatState';

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
        const result = ability.onDamageDealt?.(state, { owner: 'hero', target: 'hero' }, 'Attack', 5);

        // Check logs for reflected damage
        expect(result?.logs.some(l => l.message?.includes('Reflect dealt'))).toBe(true);
        // Check enemy health reduced
        expect(result?.enemy.stats.health).toBeLessThan(INITIAL_STATE.enemy!.stats.health);
    });

    it('should NOT reflect damage to non-vampire', () => {
        const state = {
            ...INITIAL_STATE,
            enemy: { ...INITIAL_STATE.enemy!, name: 'Goblin' },
        };
        const result = ability.onDamageDealt?.(state, { owner: 'hero', target: 'hero' }, 'Attack', 5);

        expect(result).toEqual(state);
    });
});
