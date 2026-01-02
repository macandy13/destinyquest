import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './Retaliation';
import { enemyWithStats, INITIAL_STATE, mockDiceRolls } from '../../tests/testUtils';

describe('Retaliation', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Retaliation')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should inflict damage back', () => {
        const state = {
            ...INITIAL_STATE,
            enemy: enemyWithStats({ health: 10 }),
            logs: []
        };

        mockDiceRolls([3]);

        const result = ability.onDamageDealt?.(state, 'hero', 'hero', 5);

        expect(result).toEqual(expect.objectContaining({
            enemy: expect.objectContaining({
                stats: expect.objectContaining({
                    health: 7
                })
            })
        }));
    });
});
