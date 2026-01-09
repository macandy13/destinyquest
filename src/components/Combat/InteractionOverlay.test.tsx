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
            <InteractionOverlay
                ability={mockCombatState.pendingInteraction?.ability as any}
                interaction={mockCombatState.pendingInteraction?.requests?.[0] as any}
                onResolve={mockOnResolve} />
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
            <InteractionOverlay
                ability={stateWithInteraction.pendingInteraction!.ability}
                interaction={stateWithInteraction.pendingInteraction!.requests[0]}
                onResolve={mockOnResolve} />
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
            <InteractionOverlay
                ability={stateWithInteraction.pendingInteraction!.ability}
                interaction={stateWithInteraction.pendingInteraction!.requests[0]}
                onResolve={mockOnResolve} />
        );

        expect(getByText('Test Ability')).toBeDefined();
        expect(getByText('Test Description')).toBeDefined();
        expect(getByTestId('ability-icon')).toBeDefined();
        expect(getByText('Yes')).toBeDefined();
        expect(getByText('No')).toBeDefined();
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
            <InteractionOverlay
                ability={stateWithInteraction.pendingInteraction!.ability}
                interaction={stateWithInteraction.pendingInteraction!.requests[0]}
                onResolve={mockOnResolve} />
        );

        fireEvent.click(getByText('Option B'));

        expect(mockOnResolve).toHaveBeenCalledWith(
            {
                request: stateWithInteraction.pendingInteraction!.requests[0],
                selectedIndexes: [1]
            }
        );
    });
});
