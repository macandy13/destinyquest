import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './FeralFury';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Feral Fury', () => {
    it('should add extra damage die', () => {
        const ability = getAbilityDefinition('Feral Fury');
        const state = { ...INITIAL_STATE, logs: [] };
        const result = ability?.onActivate?.(state);

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.stats.damageDice).toBe(1);
    });
});
