import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './Ignite';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Ignite', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Ignite')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should inflict damage and apply burn', () => {
        const state = {
            ...INITIAL_STATE,
            phase: 'damage-roll' as const,
            winner: 'hero' as const,
        };

        expect(ability.canActivate?.(state)).toBe(true);

        const result = ability.onActivate?.(state);

        expect(result?.phase).toBe('round-end');
        expect(result?.damageDealt).toHaveLength(1);
        expect(result?.damageDealt![0].amount).toBeGreaterThanOrEqual(2);
        expect(result?.modifications).toHaveLength(2);
        expect(result?.modifications![0].modification.source).toBe('Ignite');
    });
});
