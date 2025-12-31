import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './Bolt';
import { INITIAL_STATE } from '../../tests/testUtils';
import { CombatState } from '../../types/combat';

describe('Bolt', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Bolt')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should charge up when activated', () => {
        const state: CombatState = {
            ...INITIAL_STATE,
            phase: 'damage-roll' as const,
            winner: 'hero' as const
        };

        expect(ability.canActivate?.(state)).toBe(true);

        const result = ability.onActivate?.(state);

        expect(result?.phase).toBe('round-end');
        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.source).toBe('Bolt');
    });

    it('should release damage on subsequent onDamageRoll', () => {
        const state: CombatState = {
            ...INITIAL_STATE,
            phase: 'damage-roll' as const,
            winner: 'hero' as const,
            activeEffects: [{
                modification: {
                    source: 'Bolt',
                    target: 'hero'
                }, id: 'bolt-1'
            }]
        };

        const result = ability.onDamageRoll?.(state, []);

        expect(result?.damageDealt).toHaveLength(1);
        expect(result?.damageDealt![0].amount).toBeGreaterThanOrEqual(3);
        expect(result?.damageRolls).toEqual([{ value: 0, isRerolled: false }]);
        expect(result?.activeEffects).toEqual([]); // Charge removed
    });
});
