import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './HeadButt';
import { INITIAL_STATE } from '../../../tests/testUtils';

describe('Head Butt', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Head Butt')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should stop opponent damage', () => {
        const state = {
            ...INITIAL_STATE,
            phase: 'damage-roll' as const,
            winner: 'enemy' as const,
        };

        expect(ability.canActivate?.(state, { owner: 'hero' })).toBe(true);

        const result = ability.onActivate?.(state, { owner: 'hero' });

        expect(result?.phase).toBe('passive-damage');
        expect(result?.damage?.damageRolls).toEqual([]);
    });
});
