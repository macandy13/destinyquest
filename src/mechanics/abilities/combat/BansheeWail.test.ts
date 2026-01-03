import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './BansheeWail';
import { INITIAL_STATE } from '../../../tests/testUtils';

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

        expect(ability.canActivate?.(state, { owner: 'hero' })).toBe(true);
        expect(ability.canActivate?.(state, { owner: 'enemy' })).toBe(false);

        const result = ability.onActivate?.(state, { owner: 'hero' });

        expect(result?.phase).toBe('passive-damage');
        expect(result?.damage?.damageRolls).toEqual([]);
    });
});
