import { describe, it, expect } from 'vitest';
import { INITIAL_STATE } from '../../tests/testUtils';
import { getAbilityDefinition } from '../abilityRegistry';
import './Webbed';

describe('Webbed', () => {
    it('should reduce enemy speed dice by 1', () => {
        const def = getAbilityDefinition('Webbed');
        const state = { ...INITIAL_STATE };

        const updates = def!.onActivate!(state);

        expect(updates!.modifications![0].modification.stats.speedDice).toBe(-1);
        expect(updates!.modifications![0].modification.target).toBe('enemy');
    });
});
