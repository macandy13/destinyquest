import { render, screen } from '@testing-library/react';
import HeroStats from './HeroStats';
import { MOCK_HERO } from '../../tests/testUtils';
import { describe, it, expect, vi } from 'vitest';

describe('HeroStats', () => {
    const defaultProps = {
        hero: MOCK_HERO,
        activeAbilities: [],
        onHealthChange: vi.fn(),
        onMoneyChange: vi.fn(),
        onNameChange: vi.fn(),
        onPathChange: vi.fn(),
        onCareerChange: vi.fn()
    };

    it('should render active abilities provided in props', () => {
        render(<HeroStats {...defaultProps} activeAbilities={['Test Ability 1', 'Test Ability 2']} />);

        expect(screen.getByText('Test Ability 1')).toBeDefined();
        expect(screen.getByText('Test Ability 2')).toBeDefined();
    });

    it('should render duplicates active abilities with count', () => {
        render(<HeroStats {...defaultProps} activeAbilities={['Test Ability 1', 'Test Ability 1']} />);

        expect(screen.getByText('Test Ability 1')).toBeDefined();
        expect(screen.getByText('x2')).toBeDefined();
    });
});
