import { describe, it, expect } from 'vitest';
import { INITIAL_STATE, enemyWithStats } from '../../tests/testUtils';
import { getAbilityDefinition } from '../abilityRegistry';
import './Piercing';

describe('Piercing', () => {
    it('should reduce enemy armour to 0', () => {
        const def = getAbilityDefinition('Piercing');
        const enemy = enemyWithStats({ armour: 5 });
        const state = { ...INITIAL_STATE, enemy };

        const updates = def!.onActivate!(state);

        expect(updates!.modifications![0].modification.stats.armour).toBe(-5);
        expect(updates!.modifications![0].modification.target).toBe('enemy');
    });
});
