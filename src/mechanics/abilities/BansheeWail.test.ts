import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './BansheeWail';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Banshee Wail', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Banshee Wail')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should stop opponent damage roll', () => {
        const state = {
            ...INITIAL_STATE,
            phase: 'damage-roll' as const,
            winner: 'enemy' as const,
        };

        expect(ability.canActivate?.(state, 'hero')).toBe(true);

        const result = ability.onActivate?.(state, 'hero');

        expect(result?.phase).toBe('round-end');
        expect(result?.damageRolls).toEqual([]);
    });
});
