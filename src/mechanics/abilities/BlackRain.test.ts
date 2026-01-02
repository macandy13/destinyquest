import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './BlackRain';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Black Rain', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Black Rain')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should inflict random damage to enemy', () => {
        const state = {
            ...INITIAL_STATE,
            phase: 'damage-roll' as const,
            winner: 'hero' as const
        };

        expect(ability.canActivate?.(state, 'hero')).toBe(true);

        const result = ability.onActivate?.(state, 'hero');

        expect(result?.phase).toBe('round-end');
        expect(result?.damageDealt).toHaveLength(1);
        expect(result?.damageDealt![0].target).toBe('enemy');
        expect(result?.damageDealt![0].amount).toBeGreaterThanOrEqual(1);
        expect(result?.damageDealt![0].source).toBe('Black Rain');
    });
});
