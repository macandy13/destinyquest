import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './Quicksilver';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Quicksilver', () => {
    it('should add speed bonus modifier on activation', () => {
        const quicksilver = getAbilityDefinition('Quicksilver');
        const state = { ...INITIAL_STATE, logs: [] };
        const result = quicksilver?.onActivate?.(state);

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.stats.speed).toBe(2);
        expect(result?.modifications![0].duration).toBe(1);
    });
});
