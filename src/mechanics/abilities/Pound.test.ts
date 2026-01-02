import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './Pound';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Pound', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Pound')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should apply damage buff and self speed debuff', () => {
        const state = INITIAL_STATE;
        const result = ability.onActivate?.(state, 'hero');

        expect(result?.modifications).toHaveLength(2);
        expect(result?.modifications![0].modification.stats.damageModifier).toBe(3);
        expect(result?.modifications![1].modification.stats.speed).toBe(-1);
    });
});
