import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './NaturesRevenge';
import { INITIAL_STATE } from '../../../tests/testUtils';
import { getActiveEnemy } from '../../../types/combatState';

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

        expect(ability.canActivate?.(state, { owner: 'hero' })).toBe(true);

        const result = ability.onActivate?.(state, { owner: 'hero' });

        // Check logs for damage
        expect(result?.logs.some(l => l.message.includes("Nature's Revenge"))).toBe(true);

        // Use activeEffects check for speed debuff
        expect(getActiveEnemy(result!).activeEffects).toHaveLength(1);
        expect(getActiveEnemy(result!).activeEffects[0].stats.speed).toBe(-1);
    });
});
