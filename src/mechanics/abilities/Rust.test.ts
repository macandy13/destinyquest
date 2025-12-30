import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './Rust';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Rust', () => {
    it('should reduce opponent armour', () => {
        const ability = getAbilityDefinition('Rust');
        const state = { ...INITIAL_STATE, logs: [] };
        const result = ability?.onActivate?.(state);

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.stats.armour).toBe(-2);
    });
});
