import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './Slam';
import { INITIAL_STATE } from '../../../tests/testUtils';

describe('Slam', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Slam')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should stop opponent damage and slow them', () => {
        const state = {
            ...INITIAL_STATE,
            phase: 'damage-roll' as const,
            winner: 'enemy' as const,
            damage: {
                damageRolls: [{ value: 6, isRerolled: false }],
                modifiers: []
            }
        };

        expect(ability.canActivate?.(state, { owner: 'hero' })).toBe(true);

        const result = ability.onActivate?.(state, { owner: 'hero' });

        expect(result?.phase).toBe('round-end');
        // Slam implementation clears damage rolls.
        expect(result?.damage?.damageRolls).toEqual([]);
        expect(result?.enemy.activeEffects).toHaveLength(1);
        expect(result?.enemy.activeEffects[0].stats.speed).toBe(-1);
    });
});
