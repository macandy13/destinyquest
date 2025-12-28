import { describe, it, expect } from 'vitest';
import { INITIAL_STATE } from '../../tests/testUtils';
import { getAbilityDefinition } from '../abilityRegistry';
import './Sidestep';

describe('Sidestep', () => {
    it('should boost armour by 200 on activation', () => {
        const def = getAbilityDefinition('Sidestep');
        const state = { ...INITIAL_STATE };

        const updates = def!.onActivate!(state);

        expect(updates!.modifications![0].modification.stats.armour).toBe(200);
        expect(updates!.modifications![0].duration).toBe(1);
    });
});
