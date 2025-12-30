import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './Zapped';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Zapped!', () => {
    it('should reduce enemy stats on activation', () => {
        const ability = getAbilityDefinition('Zapped!');
        const state = { ...INITIAL_STATE, logs: [] };
        const result = ability?.onActivate?.(state);

        expect(result?.modifications).toHaveLength(1);
        const mod = result?.modifications![0];
        expect(mod?.modification.stats.speed).toBe(-3);
        expect(mod?.modification.stats.brawn).toBe(-3);
        expect(mod?.modification.stats.magic).toBe(-3);
        expect(mod?.modification.target).toBe('enemy');
        expect(mod?.duration).toBe(1);
    });
});
