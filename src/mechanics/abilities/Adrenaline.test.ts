import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './Adrenaline';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Adrenaline', () => {
    it('should add speed bonus modifier on activation', () => {
        const adrenaline = getAbilityDefinition('Adrenaline');
        const state = { ...INITIAL_STATE, logs: [] };
        const result = adrenaline?.onActivate?.(state);

        expect(result?.modifiers).toHaveLength(1);
        expect(result?.modifiers![0]).toMatchObject({
            name: 'Adrenaline',
            type: 'speed-bonus',
            value: 2,
            duration: 2
        });
    });
});
