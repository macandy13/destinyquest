import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './Reflect';
import { INITIAL_STATE } from '../../../tests/testUtils';
import { CombatState, getActiveEnemy } from '../../../types/combatState';

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
            enemies: [{
                ...INITIAL_STATE.enemies[0],
                name: 'Vampire Lord',
                original: {
                    ...INITIAL_STATE.enemies[0].original!,
                    abilities: ['Vampire']
                }
            }],
        };
        const result = ability.onDamageDealt?.(state, { owner: 'hero', target: 'hero' }, 'Attack', 5);

        // Check logs for reflected damage
        expect(result?.logs.some(l => l.message?.includes('Reflect dealt'))).toBe(true);
        // Check enemy health reduced
        expect(getActiveEnemy(result!).stats.health).toBeLessThan(INITIAL_STATE.enemies[0].stats.health);
    });

    it('should NOT reflect damage to non-vampire', () => {
        const state = {
            ...INITIAL_STATE,
            enemies: [{ ...INITIAL_STATE.enemies[0], name: 'Goblin' }],
        };
        const result = ability.onDamageDealt?.(state, { owner: 'hero', target: 'hero' }, 'Attack', 5);

        expect(result).toEqual(state);
    });
});
