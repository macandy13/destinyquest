import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './Parry';
import { INITIAL_STATE, MOCK_HERO, heroWithStats, testEquipment } from '../../tests/testUtils';
import { renderHook, act } from '@testing-library/react';
import { useCombat } from '../../hooks/useCombat';
import { Hero } from '../../types/hero';

describe('Parry', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Parry')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should be activatable only in damage-roll phase when enemy won', () => {
        // Valid state
        const validState = { ...INITIAL_STATE, phase: 'damage-roll', winner: 'enemy' };
        // @ts-ignore - Partial state
        expect(ability.canActivate?.(validState, 'hero')).toBe(true);

        // Invalid phase
        const invalidPhase = { ...INITIAL_STATE, phase: 'speed-roll', winner: 'enemy' };
        // @ts-ignore - Partial state
        expect(ability.canActivate?.(invalidPhase, 'hero')).toBe(false);

        // Invalid winner
        const invalidWinner = { ...INITIAL_STATE, phase: 'damage-roll', winner: 'hero' };
        // @ts-ignore - Partial state
        expect(ability.canActivate?.(invalidWinner, 'hero')).toBe(false);

        // @ts-ignore - Partial state
        const updates = ability.onActivate?.(validState, 'hero');

        expect(updates?.phase).toBe('round-end');
        expect(updates?.damageRolls).toEqual([{ value: 0, isRerolled: false }]);
        expect(updates?.logs?.[0].message).toContain('blocked');
    });

    it('should apply Parry combat ability via hook (cancel enemy damage)', () => {
        const PARRY_HERO: Hero = {
            ...heroWithStats({}).original,
            equipment: {
                mainHand: testEquipment({
                    name: 'Parrying Dagger',
                    abilities: ['Parry'],
                    type: 'mainHand',
                })
            }
        };

        const { result } = renderHook(() => useCombat(PARRY_HERO));

        act(() => result.current.startCombat());

        // Advance to Speed Round
        act(() => result.current.nextRound());

        // Enemy wins speed round
        // Hero: 3(spd) + 1(roll) = 4
        // Enemy: 3(spd) + 5(roll) = 8
        act(() => result.current.resolveSpeedRolls({
            heroRolls: [{ value: 0, isRerolled: false }, { value: 1, isRerolled: false }],
            enemyRolls: [{ value: 2, isRerolled: false }, { value: 3, isRerolled: false }]
        }));

        expect(result.current.combat.phase).toBe('speed-roll');
        expect(result.current.combat.winner).toBe('enemy');

        // Proceed to damage phase confirmed
        act(() => result.current.commitSpeedResult());

        expect(result.current.combat.phase).toBe('damage-roll');

        // Activate Parry
        act(() => result.current.activateAbility('Parry'));

        expect(result.current.combat.phase).toBe('round-end');
        expect(result.current.combat.logs.slice(-1)[0].message).toContain('Parry');
        expect(result.current.combat.damageRolls).toEqual([{ value: 0, isRerolled: false }]);
        // Hero should not have taken damage
        expect(result.current.combat.hero!.stats.health).toBe(MOCK_HERO.stats.health);
    });
});
