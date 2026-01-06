import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../../abilityRegistry';
import { INITIAL_STATE, enemyWithStats } from '../../../tests/testUtils';
import './Barbs';

describe('Barbs', () => {
    it('should inflict 1 damage to enemy on round end', () => {
        const barbs = getAbilityDefinition('Barbs');
        const state = {
            ...INITIAL_STATE,
            enemy: enemyWithStats({ health: 10 })
        };

        const updates = barbs?.onPassiveAbility?.(state, { owner: 'hero' });

        expect(updates?.damageDealt).toEqual(expect.arrayContaining([
            expect.objectContaining({
                source: 'Barbs',
                amount: 1
            })
        ]));
    });
});
