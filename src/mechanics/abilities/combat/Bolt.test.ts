import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import { INITIAL_STATE, mockDiceRolls } from '../../../tests/testUtils';
import { CombatState } from '../../../types/combat';
import './Bolt';

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

        expect(ability.canActivate?.(state, 'hero')).toBe(true);

        const result = ability.onActivate?.(state, 'hero');

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
                    target: 'hero',
                    stats: {}
                }, id: 'bolt-1'
            }]
        };

        mockDiceRolls([1, 2, 3]);

        const result = ability.onDamageRoll?.(state, 'hero', []);

        expect(result?.damageDealt).toHaveLength(1);
        expect(result?.damageDealt![0].amount).toBeGreaterThanOrEqual(3);
        expect(result?.damageRolls).toEqual([{ value: 1, isRerolled: false }, { value: 2, isRerolled: false }, { value: 3, isRerolled: false }]);
        expect(result?.activeEffects).toEqual([]); // Charge removed
    });
});
