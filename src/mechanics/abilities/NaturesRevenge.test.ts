import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './NaturesRevenge';
import { INITIAL_STATE } from '../../tests/testUtils';

describe("Nature's Revenge", () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition("Nature's Revenge")!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should inflict damage and slow opponent', () => {
        const state = {
            ...INITIAL_STATE,
            phase: 'damage-roll' as const,
            winner: 'hero' as const,
            logs: []
        };

        expect(ability.canActivate?.(state)).toBe(true);

        const result = ability.onActivate?.(state);

        expect(result?.phase).toBe('round-end');
        expect(result?.damageDealt).toHaveLength(1);
        expect(result?.damageDealt![0].amount).toBeGreaterThanOrEqual(2);
        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.stats.speed).toBe(-1);
    });
});
