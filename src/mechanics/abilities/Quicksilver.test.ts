import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './Quicksilver';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Quicksilver', () => {
    it('should add speed bonus modifier on activation', () => {
        const quicksilver = getAbilityDefinition('Quicksilver');
        const state = { ...INITIAL_STATE, logs: [] };
        const result = quicksilver?.onActivate?.(state);

        expect(result?.modifiers).toHaveLength(1);
        expect(result?.modifiers![0]).toMatchObject({
            name: 'Quicksilver',
            type: 'speed-bonus',
            value: 2,
            duration: 1
        });
    });
});
