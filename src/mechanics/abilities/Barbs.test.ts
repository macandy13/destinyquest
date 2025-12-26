import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './Barbs';
import { INITIAL_STATE, MOCK_ENEMY, heroWithStats } from '../../tests/testUtils';
import { renderHook, act } from '@testing-library/react';
import { useCombat } from '../../hooks/useCombat';
import { Hero } from '../../types/hero';

describe('Barbs', () => {
    it('should inflict 1 damage to enemy on round end', () => {
        const barbs = getAbilityDefinition('Barbs');
        const state = { ...INITIAL_STATE, enemy: { ...MOCK_ENEMY, health: 10 } };

        const updates = barbs?.onRoundEnd?.(state);

        expect(updates?.enemy?.health).toBe(9);
        expect(updates?.logs?.[0].message).toContain('Barbs inflicts 1 damage');
    });

    it('should not reduce enemy health below 0', () => {
        const barbs = getAbilityDefinition('Barbs');
        const state = { ...INITIAL_STATE, enemy: { ...MOCK_ENEMY, health: 0 } };

        const updates = barbs?.onRoundEnd?.(state);
        expect(updates).toEqual({});
    });

    it('should apply Barbs passive ability via hook (1 damage at end of round)', () => {
        const BARBS_HERO: Hero = {
            ...heroWithStats({ brawn: 0, magic: 0 }),
            equipment: {
                gloves: {
                    name: 'Barbed Bracers',
                    abilities: ['Barbs'],
                    id: 'barbs-gloves',
                    type: 'gloves',
                    act: 1
                }
            }
        };

        const { result } = renderHook(() => useCombat(BARBS_HERO));

        act(() => result.current.startCombat());

        const initialEnemyHealth = result.current.combat.enemy!.health;

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
        expect(result.current.combat.enemy!.health).toBe(initialEnemyHealth - 4);
        expect(result.current.combat.logs.slice(-1)[0].message).toContain('Barbs inflicts 1 damage');
    });
});
