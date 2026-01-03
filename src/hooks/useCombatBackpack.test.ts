
import { act, renderHook } from '@testing-library/react';
import { useCombat } from './useCombat';
import { MOCK_HERO, MOCK_ENEMY } from '../tests/testUtils';
import { testBackpackItem } from '../tests/testUtils';
import { BackpackItem } from '../types/Hero';

const HEALING_POTION: BackpackItem = testBackpackItem({
    name: 'Healing Potion',
    type: 'backpack',
    effect: {
        stats: { health: 6 },
        source: 'Healing Potion',
        target: 'hero',
        duration: 0
    },
    uses: 1,
    notes: 'Test potion'
});

describe('useCombat - Backpack Items', () => {
    it('initializes combat with backpack items', () => {
        const heroWithBackpack = {
            ...MOCK_HERO,
            backpack: [HEALING_POTION, null, null, null, null]
        };

        const { result } = renderHook(() => useCombat(heroWithBackpack, MOCK_ENEMY));

        expect(result.current.combat.backpack).toEqual([HEALING_POTION]);
    });

    it('uses healing potion to restore health', () => {
        const heroWithBackpack = {
            ...MOCK_HERO,
            stats: { ...MOCK_HERO.stats, health: 10, maxHealth: 30 },
            backpack: [HEALING_POTION]
        };

        const { result } = renderHook(() => useCombat(heroWithBackpack, MOCK_ENEMY));

        expect(result.current.combat.hero?.stats.health).toBe(10);

        act(() => {
            result.current.useBackpackItem(0);
        });

        expect(result.current.combat.hero?.stats.health).toBe(16); // 10 + 6
        expect(result.current.combat.backpack).toHaveLength(0); // Removed after use
    });

    it('uses speed potion to modify stats', () => {
        const heroWithBackpack = {
            ...MOCK_HERO,
            stats: { ...MOCK_HERO.stats, speed: 2 },
            backpack: [testBackpackItem({
                name: 'Speed Potion',
                type: 'backpack',
                effect: {
                    stats: { speed: 2 },
                    source: 'Speed Potion',
                    target: 'hero',
                    duration: 1
                },
                uses: 2,
                notes: 'Test potion'
            })]
        };

        const { result } = renderHook(() => useCombat(heroWithBackpack, MOCK_ENEMY));

        act(() => {
            result.current.useBackpackItem(0);
        });

        expect(result.current.combat.hero?.activeEffects).toEqual([
            expect.objectContaining({
                source: 'Speed Potion',
                target: 'hero',
                duration: 1
            })
        ]);
        expect(result.current.combat.backpack).toEqual([
            expect.objectContaining({
                name: 'Speed Potion',
                uses: 1
            })
        ]);
    });
});
