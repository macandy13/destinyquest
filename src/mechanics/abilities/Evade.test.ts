import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './Evade';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Evade', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Evade')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should avoid damage', () => {
        const state = {
            ...INITIAL_STATE,
            phase: 'damage-roll' as const,
            winner: 'enemy' as const,
        };

        expect(ability.canActivate?.(state)).toBe(true);

        const result = ability.onActivate?.(state);

        expect(result?.phase).toBe('round-end');
        expect(result?.damageRolls).toEqual([{ value: 0, isRerolled: false }]);
    });

    it('should be disabled if Ensnared', () => {
        const state = {
            ...INITIAL_STATE,
            phase: 'damage-roll' as const,
            winner: 'enemy' as const,
            activeEffects: [{ modification: { source: 'Ensnare', target: 'hero' }, id: 'ensnare-1' }]
        };

        const canActivate = ability.canActivate?.(state);
        expect(canActivate).toBe(false);
    });
});
