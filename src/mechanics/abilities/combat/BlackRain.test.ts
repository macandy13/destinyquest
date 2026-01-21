import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './BlackRain';
import { INITIAL_STATE, mockDiceRolls } from '../../../tests/testUtils';

describe('Black Rain', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Black Rain')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should inflict random damage to enemy', () => {
        const state = {
            ...INITIAL_STATE,
            phase: 'damage-roll' as const,
            winner: 'hero' as const
        };

        expect(ability.canActivate?.(state, { owner: 'hero' })).toBe(true);

        mockDiceRolls([6]); // Roll 6 damage
        const result = ability.onActivate?.(state, { owner: 'hero' });

        expect(result).toEqual(expect.objectContaining({
            phase: 'passive-damage',
            enemies: [expect.objectContaining({
                stats: expect.objectContaining({
                    health: INITIAL_STATE.enemies[0].stats.health - 6
                })
            })]
        }));
    });
});
