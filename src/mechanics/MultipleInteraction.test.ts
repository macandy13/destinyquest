import { describe, it, expect } from 'vitest';
import { CombatState, InteractionRequest, InteractionResponse } from '../types/combatState';
import { resolveInteraction, startCombat } from './CombatEngine';
import { Hero } from '../types/hero';
import { Enemy } from '../types/character';

const MOCK_HERO: Hero = {
    name: 'Test Hero',
    type: 'hero',
    stats: { speed: 2, brawn: 5, magic: 3, armour: 1, health: 30, maxHealth: 30 },
    backpack: [],
    equipment: {},
    money: 0,
    path: 'Warrior',
    career: 'Gladiator'
};

const MOCK_ENEMY: Enemy = {
    name: 'Test Enemy',
    type: 'enemy',
    stats: { speed: 2, brawn: 2, magic: 2, armour: 0, health: 10, maxHealth: 10 },
    abilities: [],
    bookRef: { book: 'test', act: 1 }
};

describe('Multiple Interaction Resolution', () => {
    it('should handle multiple sequential choice responses', () => {
        let capturedResponses: InteractionResponse[] = [];

        const mockCallback = (state: CombatState, responses: InteractionResponse[]) => {
            capturedResponses = responses;
            return state;
        };

        const requests: InteractionRequest[] = [
            { type: 'choices', mode: 'select', count: 1, choices: ['A', 'B'] },
            { type: 'choices', mode: 'select', count: 1, choices: ['C', 'D'] }
        ];

        let state = startCombat(MOCK_HERO, MOCK_ENEMY);

        // Inject a pending interacton
        state = {
            ...state,
            pendingInteraction: {
                ability: {
                    name: 'Test',
                    owner: 'hero',
                    def: { name: 'Test', type: 'combat', description: 'test' },
                    uses: 1,
                    sources: []
                },
                requests,
                callback: mockCallback
            }
        };
        state.hero.activeAbilities.set('test', state.pendingInteraction!.ability);

        const responses: InteractionResponse[] = [
            { request: requests[0], selectedIndex: 0 },
            { request: requests[1], selectedIndex: 1 }
        ];

        resolveInteraction(state, responses);

        expect(capturedResponses).toHaveLength(2);
        expect(capturedResponses[0].selectedIndex).toBe(0);
        expect(capturedResponses[1].selectedIndex).toBe(1);
    });

    it('should handle multiple dice selection from a single request', () => {
        let capturedResponses: InteractionResponse[] = [];

        const mockCallback = (state: CombatState, responses: InteractionResponse[]) => {
            capturedResponses = responses;
            return state;
        };

        const request: InteractionRequest = { type: 'dice', mode: 'select', count: 2 };

        let state = startCombat(MOCK_HERO, MOCK_ENEMY);

        state = {
            ...state,
            pendingInteraction: {
                ability: {
                    name: 'Test',
                    owner: 'hero',
                    def: { name: 'Test', type: 'combat', description: 'test' },
                    uses: 1,
                    sources: []
                },
                requests: [request],
                callback: mockCallback
            }
        };
        state.hero.activeAbilities.set('test', state.pendingInteraction!.ability);

        const responses: InteractionResponse[] = [
            { request: request, selectedIndex: 0 },
            { request: request, selectedIndex: 1 }
        ];

        resolveInteraction(state, responses);

        expect(capturedResponses).toHaveLength(2);
        expect(capturedResponses[0].request).toBe(request);
        expect(capturedResponses[1].request).toBe(request);
    });
});
