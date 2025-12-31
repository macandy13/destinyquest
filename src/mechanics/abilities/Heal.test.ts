import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './Heal';
import { INITIAL_STATE, MOCK_HERO, heroWithStats, testEquipment } from '../../tests/testUtils';
import { renderHook, act } from '@testing-library/react';
import { useCombat } from '../../hooks/useCombat';
import { Hero } from '../../types/hero';

describe('Heal', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Heal')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should restore 4 health up to max', () => {
        const damagedState = {
            ...INITIAL_STATE,
            hero: heroWithStats({ health: 10 })
        };

        const updates = ability.onActivate?.(damagedState);
        expect(updates?.hero?.stats.health).toBe(14);
    });

    it('should execute clamping to max health', () => {
        const mildDamageState = {
            ...INITIAL_STATE,
            hero: heroWithStats({ health: 29 })
        };

        const updates = ability.onActivate?.(mildDamageState);
        expect(updates?.hero?.stats.health).toBe(30);
    });

    it('should return false for canActivate if health is full', () => {
        const fullHealthState = {
            ...INITIAL_STATE,
            hero: heroWithStats({ health: 30 })
        };
        expect(ability.canActivate?.(fullHealthState)).toBe(false);
    });

    it('should return true for canActivate if health is not full', () => {
        const damagedState = {
            ...INITIAL_STATE,
            hero: heroWithStats({ health: 10 })
        };
        expect(ability.canActivate?.(damagedState)).toBe(true);
    });

    it('should apply Heal modifier ability via hook (restore 4 health)', () => {
        const HEAL_HERO: Hero = {
            ...heroWithStats({}).original,
            equipment: {
                necklace: testEquipment({
                    name: 'Healing Necklace',
                    abilities: ['Heal'],
                    type: 'necklace',
                })
            }
        };

        const { result } = renderHook(() => useCombat(HEAL_HERO));

        act(() => result.current.startCombat());

        // Simulate taking damage
        act(() => {
            // Need to progress to a state where we can take damage or forcing it?
            // Simulating a round where enemy wins and deals damage.
            result.current.nextRound();
            result.current.resolveSpeedRolls({
                heroRolls: [{ value: 1, isRerolled: false }, { value: 1, isRerolled: false }],
                enemyRolls: [{ value: 6, isRerolled: false }, { value: 6, isRerolled: false }]
            }); // Enemy wins
        });

        act(() => {
            // Hero takes damage
            result.current.commitSpeedResult(); // Proceed from speed to damage
            result.current.resolveDamageRolls([{ value: 10, isRerolled: false }]);
        });
        act(() => {
            result.current.commitDamageResult();
        });

        const healthBefore = result.current.combat.hero!.stats.health;
        expect(healthBefore).toBeLessThan(MOCK_HERO.stats.maxHealth);

        // Activate Heal
        act(() => result.current.activateAbility('Heal'));

        expect(result.current.combat.hero!.stats.health).toBe(healthBefore + 4);
        expect(result.current.combat.logs.slice(-1)[0].message).toContain('Restored 4 health');
    });
});
