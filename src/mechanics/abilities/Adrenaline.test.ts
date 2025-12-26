import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './Adrenaline';
import { INITIAL_STATE, heroWithStats } from '../../tests/testUtils';
import { renderHook, act } from '@testing-library/react';
import { useCombat } from '../../hooks/useCombat';

describe('Adrenaline', () => {
    it('should add speed bonus modifier on activation', () => {
        const adrenaline = getAbilityDefinition('Adrenaline');
        const state = { ...INITIAL_STATE, logs: [] };
        const result = adrenaline?.onActivate?.(state);

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.stats.speed).toBe(2);
        expect(result?.modifications![0].duration).toBe(2);
    });

    it('should apply Adrenaline speed ability via hook (+2 speed for 2 rounds)', () => {
        const ADRENALINE_HERO = {
            ...heroWithStats({ speed: 0 }),
            equipment: {
                gloves: {
                    name: 'Adrenaline Gloves',
                    abilities: ['Adrenaline'],
                    id: 'adr-gloves',
                    type: 'gloves',
                    act: 1
                }
            }
        };

        const { result } = renderHook(() => useCombat(ADRENALINE_HERO));

        act(() => result.current.startCombat());

        // Activate Ability
        act(() => result.current.activateAbility('Adrenaline'));

        expect(result.current.combat.modifications).toHaveLength(1);
        expect(result.current.combat.modifications[0].modification.stats.speed).toBe(2);
        expect(result.current.combat.modifications[0].duration).toBe(2);

        // Round 1
        // Speed: 0 (base) + 2 (mod) + 3 (roll) = 5
        // Enemy: 2 (base) + 2 (roll) = 4
        // Hero wins
        act(() => result.current.resolveSpeedRolls({
            heroRolls: [{ value: 2, isRerolled: false }, { value: 1, isRerolled: false }],
            enemyRolls: [{ value: 1, isRerolled: false }, { value: 1, isRerolled: false }]
        }));

        // Hero Total calculation:
        // Hero Speed 0 + Mod 2 + Roll 3 = 5.
        expect(result.current.combat.winner).toBe('hero');
        expect(result.current.combat.logs.slice(-1)[0].message).toContain('Hero 5 (+2 mod)');

        // Round 2 (Duration should decrease)
        act(() => result.current.nextRound());

        expect(result.current.combat.modifications[0].duration).toBe(1);

        // Speed check again
        act(() => {
            result.current.resolveSpeedRolls({
                heroRolls: [{ value: 1, isRerolled: false }, { value: 1, isRerolled: false }],
                enemyRolls: [{ value: 1, isRerolled: false }, { value: 1, isRerolled: false }]
            });
        });
        expect(result.current.combat.logs.slice(-1)[0].message).toContain('Hero 4 (+2 mod)');

        // Round 3 (Duration should expire)
        act(() => result.current.nextRound());

        expect(result.current.combat.modifications).toHaveLength(0);

        // Speed check - modifier gone
        // Speed: 0 (base) + 2 (roll) = 2
        act(() => result.current.resolveSpeedRolls({
            heroRolls: [{ value: 1, isRerolled: false }, { value: 1, isRerolled: false }],
            enemyRolls: [{ value: 1, isRerolled: false }, { value: 1, isRerolled: false }]
        }));
        expect(result.current.combat.logs.slice(-1)[0].message).toContain('Hero 2 vs'); // No mod text
    });
});
