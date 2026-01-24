import { renderHook, act } from '@testing-library/react';
import { useCombat } from './useCombat';
import { describe, it, expect } from 'vitest';
import { MOCK_ENEMY, MOCK_HERO } from '../tests/testUtils';

describe('useCombat Hook', () => {
    it('should initialize in inactive state', () => {
        const { result } = renderHook(() => useCombat(MOCK_HERO, MOCK_ENEMY));
        expect(result.current.combat.phase).toBe('combat-start');
        expect(result.current.canUndo).toBe(false);
    });

    it('should allow undoing an action', () => {
        const { result } = renderHook(() => useCombat(MOCK_HERO, MOCK_ENEMY));

        // Perform an action
        act(() => {
            result.current.rollSpeedDice();
        });
        expect(result.current.combat.phase).toBe('speed-roll');
        expect(result.current.canUndo).toBe(true);

        // Undo
        act(() => {
            result.current.undo();
        });
        expect(result.current.combat.phase).toBe('combat-start');
        expect(result.current.canUndo).toBe(false);
    });

    it('should maintain history across multiple actions', () => {
        const fastHero = { ...MOCK_HERO, stats: { ...MOCK_HERO.stats, speed: 100 } };
        const { result } = renderHook(() => useCombat(fastHero, MOCK_ENEMY));

        act(() => {
            result.current.rollSpeedDice();
        });
        const stateAfterSpeed = result.current.combat;

        act(() => {
            result.current.commitSpeedAndRollDamageDice();
        });
        expect(result.current.combat.phase).toBe('damage-roll');

        // Undo damage roll
        act(() => {
            result.current.undo();
        });
        expect(result.current.combat).toBe(stateAfterSpeed);
        expect(result.current.combat.phase).toBe('speed-roll');

        // Undo speed roll
        act(() => {
            result.current.undo();
        });
        expect(result.current.combat.phase).toBe('combat-start');
    });

    it('should not undo if history is empty', () => {
        const { result } = renderHook(() => useCombat(MOCK_HERO, MOCK_ENEMY));
        const initialState = result.current.combat;

        act(() => {
            result.current.undo();
        });
        expect(result.current.combat).toBe(initialState);
    });

    it('should treat interaction resolution as a single undo step', () => {
        const { result } = renderHook(() => useCombat(MOCK_HERO, MOCK_ENEMY));

        // 1. Trigger an interaction (manually setting state via updateCombatState for testing, 
        // effectively mocking an ability that asks for input)
        act(() => {
            result.current.updateCombatState({
                ...result.current.combat,
                pendingInteraction: {
                    ability: { name: 'Test', type: 'combat', owner: 'hero' } as any,
                    requests: [],
                    callback: (state) => ({ ...state, phase: 'combat-end' }) // Resolves to combat end
                }
            });
        });

        // Verify we are in an interaction
        expect(result.current.combat.pendingInteraction).toBeDefined();

        // 2. Resolve the interaction
        act(() => {
            result.current.resolveInteraction([]);
        });

        // Verify interaction resolved
        expect(result.current.combat.pendingInteraction).toBeUndefined();
        expect(result.current.combat.phase).toBe('combat-end');

        // 3. Undo
        act(() => {
            result.current.undo();
        });

        // Should skip the pendingInteraction state and go back to start
        expect(result.current.combat.phase).toBe('combat-start');
        expect(result.current.combat.pendingInteraction).toBeUndefined();
    });
});
