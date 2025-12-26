import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './Charge';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Charge', () => {
    it('should increase speed by 2', () => {
        const charge = getAbilityDefinition('Charge');
        const state = { ...INITIAL_STATE, logs: [] };
        const result = charge?.onActivate?.(state);

        expect(result?.modifiers).toHaveLength(1);
        expect(result?.modifiers![0]).toMatchObject({
            name: 'Charge',
            type: 'speed-bonus',
            value: 2,
            duration: 1
        });
    });
});
