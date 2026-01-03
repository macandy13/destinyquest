import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './Charm';
import { INITIAL_STATE } from '../../../tests/testUtils';

describe('Charm', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Charm')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should allow activation when rolls exist', () => {
        // Speed phase
        const speedState = {
            ...INITIAL_STATE,
            phase: 'speed-roll',
            heroSpeedRolls: [{ value: 2, isRerolled: false }, { value: 3, isRerolled: false }]
        };
        // @ts-ignore - Partial state for test
        expect(ability.canActivate?.(speedState, 'hero')).toBe(true);

        // Damage phase (hero winning) -> implicitly round-end after resolution
        const damageState = {
            ...INITIAL_STATE,
            phase: 'damage-roll',
            winner: 'hero',
            damageRolls: [{ value: 4, isRerolled: false }]
        };
        // @ts-ignore - Partial state for test
        expect(ability.canActivate?.(damageState, 'hero')).toBe(true);

        // Invalid phases
        const startState = { ...INITIAL_STATE, phase: 'combat-start' };
        // @ts-ignore - Partial state for test
        expect(ability.canActivate?.(startState, 'hero')).toBe(false);
    });

    it('should set rerollState on activate', () => {
        const speedState = {
            ...INITIAL_STATE,
            phase: 'speed-roll',
            heroSpeedRolls: [{ value: 2, isRerolled: false }, { value: 3, isRerolled: false }],
            logs: []
        };

        // @ts-ignore - Partial state for test
        const result = ability.onActivate?.(speedState, 'hero');
        expect(result?.rerollState).toEqual({
            source: 'Charm',
            target: 'hero-speed'
        });
    });

    it('should reroll speed die on interaction', () => {
        const state = {
            ...INITIAL_STATE,
            phase: 'speed-roll',
            heroSpeedRolls: [{ value: 1, isRerolled: false }, { value: 1, isRerolled: false }],
            rerollState: { source: 'Charm', target: 'hero-speed' },
            logs: []
        };

        // Mock Math.random to roll a 6
        const spy = vi.spyOn(Math, 'random').mockReturnValue(0.99); // 6

        // @ts-ignore - Partial state for test
        const updates = ability.onReroll?.(state, 0);

        expect(updates?.heroSpeedRolls).toEqual([
            { value: 6, isRerolled: true },
            { value: 1, isRerolled: false }
        ]);
        expect(updates?.rerollState).toBeUndefined();

        spy.mockRestore();
    });
});
