import { describe, it, expect, beforeEach } from 'vitest';
import './Thorns'; // Register ability
import { getAbilityDefinition } from '../../abilityRegistry';
import { INITIAL_STATE, enemyWithStats } from '../../../tests/testUtils';
import { AbilityDefinition } from '../../abilityRegistry';

describe('Thorns', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Thorns')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should inflict 1 damage to enemy on round end', () => {
        const state = {
            ...INITIAL_STATE,
            enemies: [enemyWithStats({ health: 10 })], activeEnemyIndex: 0
        };

        const result = ability.onPassiveAbility?.(state, { owner: 'hero' });

        expect(result).toEqual(expect.objectContaining({
            enemies: [expect.objectContaining({
                stats: expect.objectContaining({
                    health: 9
                })
            })]
        }));
    });
});
