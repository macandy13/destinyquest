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
        expect(ability.canActivate?.(validState, 'hero')).toBe(true);

        // Invalid phase
        const invalidPhase = { ...INITIAL_STATE, phase: 'speed-roll', winner: 'enemy' };
        // @ts-ignore - Partial state
        expect(ability.canActivate?.(invalidPhase, 'hero')).toBe(false);

        // Invalid winner
        const invalidWinner = { ...INITIAL_STATE, phase: 'damage-roll', winner: 'hero' };
        // @ts-ignore - Partial state
        expect(ability.canActivate?.(invalidWinner, 'hero')).toBe(false);

        // @ts-ignore - Partial state
        const updates = ability.onActivate?.(validState, 'hero');

        expect(updates?.phase).toBe('round-end');
        expect(updates?.damageRolls).toEqual([{ value: 0, isRerolled: false }]);
        expect(updates?.logs?.[0].message).toContain('blocked');
    });
});
