import { render, screen, fireEvent, act } from '@testing-library/react';
import HeroStats from './HeroStats';
import { useHero } from '../../hooks/useHero';
import { describe, it, expect } from 'vitest';

// Wrapper component to use the hook
const TestWrapper = () => {
    const {
        hero,
        activeAbilities,
        updateHealth,
        updateMoney,
        updateName,
        updatePath,
        updateCareer
    } = useHero();

    return (
        <HeroStats
            hero={hero}
            activeAbilities={activeAbilities}
            onHealthChange={updateHealth}
            onMoneyChange={updateMoney}
            onNameChange={updateName}
            onPathChange={updatePath}
            onCareerChange={updateCareer}
        />
    );
};

describe('HeroStats Integration', () => {
    it('should display career abilities when career is selected', async () => {
        render(<TestWrapper />);

        const selects = screen.getAllByRole('combobox');
        const pathDropdown = selects[0];
        const careerDropdown = selects[1];

        await act(async () => {
            fireEvent.change(pathDropdown, { target: { value: 'Warrior' } });
        });

        expect(careerDropdown).not.toBeDisabled();

        await act(async () => {
            fireEvent.change(careerDropdown, { target: { value: 'Gladiator' } });
        });

        expect(screen.getByText('Blood Rage')).toBeDefined();
    });
});
