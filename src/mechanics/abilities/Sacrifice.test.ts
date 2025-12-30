import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './Sacrifice';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Sacrifice', () => {
    it('should absorb damage and remove shades', () => {
        const ability = getAbilityDefinition('Sacrifice');
        const state = {
            ...INITIAL_STATE,
            phase: 'damage-roll' as const,
            winner: 'enemy' as const,
            activeEffects: [{ modification: { source: 'Shades', target: 'hero' }, id: 'shades-1' }],
            logs: []
        };
        const result = ability?.onActivate?.(state);

        expect(result?.phase).toBe('round-end');
        expect(result?.damageRolls).toEqual([{ value: 0, isRerolled: false }]);
        expect(result?.activeEffects).toEqual([]); // Shades removed
    });
});
