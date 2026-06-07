import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import EnemySelector from './EnemySelector';
import '@testing-library/jest-dom';

describe('EnemySelector - Custom Enemy', () => {
    it('initializes with Brawn active and Magic at 0', () => {
        const onSelect = vi.fn();
        render(<EnemySelector onSelect={onSelect} />);

        // Switch to Custom tab
        fireEvent.click(screen.getByRole('button', { name: /Custom/i }));

        // Brawn element should be present
        const brawnElement = screen.getByText(/Brawn/i);
        expect(brawnElement).toBeInTheDocument();

        // Verify the offensive-stat-row shows 2
        const row = brawnElement.closest('.offensive-stat-row');
        expect(row).toBeInTheDocument();
        expect(within(row!).getByText('2')).toBeInTheDocument();
    });

    it('toggles offensive mode and preserves values', () => {
        const onSelect = vi.fn();
        render(<EnemySelector onSelect={onSelect} />);

        fireEvent.click(screen.getByRole('button', { name: /Custom/i }));

        // Brawn is active (2). Switch to Magic by clicking the toggle label.
        const toggleLabel = screen.getByText(/Brawn/i);
        fireEvent.click(toggleLabel);

        // Verify it switched to Magic
        const magicElement = screen.getByText(/Magic/i);
        expect(magicElement).toBeInTheDocument();

        // Verify Magic has preserved the value of 2
        const row = magicElement.closest('.offensive-stat-row');
        expect(within(row!).getByText('2')).toBeInTheDocument();

        // Click Start Fight
        fireEvent.click(screen.getByRole('button', { name: /Start Fight/i }));

        expect(onSelect).toHaveBeenCalledTimes(1);
        const enemy = onSelect.mock.calls[0][0];
        expect(enemy.stats.brawn).toBe(0);
        expect(enemy.stats.magic).toBe(2);
    });

    it('allows selecting and removing multiple special abilities', () => {
        const onSelect = vi.fn();
        render(<EnemySelector onSelect={onSelect} />);

        fireEvent.click(screen.getByRole('button', { name: /Custom/i }));

        // Search for an ability
        const input = screen.getByPlaceholderText(/Search & add special/i);
        fireEvent.change(input, { target: { value: 'Ferocity' } });

        // Click the dropdown option for 'Ferocity'
        const option = screen.getByText('Ferocity');
        fireEvent.click(option);

        // Verify ability row is rendered (matching the ★ Ferocity title)
        expect(screen.getByText(/Ferocity/i)).toBeInTheDocument();

        // Search and add another one
        fireEvent.change(input, { target: { value: 'Acid' } });
        const option2 = screen.getByText('Acid');
        fireEvent.click(option2);

        expect(screen.getByText(/Acid/i)).toBeInTheDocument();

        // Remove the 'Ferocity' ability
        const removeBtns = screen.getAllByTitle('Remove ability');
        fireEvent.click(removeBtns[0]);

        // Start fight and verify selected abilities
        fireEvent.click(screen.getByRole('button', { name: /Start Fight/i }));
        const enemy = onSelect.mock.calls[0][0];
        expect(enemy.abilities).toEqual(['Acid']);
    });
});
