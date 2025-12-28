import { describe, it, expect } from 'vitest';
import { INITIAL_STATE } from '../../tests/testUtils';
import { getAbilityDefinition } from '../abilityRegistry';
import './LastLaugh';

describe('Last Laugh', () => {
    it('should set reroll state', () => {
        const def = getAbilityDefinition('Last Laugh');
        const state = { ...INITIAL_STATE };

        const updates = def!.onActivate!(state);

        expect(updates!.rerollState!.source).toBe('Last Laugh');
        // Last laugh forces opponent to reroll.
        // The current generic reroll state might target 'hero-speed' or 'damage'.
        // Assuming LastLaugh implementation sets target appropriately (e.g. maybe undefined means choice, or specific).
        // Let's assume it initializes reroll flow.
        expect(updates!.rerollState).toBeDefined();
    });
});
