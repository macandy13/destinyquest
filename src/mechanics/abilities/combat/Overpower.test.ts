import { describe, it, expect, beforeEach, vi, afterEach, assert } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import { INITIAL_STATE, mockDiceRolls, createCombatant, MOCK_ENEMY } from '../../../tests/testUtils';
import './Overpower';

describe('Overpower', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Overpower')!;
        expect(def).toBeDefined();
        ability = def;
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should block attack and deal counter damage', () => {
        const enemy = createCombatant({
            ...MOCK_ENEMY,
            stats: { ...MOCK_ENEMY.stats, health: 20 }
        }) as any;

        const combatState = {
            ...INITIAL_STATE,
            phase: 'damage-roll' as const,
            winner: 'enemy' as const,
            enemy,
            round: 1,
            logs: [],
            damageDealt: []
        };

        mockDiceRolls([4, 5]);

        assert(ability.onActivate);
        const result = ability.onActivate(combatState, 'hero');
        assert(result !== null);

        expect(result).toEqual(expect.objectContaining({
            phase: 'round-end',
            damageRolls: [{ value: 0, isRerolled: false }],
            enemy: expect.objectContaining({
                stats: expect.objectContaining({
                    health: 11
                })
            })
        }));
    });

    it('should return empty object if conditions not met', () => {
        const combatState = {
            ...INITIAL_STATE,
            phase: 'combat-start' as const
        };

        assert(ability.onActivate);
        const result = ability.onActivate(combatState, 'hero');
        expect(result).toEqual({});
    });
});
