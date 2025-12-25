import { renderHook, act } from '@testing-library/react';
import { useCombat } from '../hooks/useCombat';
import { HeroStats } from '../types/hero';
import { describe, it, expect, beforeEach } from 'vitest';

const MOCK_HERO_STATS: HeroStats = {
    speed: 5,
    brawn: 5,
    magic: 0,
    armour: 2,
    health: 20,
    maxHealth: 20
};

describe('useCombat Hook', () => {
    it('should initialize in inactive state', () => {
        const { result } = renderHook(() => useCombat(MOCK_HERO_STATS));
        expect(result.current.combat.isActive).toBe(false);
        expect(result.current.combat.phase).toBe('combat-end');
    });

    it('should start combat correctly', () => {
        const { result } = renderHook(() => useCombat(MOCK_HERO_STATS));

        act(() => {
            result.current.startCombat();
        });

        expect(result.current.combat.isActive).toBe(true);
        expect(result.current.combat.phase).toBe('speed-roll');
        expect(result.current.combat.round).toBe(1);
        expect(result.current.combat.enemy).toBeDefined();
    });

    it('should resolve speed round where hero wins', () => {
        const { result } = renderHook(() => useCombat(MOCK_HERO_STATS));

        act(() => {
            result.current.startCombat();
        });

        // Hero total: 6 + 5(spd) = 11
        // Enemy total: 2 + enemySpd (dummy 2) = 4
        // Hero wins clearly

        act(() => {
            result.current.resolveSpeedRound(6, [3, 3], 2, [1, 1]);
        });

        expect(result.current.combat.phase).toBe('damage-roll');
        expect(result.current.combat.winner).toBe('hero');
        expect(result.current.combat.heroSpeedRolls).toEqual([3, 3]);
    });

    it('should resolve damage correctly (applying armour)', () => {
        const { result } = renderHook(() => useCombat(MOCK_HERO_STATS));

        act(() => {
            result.current.startCombat();
        });

        // Speed round win for Hero
        act(() => {
            result.current.resolveSpeedRound(20, [6, 6], 0, [0, 0]);
        });

        const initialEnemyHealth = result.current.combat.enemy!.health;

        // Damage roll 6 + 5(brawn) = 11 damage
        // Enemy armour 0
        act(() => {
            result.current.resolveDamageAndArmour(6, [6]);
        });

        expect(result.current.combat.enemy!.health).toBe(initialEnemyHealth - 11);
        expect(result.current.combat.phase).toBe('round-end');
        expect(result.current.combat.damageRolls).toEqual([6]);
    });
});
