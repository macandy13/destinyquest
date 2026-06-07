import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookActSelector from './BookActSelector';
import { BookFilter } from '../../hooks/useBookFilter';
import { vi } from 'vitest';

describe('BookActSelector', () => {
    it('renders book selector dropdown', () => {
        const filter: BookFilter = { type: 'all' };
        const mockOnFilterChange = vi.fn();

        render(
            <BookActSelector
                filter={filter}
                onFilterChange={mockOnFilterChange}
            />
        );

        expect(screen.getByRole('combobox')).toBeInTheDocument();
        expect(screen.getByText('All Books')).toBeInTheDocument();
        // Act selector/buttons should not be visible when no book is selected
        expect(screen.queryByText('All Acts')).not.toBeInTheDocument();
    });

    it('renders act buttons when a book is selected', () => {
        const filter: BookFilter = { type: 'book', book: 'The Legion of Shadow' };
        const mockOnFilterChange = vi.fn();

        render(
            <BookActSelector
                filter={filter}
                onFilterChange={mockOnFilterChange}
            />
        );

        // Dropdown select value should be selected book
        expect(screen.getByRole('combobox')).toHaveValue('The Legion of Shadow');

        // Should render act buttons
        expect(screen.getByRole('button', { name: 'All Acts' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Act 1' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Act 2' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Act 3' })).toBeInTheDocument();
    });

    it('triggers callback when book selection changes', () => {
        const filter: BookFilter = { type: 'all' };
        const mockOnFilterChange = vi.fn();

        render(
            <BookActSelector
                filter={filter}
                onFilterChange={mockOnFilterChange}
            />
        );

        fireEvent.change(screen.getByRole('combobox'), {
            target: { value: 'The Legion of Shadow' }
        });

        expect(mockOnFilterChange).toHaveBeenCalledWith({
            type: 'book',
            book: 'The Legion of Shadow'
        });
    });

    it('triggers callback when act buttons are clicked', () => {
        const filter: BookFilter = { type: 'book', book: 'The Legion of Shadow' };
        const mockOnFilterChange = vi.fn();

        render(
            <BookActSelector
                filter={filter}
                onFilterChange={mockOnFilterChange}
            />
        );

        fireEvent.click(screen.getByRole('button', { name: 'Act 2' }));

        expect(mockOnFilterChange).toHaveBeenCalledWith({
            type: 'act',
            book: 'The Legion of Shadow',
            act: 2
        });

        fireEvent.click(screen.getByRole('button', { name: 'All Acts' }));

        expect(mockOnFilterChange).toHaveBeenCalledWith({
            type: 'book',
            book: 'The Legion of Shadow'
        });
    });
});
