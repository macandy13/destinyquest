import { describe, expect, it, beforeEach } from 'vitest';
import { CombatState, requireAbilityDefinition } from '../../../types/combatState';
import {
    createCombatant,
    MOCK_HERO,
    MOCK_ENEMY,
    INITIAL_STATE
} from '../../../tests/testUtils';
import '../../allAbilities';

describe('Immunity Abilities', () => {
    let state: CombatState;

    beforeEach(() => {
        state = {
            ...INITIAL_STATE,
            enemy: createCombatant({
                ...MOCK_ENEMY,
                stats: { ...MOCK_ENEMY.stats, health: 30, maxHealth: 30 }
            }),
            hero: createCombatant(MOCK_HERO),
        };
    });

    it('Body of bone: should heal damage from Bleed', () => {
        state.enemy.stats.health = 25; // Taken 5 damage

        const def = requireAbilityDefinition('Body of bone');
        state = def.onDamageDealt!(
            state,
            { owner: 'enemy', target: 'enemy' },
            'bleed',
            5
        );

        // Should heal back the 5 damage (immune to bleed)
        expect(state.enemy.stats.health).toBe(30);
        expect(state.logs.some(l => l.message?.includes('immune'))).toBe(true);
    });

    it('Body of bone: should not heal damage from Attack', () => {
        state.enemy.stats.health = 25; // Taken 5 damage

        const def = requireAbilityDefinition('Body of bone');
        state = def.onDamageDealt!(
            state,
            { owner: 'enemy', target: 'enemy' },
            'attack',
            5
        );

        // Should NOT heal - attack is not an immunity
        expect(state.enemy.stats.health).toBe(25);
    });

    it('Iron Clad: should be immune to Piercing', () => {
        state.enemy.stats.health = 25; // Taken 5 damage

        const def = requireAbilityDefinition('Iron Clad');
        state = def.onDamageDealt!(
            state,
            { owner: 'enemy', target: 'enemy' },
            'piercing',
            5
        );

        expect(state.enemy.stats.health).toBe(30);
    });
});
