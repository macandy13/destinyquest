import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CombatStateEditor from './CombatStateEditor';
import { CombatState } from '../../types/combatState';
import { Hero } from '../../types/hero';
import { Enemy } from '../../types/character';
import '@testing-library/jest-dom';

const createMockCombatState = (
    options?: {
        heroEffects?: CombatState['hero']['activeEffects'];
        enemyEffects?: CombatState['enemy']['activeEffects'];
    }
): CombatState => {
    const mockHero: Hero = {
        type: 'hero',
        name: 'Test Hero',
        stats: {
            speed: 5,
            brawn: 3,
            magic: 2,
            armour: 1,
            health: 25,
            maxHealth: 30
        },
        equipment: {},
        backpack: [],
        money: 0
    };

    const mockEnemy: Enemy = {
        type: 'enemy',
        name: 'Test Enemy',
        stats: {
            speed: 4,
            brawn: 2,
            magic: 1,
            armour: 0,
            health: 15,
            maxHealth: 20
        },
        abilities: [],
        bookRef: { book: '1', act: 1 }
    };

    return {
        hero: {
            type: 'hero',
            id: 'hero',
            name: mockHero.name,
            stats: mockHero.stats,
            original: mockHero,
            activeAbilities: new Map(),
            activeEffects: options?.heroEffects ?? []
        },
        enemy: {
            type: 'enemy',
            id: 'enemy',
            name: mockEnemy.name,
            stats: mockEnemy.stats,
            original: mockEnemy,
            activeAbilities: new Map(),
            activeEffects: options?.enemyEffects ?? []
        },
        round: 1,
        phase: 'round-end',
        logs: [],
        backpack: [],
        damageDealt: []
    };
};

describe('CombatStateEditor', () => {
    it('renders tabs for hero and enemy', () => {
        const combat = createMockCombatState();
        const onApply = vi.fn();
        const onCancel = vi.fn();

        render(
            <CombatStateEditor
                combat={combat}
                onApply={onApply}
                onCancel={onCancel}
            />
        );

        // Should show tabs with combatant names
        expect(screen.getByRole('button', { name: /Test Hero/ }))
            .toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Test Enemy/ }))
            .toBeInTheDocument();
    });

    it('displays hero health with NumberControl', () => {
        const combat = createMockCombatState();
        const onApply = vi.fn();
        const onCancel = vi.fn();

        render(
            <CombatStateEditor
                combat={combat}
                onApply={onApply}
                onCancel={onCancel}
            />
        );

        // Should show hero health value (25) and max health (/ 30)
        expect(screen.getByText('25')).toBeInTheDocument();
        expect(screen.getByText('/ 30')).toBeInTheDocument();
    });

    it('switches between hero and enemy tabs', () => {
        const combat = createMockCombatState();
        const onApply = vi.fn();
        const onCancel = vi.fn();

        render(
            <CombatStateEditor
                combat={combat}
                onApply={onApply}
                onCancel={onCancel}
            />
        );

        // Initially shows hero (25/30)
        expect(screen.getByText('25')).toBeInTheDocument();
        expect(screen.getByText('/ 30')).toBeInTheDocument();

        // Click enemy tab
        fireEvent.click(screen.getByRole('button', { name: /Test Enemy/ }));

        // Now shows enemy (15/20)
        expect(screen.getByText('15')).toBeInTheDocument();
        expect(screen.getByText('/ 20')).toBeInTheDocument();
    });

    it('renders effects as icons for the active combatant', () => {
        const combat = createMockCombatState({
            heroEffects: [
                {
                    source: 'Buff Spell',
                    target: 'hero',
                    stats: { speed: 2 },
                    duration: 3
                }
            ],
            enemyEffects: [
                {
                    source: 'Poison',
                    target: 'enemy',
                    stats: { health: -2 },
                    duration: 2
                }
            ]
        });
        const onApply = vi.fn();
        const onCancel = vi.fn();

        render(
            <CombatStateEditor
                combat={combat}
                onApply={onApply}
                onCancel={onCancel}
            />
        );

        // Hero tab is active by default - effect shown as icon with title
        expect(screen.getByTitle('Buff Spell')).toBeInTheDocument();

        // Switch to enemy tab
        fireEvent.click(screen.getByRole('button', { name: /Test Enemy/ }));

        // Enemy effect shown
        expect(screen.getByTitle('Poison')).toBeInTheDocument();
    });

    it('shows empty state when no effects exist', () => {
        const combat = createMockCombatState();
        const onApply = vi.fn();
        const onCancel = vi.fn();

        render(
            <CombatStateEditor
                combat={combat}
                onApply={onApply}
                onCancel={onCancel}
            />
        );

        // Tabs show only one combatant at a time
        expect(screen.getByText('No active effects')).toBeInTheDocument();
    });

    it('updates health using NumberControl buttons', () => {
        const combat = createMockCombatState();
        const onApply = vi.fn();
        const onCancel = vi.fn();

        render(
            <CombatStateEditor
                combat={combat}
                onApply={onApply}
                onCancel={onCancel}
            />
        );

        // Initial health is 25
        expect(screen.getByText('25')).toBeInTheDocument();

        // Click decrease by 1 button
        const decreaseBtn = screen.getByRole('button', { name: 'Decrease by 1' });
        fireEvent.click(decreaseBtn);

        // Health should now be 24
        expect(screen.getByText('24')).toBeInTheDocument();

        // Apply changes
        fireEvent.click(screen.getByText('Apply Changes'));

        expect(onApply).toHaveBeenCalledTimes(1);
        const appliedState = onApply.mock.calls[0][0] as CombatState;
        expect(appliedState.hero.stats.health).toBe(24);
    });

    it('calls onCancel when Cancel button is clicked', () => {
        const combat = createMockCombatState();
        const onApply = vi.fn();
        const onCancel = vi.fn();

        render(
            <CombatStateEditor
                combat={combat}
                onApply={onApply}
                onCancel={onCancel}
            />
        );

        fireEvent.click(screen.getByText('Cancel'));

        expect(onCancel).toHaveBeenCalledTimes(1);
        expect(onApply).not.toHaveBeenCalled();
    });

    it('calls onCancel when close button is clicked', () => {
        const combat = createMockCombatState();
        const onApply = vi.fn();
        const onCancel = vi.fn();

        render(
            <CombatStateEditor
                combat={combat}
                onApply={onApply}
                onCancel={onCancel}
            />
        );

        fireEvent.click(screen.getByLabelText('Close'));

        expect(onCancel).toHaveBeenCalledTimes(1);
    });
});
