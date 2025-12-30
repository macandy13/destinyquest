import { renderHook, act } from '@testing-library/react';
import { useCombat } from './useCombat';
import { describe, it, expect } from 'vitest';
import { registerAbility } from '../mechanics/abilityRegistry';
import { MOCK_HERO, heroWithStats } from '../tests/testUtils';
import { Hero } from '../types/hero';

describe('useCombat Hook', () => {
    it('should initialize in inactive state', () => {
        const { result } = renderHook(() => useCombat(MOCK_HERO));
        expect(result.current.combat.phase).toBe('combat-start');
    });

    it('should start combat correctly', () => {
        const { result } = renderHook(() => useCombat(MOCK_HERO));

        act(() => result.current.startCombat());

        expect(result.current.combat.phase).toBe('combat-start');
        expect(result.current.combat.round).toBe(1);
        expect(result.current.combat.enemy).toBeDefined();
    });

    it('should resolve speed round where hero wins', () => {
        const { result } = renderHook(() => useCombat(heroWithStats({ speed: 5 })));

        act(() => result.current.startCombat());
        act(() => {
            result.current.resolveSpeedRolls({
                heroRolls: [{ value: 3, isRerolled: false }, { value: 3, isRerolled: false }],
                enemyRolls: [{ value: 1, isRerolled: false }, { value: 1, isRerolled: false }]
            });
        });

        expect(result.current.combat.phase).toBe('speed-roll');
        expect(result.current.combat.winner).toBe('hero');
        expect(result.current.combat.heroSpeedRolls).toEqual([
            { value: 3, isRerolled: false },
            { value: 3, isRerolled: false }
        ]);
    });

    it('should resolve damage correctly (applying armour)', () => {
        const { result } = renderHook(() => useCombat(heroWithStats({ brawn: 5 })));

        act(() => {
            // Pass explicitly tough enemy to test armour
            result.current.startCombat({ name: 'Armoured dummy', stats: { speed: 1, brawn: 1, magic: 1, armour: 2, health: 20, maxHealth: 20 }, abilities: [] });
        });

        // Speed round win for Hero
        act(() => result.current.resolveSpeedRolls({
            heroRolls: [{ value: 6, isRerolled: false }, { value: 6, isRerolled: false }],
            enemyRolls: [{ value: 0, isRerolled: false }, { value: 0, isRerolled: false }]
        }));

        const initialEnemyHealth = result.current.combat.enemy!.stats.health;

        // Damage roll 6 + 5(brawn) = 11 damage OR if magic is > 5? MOCK_HERO magic is 1. So 5 used.
        // Enemy armour 2
        // Total: 9.
        act(() => result.current.resolveDamageRolls([{ value: 6, isRerolled: false }]));
        act(() => result.current.commitDamageResult());

        expect(result.current.combat.enemy!.stats.health).toBe(initialEnemyHealth - 9);
        expect(result.current.combat.phase).toBe('round-end');
        expect(result.current.combat.damageRolls).toEqual([{ value: 6, isRerolled: false }]);
    });

    it('should apply damage-bonus modifier', () => {
        // heroWithStats({ brawn: 0 }) to make math easy
        const DAMAGE_MOD_HERO = heroWithStats({ brawn: 0, magic: 0 });

        const { result } = renderHook(() => useCombat(DAMAGE_MOD_HERO));

        act(() => result.current.startCombat());

        // Manually inject a modifier for testing purposes
        const MockAbilityDef = {
            name: 'Mock Damage Buff',
            type: 'modifier' as const,
            description: 'Adds +3 damage',
            onActivate: (state: any) => ({
                modifications: [...state.modifications, {
                    modification: {
                        stats: { damageModifier: 3 },
                        source: 'Mock Buff',
                        target: 'hero'
                    },
                    duration: 2,
                    id: 'mock-buff-id'
                }],
                logs: [...state.logs, { round: state.round, message: 'Used Mock Buff', type: 'info' }]
            })
        };
        registerAbility(MockAbilityDef);

        const HERO_WITH_ABILITY: Hero = {
            ...DAMAGE_MOD_HERO.original,
            equipment: {
                talisman: {
                    id: 'buff-charm',
                    type: 'talisman',
                    act: 1,
                    name: 'Buff Charm',
                    abilities: ['Mock Damage Buff']
                }
            }
        };

        const resultWithAbility = renderHook(() => useCombat(HERO_WITH_ABILITY)).result;

        act(() => resultWithAbility.current.startCombat());
        act(() => resultWithAbility.current.activateAbility('Mock Damage Buff'));

        // Verify modifier is present
        expect(resultWithAbility.current.combat.modifications).toHaveLength(1);
        expect(resultWithAbility.current.combat.modifications[0].modification.stats.damageModifier).toBe(3);

        // Go to damage phase
        act(() => resultWithAbility.current.nextRound()); // speed phase
        act(() => resultWithAbility.current.resolveSpeedRolls({
            heroRolls: [{ value: 6, isRerolled: false }, { value: 6, isRerolled: false }],
            enemyRolls: [{ value: 1, isRerolled: false }, { value: 1, isRerolled: false }]
        }));
        act(() => resultWithAbility.current.commitSpeedResult()); // damage phase

        // Execute damage
        // Roll = 10. Brawn = 0. Mod = 3. Total = 13.
        const initialEnemyHealth = resultWithAbility.current.combat.enemy!.stats.health;
        act(() => resultWithAbility.current.resolveDamageRolls([{ value: 10, isRerolled: false }]));
        act(() => resultWithAbility.current.commitDamageResult());

        // Enemy has 0 armour in mock.
        // Expected damage: 10 (roll) + 0 (brawn) + 3 (mod) = 13.
        const expectedHealth = initialEnemyHealth - 13;
        expect(resultWithAbility.current.combat.enemy!.stats.health).toBe(expectedHealth);
    });

    it('should apply speed-dice modifier', () => {
        const MockDiceAbilityDef = {
            name: 'Mock Dice Buff',
            type: 'modifier' as const,
            description: 'Adds +1 speed die',
            onActivate: (state: any) => ({
                modifications: [...state.modifications, {
                    modification: {
                        stats: { speedDice: 1 },
                        source: 'Mock Dice',
                        target: 'hero'
                    },
                    duration: 2,
                    id: 'mock-dice-id'
                }]
            })
        };

        registerAbility(MockDiceAbilityDef);

        const HERO_WITH_DICE: Hero = {
            ...MOCK_HERO,
            equipment: {
                ring1: {
                    id: 'dice-charm',
                    type: 'ring',
                    act: 1,
                    name: 'Dice Charm',
                    abilities: ['Mock Dice Buff']
                }
            }
        };

        const { result } = renderHook(() => useCombat(HERO_WITH_DICE));

        act(() => result.current.startCombat());
        act(() => result.current.activateAbility('Mock Dice Buff'));

        // Next round to checking rolling
        act(() => result.current.nextRound());

        // Check the rolls in state. Hero should have speedDice (def 2) + 1 = 3 rolls.
        expect(result.current.combat.heroSpeedRolls).toHaveLength(3);
    });
});
