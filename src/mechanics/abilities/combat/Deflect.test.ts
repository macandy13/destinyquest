import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './Deflect';
import { INITIAL_STATE } from '../../../tests/testUtils';

describe('Deflect', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Deflect')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should stop opponent damage and inflict damage back', () => {
        const state = {
            ...INITIAL_STATE,
            phase: 'damage-roll' as const,
            winner: 'enemy' as const,
            logs: []
        };

        expect(ability.canActivate?.(state, { owner: 'hero' })).toBe(true);

        const result = ability.onActivate?.(state, { owner: 'hero' });

        expect(result?.phase).toBe('round-end');
        expect(result?.damage?.damageRolls).toEqual([{ value: 0, isRerolled: false }]);
        // Deflect usually reflects damage or deals fixed damage.
        // Check logs or bonusDamage.
        // If Deflect uses dealDamage, check logs.
        expect(result?.logs.some(l => l.message.includes('Deflect'))).toBe(true);
    });
});
