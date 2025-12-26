import { render, act } from '@testing-library/react';
import CombatDice from './CombatDice';
import { DiceRoll } from '../../types/combat';
import { describe, it, expect, vi } from 'vitest';

describe('CombatDice', () => {
    it('should animate only the die that changed', async () => {
        vi.useFakeTimers();

        const initialValues: DiceRoll[] = [
            { value: 1, isRerolled: false },
            { value: 1, isRerolled: false }
        ];

        const { rerender, container } = render(
            <CombatDice values={initialValues} count={2} />
        );

        // Advance timers to finish initial animation (since mount triggers animation)
        act(() => {
            vi.advanceTimersByTime(700);
        });

        const dice = container.querySelectorAll('.die');
        expect(dice[0].classList.contains('rolling')).toBe(false);
        expect(dice[1].classList.contains('rolling')).toBe(false);

        // Update values: Die 0 rerolled
        const newValues: DiceRoll[] = [
            { value: 6, isRerolled: true },
            { value: 1, isRerolled: false }
        ];

        rerender(<CombatDice values={newValues} count={2} />);

        await act(async () => {
            // Allow effects to flush
        });

        const diceAfter = container.querySelectorAll('.die');
        // Die 0 should be rolling
        expect(diceAfter[0].classList.contains('rolling')).toBe(true);
        // Die 1 should NOT be rolling
        expect(diceAfter[1].classList.contains('rolling')).toBe(false);

        // Advance timers to finish animation
        act(() => {
            vi.advanceTimersByTime(700);
        });

        // Should be done
        const diceFinal = container.querySelectorAll('.die');
        expect(diceFinal[0].classList.contains('rolling')).toBe(false);

        vi.useRealTimers();
    });
});
