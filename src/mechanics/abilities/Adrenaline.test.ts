import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './Adrenaline';
import { INITIAL_STATE, heroWithStats, testEquipment } from '../../tests/testUtils';
import { renderHook, act } from '@testing-library/react';
import { useCombat } from '../../hooks/useCombat';
import { Hero } from '../../types/hero';

describe('Adrenaline', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Adrenaline')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should add speed bonus modifier on activation', () => {
        const state = INITIAL_STATE;
        const result = ability.onActivate?.(state, 'hero');

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.stats.speed).toBe(2);
        expect(result?.modifications![0].duration).toBe(2);
    });

    it('should apply Adrenaline speed ability via hook (+2 speed for 2 rounds)', () => {
        const ADRENALINE_HERO: Hero = {
            ...heroWithStats({ speed: 0 }).original,
            equipment: {
                gloves: testEquipment({
                    name: 'Adrenaline Gloves',
                    abilities: ['Adrenaline'],
                    type: 'gloves' as const,
                })
            }
        };

        const { result } = renderHook(() => useCombat(ADRENALINE_HERO));

        act(() => result.current.startCombat());

        act(() => result.current.activateAbility('Adrenaline'));

        expect(result.current.combat.modifications).toHaveLength(1);
        expect(result.current.combat.modifications[0].modification.stats.speed).toBe(2);
        expect(result.current.combat.modifications[0].duration).toBe(2);

        // Round 1
        act(() => result.current.resolveSpeedRolls({
            heroRolls: [{ value: 2, isRerolled: false }, { value: 1, isRerolled: false }],
            enemyRolls: [{ value: 1, isRerolled: false }, { value: 1, isRerolled: false }]
        }));

        expect(result.current.combat.winner).toBe('hero');
        expect(result.current.combat.logs.slice(-1)[0].message).toContain('Hero 5 (+2 mod)');

        // Round 2
        act(() => result.current.nextRound());
        expect(result.current.combat.modifications[0].duration).toBe(1);

        act(() => {
            result.current.resolveSpeedRolls({
                heroRolls: [{ value: 1, isRerolled: false }, { value: 1, isRerolled: false }],
                enemyRolls: [{ value: 1, isRerolled: false }, { value: 1, isRerolled: false }]
            });
        });
        expect(result.current.combat.logs.slice(-1)[0].message).toContain('Hero 4 (+2 mod)');

        // Round 3
        act(() => result.current.nextRound());
        expect(result.current.combat.modifications).toHaveLength(0);

        act(() => result.current.resolveSpeedRolls({
            heroRolls: [{ value: 1, isRerolled: false }, { value: 1, isRerolled: false }],
            enemyRolls: [{ value: 1, isRerolled: false }, { value: 1, isRerolled: false }]
        }));
        expect(result.current.combat.logs.slice(-1)[0].message).toContain('Hero 2 vs');
    });
});
