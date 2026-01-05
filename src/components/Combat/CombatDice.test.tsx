import { render, act } from '@testing-library/react';
import CombatDice from './CombatDice';
import { DiceRoll } from '../../types/dice';
import { describe, it, expect, vi } from 'vitest';

describe('CombatDice', () => {
    it('should animate only the die that changed', async () => {
        vi.useFakeTimers();

        const initialValues: DiceRoll[] = [
            { value: 1, isRerolled: false },
            { value: 1, isRerolled: false }
        ];

        const { rerender, container } = render(
            <CombatDice values={initialValues} baseValue={5} />
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

        rerender(<CombatDice values={newValues} />);

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
    it('should calculate and display correct total with base and modifiers', async () => {
        vi.useFakeTimers();
        const values: DiceRoll[] = [
            { value: 3, isRerolled: false },
            { value: 4, isRerolled: false }
        ];

        const { getByText } = render(
            <CombatDice values={values} baseValue={5} modifierValue={2} />
        );

        // Advance timers to finish animation
        act(() => {
            vi.advanceTimersByTime(700);
        });

        // Sum = 7 (dice) + 5 (base) + 2 (mod) = 14
        expect(getByText('= 14')).toBeDefined();

        // Breakdown check: 7 (Roll) + 5 (Base) + 2 (Mod)
        // Breakdown check: 7 (Roll) + 5 (Base) + 2 (Mod)
        expect(getByText(/7\s*\(Roll\)/)).toBeDefined();
        expect(getByText(/\+ 5\s*\(Base\)/)).toBeDefined();
        expect(getByText(/\+ 2\s*\(Mod\)/)).toBeDefined();
    });

    it('should apply correct classes based on mode', () => {
        const values: DiceRoll[] = [{ value: 1, isRerolled: false }];
        const { container, rerender } = render(<CombatDice values={values} mode="normal" />);
        expect(container.firstChild).toHaveClass('dice-wrapper--normal');

        rerender(<CombatDice values={values} mode="select-die" />);
        expect(container.firstChild).toHaveClass('dice-wrapper--select-die');

        rerender(<CombatDice values={values} mode="disabled" />);
        expect(container.firstChild).toHaveClass('dice-wrapper--disabled');
    });

    it('should handle interaction based on mode', async () => {
        vi.useFakeTimers();
        const onDieClick = vi.fn();
        const values: DiceRoll[] = [{ value: 1, isRerolled: false }];
        const { getByText, rerender } = render(
            <CombatDice values={values} onDieClick={onDieClick} mode="normal" />
        );

        // Advance timers to finish animation
        act(() => {
            vi.advanceTimersByTime(700);
        });

        // Mode normal: click should ignore
        getByText('1').click();
        expect(onDieClick).not.toHaveBeenCalled();

        // Mode disabled: click should ignore
        rerender(<CombatDice values={values} onDieClick={onDieClick} mode="disabled" />);
        act(() => {
            vi.advanceTimersByTime(700); // Wait for potential re-animation or just safety
        });
        getByText('1').click();
        expect(onDieClick).not.toHaveBeenCalled();

        // Mode select-die: click should trigger
        rerender(<CombatDice values={values} onDieClick={onDieClick} mode="select-die" />);
        act(() => {
            vi.advanceTimersByTime(700);
        });
        getByText('1').click();
        expect(onDieClick).toHaveBeenCalledWith(0);

        vi.useRealTimers();
    });
});
