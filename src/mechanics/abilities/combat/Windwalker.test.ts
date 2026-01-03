import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './Windwalker';
import { heroWithStats, INITIAL_STATE } from '../../../tests/testUtils';

describe('Windwalker', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Windwalker')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should use speed dice for damage', () => {
        const state = {
            ...INITIAL_STATE,
            hero: heroWithStats({ speed: 5 }),
            phase: 'damage-roll' as const,
            winner: 'hero' as const,
            logs: []
        };
        const result = ability.onActivate?.(state, 'hero');

        expect(result?.phase).toBe('round-end');
        expect(result?.damageDealt).toHaveLength(1);
        // Should have rolled 5 dice. Sum >= 5.
        expect(result?.damageDealt![0].amount).toBeGreaterThanOrEqual(5);
        expect(result?.damageDealt![0].source).toBe('Windwalker');
    });
});
