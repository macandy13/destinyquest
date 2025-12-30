import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './Command';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Command', () => {
    it('should set winner to hero', () => {
        const ability = getAbilityDefinition('Command');
        const state = { ...INITIAL_STATE, phase: 'damage-roll' as const, winner: 'enemy' as const, logs: [] };
        const result = ability?.onActivate?.(state);

        expect(result?.winner).toBe('hero');
    });
});
