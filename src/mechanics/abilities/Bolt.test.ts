import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './Bolt';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Bolt', () => {
    it('should charge up when activated', () => {
        const ability = getAbilityDefinition('Bolt');
        const state = { ...INITIAL_STATE, phase: 'damage-roll' as const, winner: 'hero' as const, logs: [] };
        const result = ability?.onActivate?.(state);

        expect(result?.phase).toBe('round-end');
        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.source).toBe('Bolt');
    });

    it('should release damage on subsequent onDamageRoll', () => {
        const ability = getAbilityDefinition('Bolt');
        const state = {
            ...INITIAL_STATE,
            phase: 'damage-roll' as const,
            winner: 'hero' as const,
            logs: [],
            activeEffects: [{ modification: { source: 'Bolt', target: 'hero' }, id: 'bolt-1' }]
        };

        const result = ability?.onDamageRoll?.(state, []);
        // It should return updated state with damageDealt
        // Wait, onDamageRoll in Bolt implementation returns PartialState.

        expect(result?.damageDealt).toHaveLength(1);
        expect(result?.damageDealt![0].amount).toBeGreaterThanOrEqual(3);
        expect(result?.damageRolls).toEqual([{ value: 0, isRerolled: false }]);
        expect(result?.activeEffects).toEqual([]); // Charge removed
    });
});
