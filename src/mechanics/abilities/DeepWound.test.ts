import { describe, it, expect } from 'vitest';
import { INITIAL_STATE } from '../../tests/testUtils';
import { getAbilityDefinition } from '../abilityRegistry';
import './DeepWound';

describe('Deep Wound', () => {
    it('should add 1 damage die', () => {
        const def = getAbilityDefinition('Deep Wound');
        // Deep Wound is "Roll an extra die when determining your damage score".
        // Type: 'combat' or 'passive'? Usually passive or modifier.
        // If it's `onActivate`, it serves as a boost.
        // If it's `passive` with `onDamageCalculate` or stats modification.
        // My previous implementation was `onActivate`.
        const state = { ...INITIAL_STATE };
        const updates = def!.onActivate!(state);

        expect(updates!.modifications![0].modification.stats.damageDice).toBe(1);
    });
});
