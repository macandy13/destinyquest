import { render, fireEvent } from '@testing-library/react';
import InteractionOverlay from './InteractionOverlay';
import { CombatState, InteractionRequest } from '../../types/combatState';
import { describe, it, expect, vi } from 'vitest';

// Mock getAbilityIcon
vi.mock('../../mechanics/abilityRegistry', () => ({
    getAbilityIcon: () => <div data-testid="ability-icon">Icon</div>,
}));

describe('InteractionOverlay', () => {
    const mockCallback = vi.fn();
    const mockOnResolve = vi.fn();

    const mockCombatState: CombatState = {
        hero: {
            id: 'hero',
            name: 'Hero',
            type: 'hero',
            activeAbilities: new Map(),
            activeEffects: [],
            stats: { health: 10, maxHealth: 10, speed: 2, magic: 0, brawn: 0, armour: 0 },
            original: {} as any // simplified
        },
        enemy: {
            id: 'enemy',
            name: 'Enemy',
            type: 'enemy',
            activeAbilities: new Map(),
            activeEffects: [],
            stats: { health: 10, maxHealth: 10, speed: 2, magic: 0, brawn: 0, armour: 0 },
            original: {} as any
        },
        round: 1,
        phase: 'combat-start',
        logs: [],
        backpack: [],
        damageDealt: [],
    };

    it('should render nothing when no interaction is pending', () => {
        const { container } = render(
            <InteractionOverlay combat={mockCombatState} onResolve={mockOnResolve} />
        );
        expect(container.firstChild).toBeNull();
    });

    it('should render nothing when request type is not choices', () => {
        const stateWithInteraction: CombatState = {
            ...mockCombatState,
            pendingInteraction: {
                ability: {
                    name: 'Test Ability',
                    owner: 'hero',
                    def: { name: 'Test Ability', description: 'Description', type: 'combat' }
                },
                requests: [
                    { type: 'dice', mode: 'select', count: 1 } as unknown as InteractionRequest
                ],
                callback: mockCallback
            }
        };

        const { container } = render(
            <InteractionOverlay combat={stateWithInteraction} onResolve={mockOnResolve} />
        );
        expect(container.firstChild).toBeNull();
    });

    it('should render modal with choices when interaction is pending', () => {
        const stateWithInteraction: CombatState = {
            ...mockCombatState,
            pendingInteraction: {
                ability: {
                    name: 'Test Ability',
                    owner: 'hero',
                    def: { name: 'Test Ability', description: 'Test Description', type: 'combat' }
                },
                requests: [
                    { type: 'choices', mode: 'select', count: 1, choices: ['Yes', 'No'] }
                ],
                callback: mockCallback
            }
        };

        const { getByText, getByTestId } = render(
            <InteractionOverlay combat={stateWithInteraction} onResolve={mockOnResolve} />
        );

        expect(getByText('Test Ability')).toBeDefined();
        expect(getByText('Test Description')).toBeDefined();
        expect(getByTestId('ability-icon')).toBeDefined();
        expect(getByText('Yes')).toBeDefined();
        expect(getByText('No')).toBeDefined();
        expect(getByText('Step 1 of 1')).toBeDefined();
    });

    it('should call onResolve with selected index when choice is clicked', () => {
        const stateWithInteraction: CombatState = {
            ...mockCombatState,
            pendingInteraction: {
                ability: {
                    name: 'Test Ability',
                    owner: 'hero',
                    def: { name: 'Test Ability', description: 'Test Description', type: 'combat' }
                },
                requests: [
                    { type: 'choices', mode: 'select', count: 1, choices: ['Option A', 'Option B'] }
                ],
                callback: mockCallback
            }
        };

        const { getByText } = render(
            <InteractionOverlay combat={stateWithInteraction} onResolve={mockOnResolve} />
        );

        fireEvent.click(getByText('Option B'));

        expect(mockOnResolve).toHaveBeenCalledWith([
            {
                request: stateWithInteraction.pendingInteraction!.requests[0],
                selectedIndex: 1
            }
        ]);
    });

    it('should handle multiple steps', () => {
        const stateWithInteraction: CombatState = {
            ...mockCombatState,
            pendingInteraction: {
                ability: {
                    name: 'Multi Step',
                    owner: 'hero',
                    def: { name: 'Multi Step', description: 'Desc', type: 'combat' }
                },
                requests: [
                    { type: 'choices', mode: 'select', count: 1, choices: ['Skip'] },
                    { type: 'choices', mode: 'select', count: 1, choices: ['Confirm'] }
                ],
                callback: mockCallback
            }
        };

        const { getByText, queryByText } = render(
            <InteractionOverlay combat={stateWithInteraction} onResolve={mockOnResolve} />
        );

        expect(getByText('Step 1 of 2')).toBeDefined();
        expect(getByText('Skip')).toBeDefined();

        // Click first step
        fireEvent.click(getByText('Skip'));

        // Should now be on step 2
        expect(getByText('Step 2 of 2')).toBeDefined();
        expect(getByText('Confirm')).toBeDefined();
        expect(queryByText('Skip')).toBeNull();

        // Click second step
        fireEvent.click(getByText('Confirm'));

        expect(mockOnResolve).toHaveBeenCalledWith([
            {
                request: stateWithInteraction.pendingInteraction!.requests[0],
                selectedIndex: 0
            },
            {
                request: stateWithInteraction.pendingInteraction!.requests[1],
                selectedIndex: 0
            }
        ]);
    });
});
