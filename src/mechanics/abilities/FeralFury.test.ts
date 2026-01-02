import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './FeralFury';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Feral Fury', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Feral Fury')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should add extra damage die', () => {
        const state = INITIAL_STATE;
        const result = ability.onActivate?.(state, 'hero');

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.stats.damageDice).toBe(1);
    });
});
