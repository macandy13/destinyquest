import { renderHook, act } from '@testing-library/react';
import { useHero } from '../hooks/useHero';
import { describe, it, expect } from 'vitest';
import { EquipmentItem } from '../types/hero';

const MOCK_ITEM: EquipmentItem = {
    id: 'test-item',
    type: 'mainHand',
    name: 'Iron Sword',
    act: 1,
    stats: {
        speed: 1,
        brawn: 2,
        magic: 0,
        armour: 0,
        health: 0
    }
};

describe('useHero Hook', () => {
    it('should initialize with default stats', () => {
        const { result } = renderHook(() => useHero());
        expect(result.current.hero.stats.maxHealth).toBeGreaterThan(0);
        // Initial speed is 0 until items are equipped
        expect(result.current.hero.stats.speed).toBe(0);
    });

    it('should update health correctly', () => {
        const { result } = renderHook(() => useHero());
        const initialHealth = result.current.hero.stats.health;

        act(() => {
            // Update to a specific value, not a delta
            result.current.updateHealth(initialHealth - 5);
        });

        expect(result.current.hero.stats.health).toBe(initialHealth - 5);
    });

    it('should equip item and update stats', () => {
        const { result } = renderHook(() => useHero());
        const initialBrawn = result.current.hero.stats.brawn;

        act(() => {
            result.current.equipItem(MOCK_ITEM, 'mainHand');
        });

        expect(result.current.hero.equipment.mainHand).toEqual(MOCK_ITEM);
        // Stats should be recalculated
        // Note: exact value depends on base stats implementation, but it should increase
        expect(result.current.hero.stats.brawn).toBeGreaterThan(initialBrawn);
    });
});
