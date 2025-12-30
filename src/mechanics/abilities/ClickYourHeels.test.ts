import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './ClickYourHeels';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Click Your Heels', () => {
    it('should add speed bonus modifier on activation', () => {
        const ability = getAbilityDefinition('Click Your Heels');
        const state = { ...INITIAL_STATE, logs: [] };
        const result = ability?.onActivate?.(state);

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.stats.speed).toBe(2);
        expect(result?.modifications![0].modification.target).toBe('hero');
        expect(result?.modifications![0].duration).toBe(1);
    });
});
