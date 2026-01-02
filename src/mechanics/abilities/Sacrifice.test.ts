import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './Sacrifice';
import { INITIAL_STATE } from '../../tests/testUtils';
import { CombatState } from '../../types/combat';

describe('Sacrifice', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Sacrifice')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should absorb damage and remove shades', () => {
        const state: CombatState = {
            ...INITIAL_STATE,
            phase: 'damage-roll' as const,
            winner: 'enemy' as const,
            activeEffects: [{
                modification: {
                    stats: {},
                    source: 'Shades',
                    target: 'hero'
                }, id: 'shades-1'
            }],
        };

        expect(ability.canActivate?.(state, 'hero')).toBe(true);

        const result = ability.onActivate?.(state, 'hero');

        expect(result?.phase).toBe('round-end');
        expect(result?.damageRolls).toEqual([{ value: 0, isRerolled: false }]);
        expect(result?.activeEffects).toEqual([]); // Shades removed
    });
});
