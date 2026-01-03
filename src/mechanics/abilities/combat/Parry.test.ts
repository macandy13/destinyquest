import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './Parry';
import { INITIAL_STATE } from '../../../tests/testUtils';

describe('Parry', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Parry')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should be activatable only in damage-roll phase when enemy won', () => {
        // Valid state
        const validState = { ...INITIAL_STATE, phase: 'damage-roll', winner: 'enemy' };
        // @ts-ignore - Partial state
        expect(ability.canActivate?.(validState, { owner: 'hero' })).toBe(true);

        // Invalid phase
        const invalidPhase = { ...INITIAL_STATE, phase: 'speed-roll', winner: 'enemy' };
        // @ts-ignore - Partial state
        expect(ability.canActivate?.(invalidPhase, { owner: 'hero' })).toBe(false);

        // Invalid winner
        const invalidWinner = { ...INITIAL_STATE, phase: 'damage-roll', winner: 'hero' };
        // @ts-ignore - Partial state
        expect(ability.canActivate?.(invalidWinner, { owner: 'hero' })).toBe(false);

        // @ts-ignore - Partial state
        const updates = ability.onActivate?.(validState, { owner: 'hero' });

        expect(updates?.phase).toBe('round-end');
        expect(updates?.damage?.damageRolls).toEqual([{ value: 0, isRerolled: false }]);
        expect(updates?.logs?.[0].message).toContain('blocked');
    });
});
