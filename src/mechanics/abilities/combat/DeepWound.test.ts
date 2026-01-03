import { describe, it, expect, beforeEach } from 'vitest';
import { INITIAL_STATE } from '../../../tests/testUtils';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './DeepWound';

describe('Deep Wound', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Deep Wound')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should add 1 damage die', () => {
        const state = {
            ...INITIAL_STATE,
            phase: 'damage-roll' as const
        };
        const updates = ability.onActivate?.(state, { owner: 'hero' });

        expect(updates!.hero.activeEffects[0].stats.damageDice).toBe(1);
    });
});
