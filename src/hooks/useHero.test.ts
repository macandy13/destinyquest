import { renderHook, act } from '@testing-library/react';
import { useHero } from '../hooks/useHero';
import { describe, it, expect } from 'vitest';
import { EquipmentItem } from '../types/hero';
import { testEquipment } from '../tests/testUtils';

const MOCK_ITEM: EquipmentItem = testEquipment({
    type: 'mainHand',
    name: 'Iron Sword',
    stats: {
        speed: 1,
        brawn: 2,
        magic: 0,
        armour: 0,
        health: 0
    }
});


describe('useHero Hook', () => {
    beforeEach(() => {
        localStorage.clear();
    });

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
        expect(result.current.hero.stats.brawn).toBeGreaterThan(initialBrawn);
    });

    it('should update name', () => {
        const { result } = renderHook(() => useHero());
        act(() => {
            result.current.updateName('Test Hero');
        });
        expect(result.current.hero.name).toBe('Test Hero');
    });

    it('should update path and apply health bonuses', () => {
        const { result } = renderHook(() => useHero());
        const baseMaxHealth = result.current.hero.stats.maxHealth;

        act(() => {
            result.current.updatePath('Warrior');
        });
        expect(result.current.hero.path).toBe('Warrior');
        expect(result.current.hero.stats.maxHealth).toBe(baseMaxHealth + 15);

        act(() => {
            result.current.updatePath('Mage');
        });
        expect(result.current.hero.stats.maxHealth).toBe(baseMaxHealth + 10);
    });

    it('should update career and add active abilities', () => {
        const { result } = renderHook(() => useHero());

        // First set a path so careers are valid (though hook doesn't strictly enforce career matching path in updateCareer, UI does)
        act(() => {
            result.current.updatePath('Warrior');
            result.current.updateCareer('Gladiator');
        });

        expect(result.current.hero.career).toBe('Gladiator');
        // Check for Gladiator abilities (Blood Rage, Head Butt)
        expect(result.current.activeAbilities).toContain('Blood Rage');
        expect(result.current.activeAbilities).toContain('Head Butt');
    });

    it('should update current health to max health when path changes', () => {
        const { result } = renderHook(() => useHero());
        const baseMaxHealth = result.current.hero.stats.maxHealth;

        // Reduce health first
        act(() => {
            result.current.updateHealth(10);
        });
        expect(result.current.hero.stats.health).toBe(10);

        // Change path to Warrior (+15 Max HP)
        act(() => {
            result.current.updatePath('Warrior');
        });

        const expectedMax = baseMaxHealth + 15;
        expect(result.current.hero.stats.maxHealth).toBe(expectedMax);
        // Current health should be reset to full
        expect(result.current.hero.stats.health).toBe(expectedMax);
    });
});
