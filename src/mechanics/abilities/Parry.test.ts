import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './Parry';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Parry', () => {
    it('should be activatable only in damage-roll phase when enemy won', () => {
        const parry = getAbilityDefinition('Parry');

        // Valid state
        const validState = { ...INITIAL_STATE, phase: 'damage-roll', winner: 'enemy' };
        // @ts-ignore - Partial state
        expect(parry?.canActivate?.(validState)).toBe(true);

        // Invalid phase
        const invalidPhase = { ...INITIAL_STATE, phase: 'speed-roll', winner: 'enemy' };
        // @ts-ignore - Partial state
        expect(parry?.canActivate?.(invalidPhase)).toBe(false);

        // Invalid winner
        const invalidWinner = { ...INITIAL_STATE, phase: 'damage-roll', winner: 'hero' };
        // @ts-ignore - Partial state
        expect(parry?.canActivate?.(invalidWinner)).toBe(false);

        // @ts-ignore - Partial state
        const updates = parry?.onActivate?.(validState);

        expect(updates?.phase).toBe('round-end');
        expect(updates?.damageRolls).toEqual([{ value: 0, isRerolled: false }]);
        expect(updates?.logs?.[0].message).toContain('blocked');
    });
});
