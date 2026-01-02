import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './Slam';
import { INITIAL_STATE } from '../../tests/testUtils';

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
            winner: 'enemy' as const
        };

        expect(ability.canActivate?.(state, 'hero')).toBe(true);

        const result = ability.onActivate?.(state, 'hero');

        expect(result?.phase).toBe('round-end');
        expect(result?.damageRolls).toEqual([{ value: 0, isRerolled: false }]);
        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.stats.speed).toBe(-1);
    });
});
