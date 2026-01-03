import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './Overload';
import { INITIAL_STATE } from '../../../tests/testUtils';
import { CombatState } from '../../../types/combat';

describe('Overload', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Overload')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should add extra damage die if winner is hero and phase is damage-roll', () => {
        const state: CombatState = {
            ...INITIAL_STATE,
            phase: 'damage-roll',
            winner: 'hero'
        };

        expect(ability.canActivate?.(state, 'hero')).toBe(true);

        const result = ability.onActivate?.(state, 'hero');

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.stats.damageDice).toBe(1);
    });

    it('should not activate if not damage-roll phase', () => {
        const state: CombatState = {
            ...INITIAL_STATE,
            phase: 'speed-roll',
            winner: 'hero'
        };

        expect(ability.canActivate?.(state, 'hero')).toBe(false);
        const result = ability.onActivate?.(state, 'hero');
        expect(result).toEqual({});
    });

    it('should not activate if winner is not hero', () => {
        const state: CombatState = {
            ...INITIAL_STATE,
            phase: 'damage-roll',
            winner: 'enemy'
        };

        expect(ability.canActivate?.(state, 'hero')).toBe(false);
        const result = ability.onActivate?.(state, 'hero');
        expect(result).toEqual({});
    });
});
