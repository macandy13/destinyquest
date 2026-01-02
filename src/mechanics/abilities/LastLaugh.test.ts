import { describe, it, expect, beforeEach } from 'vitest';
import { INITIAL_STATE } from '../../tests/testUtils';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './LastLaugh';

describe('Last Laugh', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Last Laugh')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should set reroll state', () => {
        const state = INITIAL_STATE;

        const updates = ability.onActivate?.(state, 'hero');

        expect(updates!.rerollState!.source).toBe('Last Laugh');
        // Last laugh forces opponent to reroll.
        expect(updates!.rerollState).toBeDefined();
    });
});
