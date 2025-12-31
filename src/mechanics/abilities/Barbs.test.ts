import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './Barbs';
import { INITIAL_STATE, enemyWithStats, heroWithStats, testEquipment } from '../../tests/testUtils';
import { renderHook, act } from '@testing-library/react';
import { useCombat } from '../../hooks/useCombat';
import { Hero } from '../../types/hero';

describe('Barbs', () => {
    it('should inflict 1 damage to enemy on round end', () => {
        const barbs = getAbilityDefinition('Barbs');
        const state = {
            ...INITIAL_STATE,
            enemy: enemyWithStats({ health: 10 })
        };

        const updates = barbs?.onRoundEnd?.(state, 'enemy');

        expect(updates?.enemy?.stats.health).toBe(9);
        expect(updates?.logs?.[0].message).toContain('Barbs inflicts 1 damage');
    });

    it('should not reduce enemy health below 0', () => {
        const barbs = getAbilityDefinition('Barbs');
        const state = {
            ...INITIAL_STATE,
            enemy: enemyWithStats({ health: 0 })
        };

        const updates = barbs?.onRoundEnd?.(state, 'enemy');
        expect(updates).toEqual({});
    });

    it('should apply Barbs passive ability via hook (1 damage at end of round)', () => {
        const baseHero = heroWithStats({ brawn: 0, magic: 0 });
        const BARBS_HERO: Hero = {
            ...baseHero.original,
            equipment: {
                gloves: testEquipment({
                    name: 'Barbed Bracers',
                    abilities: ['Barbs'],
                    type: 'gloves',
                }),
            }
        };

        const { result } = renderHook(() => useCombat(BARBS_HERO));

        act(() => result.current.startCombat());

        const initialEnemyHealth = result.current.combat.enemy!.stats.health;

        // Simulate combat flow
        act(() => result.current.nextRound());
        act(() => result.current.resolveSpeedRolls({
            heroRolls: [{ value: 6, isRerolled: false }, { value: 6, isRerolled: false }],
            enemyRolls: [{ value: 1, isRerolled: false }, { value: 1, isRerolled: false }]
        }));

        // Damage phase
        // Damage: 3 + 0(brawn) = 3.
        act(() => result.current.resolveDamageRolls([{ value: 3, isRerolled: false }]));
        act(() => result.current.commitDamageResult());

        // 3 combat damage + 1 Barbs damage = 4 total
        expect(result.current.combat.enemy!.stats.health).toBe(initialEnemyHealth - 4);
        expect(result.current.combat.logs).toEqual(expect.arrayContaining([
            expect.objectContaining({
                message: expect.stringContaining('Barbs inflicts 1 damage')
            })
        ]));
    });
});
