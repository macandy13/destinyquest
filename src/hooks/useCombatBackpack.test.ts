
import { act, renderHook } from '@testing-library/react';
import { useCombat } from './useCombat';
import { MOCK_HERO, MOCK_ENEMY } from '../tests/testUtils';
import { BackpackItem } from '../types/hero';

const HEALING_POTION: BackpackItem = {
    id: 'healing_potion',
    name: 'Healing Potion',
    type: 'backpack',
    act: 1,
    effect: '+6 health',
    modifier: '+6 health',
    stats: { health: 6 },
    duration: 0,
    uses: 1,
    notes: 'Test potion'
};

const SPEED_POTION: BackpackItem = {
    id: 'speed_potion',
    name: 'Speed Potion',
    type: 'backpack',
    act: 1,
    effect: '+2 speed',
    modifier: '+2 speed',
    stats: { speed: 2 },
    duration: 1,
    uses: 1,
    notes: 'Test potion'
};

describe('useCombat - Backpack Items', () => {
    it('initializes combat with backpack items', () => {
        const heroWithBackpack = {
            ...MOCK_HERO,
            backpack: [HEALING_POTION, null, null, null, null]
        };

        const { result } = renderHook(() => useCombat(heroWithBackpack));

        act(() => {
            result.current.startCombat(MOCK_ENEMY);
        });

        expect(result.current.combat.backpack).toHaveLength(1);
        expect(result.current.combat.backpack[0].name).toBe('Healing Potion');
    });

    it('uses healing potion to restore health', () => {
        const heroWithBackpack = {
            ...MOCK_HERO,
            stats: { ...MOCK_HERO.stats, health: 10, maxHealth: 30 },
            backpack: [HEALING_POTION]
        };

        const { result } = renderHook(() => useCombat(heroWithBackpack));

        act(() => {
            result.current.startCombat(MOCK_ENEMY);
        });

        expect(result.current.combat.hero?.stats.health).toBe(10);

        act(() => {
            result.current.activateAbility('Healing Potion');
        });

        expect(result.current.combat.hero?.stats.health).toBe(16); // 10 + 6
        expect(result.current.combat.backpack[0].uses).toBe(0);
        expect(result.current.combat.logs.some(l => l.message.includes('Used Healing Potion'))).toBe(true);
    });

    it('uses speed potion to modify stats', () => {
        const heroWithBackpack = {
            ...MOCK_HERO,
            stats: { ...MOCK_HERO.stats, speed: 2 },
            backpack: [SPEED_POTION]
        };

        const { result } = renderHook(() => useCombat(heroWithBackpack));

        act(() => {
            result.current.startCombat(MOCK_ENEMY);
        });

        act(() => {
            result.current.activateAbility('Speed Potion');
        });

        expect(result.current.combat.modifications).toHaveLength(1);
        expect(result.current.combat.modifications[0].modification.stats.speed).toBe(2);
        expect(result.current.combat.backpack[0].uses).toBe(0);
    });
});
