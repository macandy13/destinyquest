import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './Vanish';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Vanish', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Vanish')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should avoid damage', () => {
        const state = {
            ...INITIAL_STATE,
            phase: 'damage-roll' as const,
            winner: 'enemy' as const,
            logs: []
        };

        expect(ability.canActivate?.(state)).toBe(true);

        const result = ability.onActivate?.(state);

        expect(result?.phase).toBe('round-end');
        expect(result?.damageRolls).toEqual([{ value: 0, isRerolled: false }]);
    });
});
