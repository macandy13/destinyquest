import { describe, it, expect, vi } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './Charm';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Charm', () => {
    it('should allow activation when rolls exist', () => {
        const charm = getAbilityDefinition('Charm');
        // Speed phase
        const speedState = {
            ...INITIAL_STATE,
            phase: 'speed-roll',
            heroSpeedRolls: [{ value: 2, isRerolled: false }, { value: 3, isRerolled: false }]
        };
        // @ts-ignore - Partial state for test
        expect(charm?.canActivate?.(speedState)).toBe(true);

        // Damage phase (hero winning) -> implicitly round-end after resolution
        const damageState = {
            ...INITIAL_STATE,
            phase: 'round-end',
            winner: 'hero',
            damageRolls: [{ value: 4, isRerolled: false }]
        };
        // @ts-ignore - Partial state for test
        expect(charm?.canActivate?.(damageState)).toBe(true);

        // Invalid phases
        const startState = { ...INITIAL_STATE, phase: 'combat-start' };
        // @ts-ignore - Partial state for test
        expect(charm?.canActivate?.(startState)).toBe(false);
    });

    it('should set rerollState on activate', () => {
        const charm = getAbilityDefinition('Charm');
        const speedState = {
            ...INITIAL_STATE,
            phase: 'speed-roll',
            heroSpeedRolls: [{ value: 2, isRerolled: false }, { value: 3, isRerolled: false }],
            logs: []
        };

        // @ts-ignore - Partial state for test
        const result = charm?.onActivate?.(speedState);
        expect(result?.rerollState).toEqual({
            source: 'Charm',
            target: 'hero-speed'
        });
    });

    it('should reroll speed die on interaction', () => {
        const charm = getAbilityDefinition('Charm');
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
        const updates = charm?.onReroll?.(state, 0);

        expect(updates?.heroSpeedRolls).toEqual([
            { value: 6, isRerolled: true },
            { value: 1, isRerolled: false }
        ]);
        expect(updates?.rerollState).toBeUndefined();

        spy.mockRestore();
    });
});
