import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import { INITIAL_STATE } from '../../tests/testUtils';
import { CombatState } from '../../types/combat';
import './Dodge';

describe('Dodge', () => {
    it('should avoid damage', () => {
        const ability = getAbilityDefinition('Dodge');
        const state = { ...INITIAL_STATE, phase: 'damage-roll' as const, winner: 'enemy' as const, logs: [] };
        const result = ability?.onActivate?.(state, 'hero');

        expect(result?.phase).toBe('round-end');
        expect(result?.damageRolls).toEqual([{ value: 0, isRerolled: false }]);
    });

    it('should be disabled if Ensnared', () => {
        const ability = getAbilityDefinition('Dodge');
        const state: CombatState = {
            ...INITIAL_STATE,
            phase: 'damage-roll' as const,
            winner: 'enemy' as const,
            logs: [],
            activeEffects: [{
                modification: {
                    source: 'Ensnare',
                    target: 'hero',
                    stats: {}
                },
                id: 'ensnare-1'
            }]
        };

        const canActivate = ability?.canActivate?.(state, 'hero');
        expect(canActivate).toBe(false);
    });
});
