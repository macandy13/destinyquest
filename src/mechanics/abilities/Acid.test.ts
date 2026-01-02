import { describe, it, expect, beforeEach } from 'vitest';
import { Hero } from '../../types/hero';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './Acid';
import { INITIAL_STATE, heroWithStats, testEquipment } from '../../tests/testUtils';
import { renderHook, act } from '@testing-library/react';
import { useCombat } from '../../hooks/useCombat';

describe('Acid', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Acid')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should add 1 damage per die rolled', () => {
        const rolls = [{ value: 1, isRerolled: false }, { value: 4, isRerolled: false }, { value: 6, isRerolled: false }];
        const bonus = ability.onDamageCalculate?.(INITIAL_STATE, 'hero', { total: 10, rolls });
        expect(bonus).toBe(3);
    });

    it('should apply Acid passive ability via hook (add +1 per damage die)', () => {
        const baseHero = heroWithStats({ damageDice: 2, brawn: 0, magic: 0 });
        const ACID_HERO: Hero = {
            ...baseHero.original,
            equipment: {
                gloves: testEquipment({
                    name: 'Acid Gloves',
                    abilities: ['Acid'],
                    type: 'gloves',
                })
            }
        };

        const { result } = renderHook(() => useCombat(ACID_HERO));

        act(() => result.current.startCombat());

        act(() => {
            result.current.nextRound();
            result.current.resolveSpeedRolls({
                heroRolls: [{ value: 6, isRerolled: false }, { value: 6, isRerolled: false }],
                enemyRolls: [{ value: 1, isRerolled: false }, { value: 1, isRerolled: false }]
            });
        });

        const initialEnemyHealth = result.current.combat.enemy!.stats.health;

        act(() => result.current.resolveDamageRolls([{ value: 2, isRerolled: false }, { value: 1, isRerolled: false }]));
        act(() => result.current.commitDamageResult());

        expect(result.current.combat.enemy!.stats.health).toBe(initialEnemyHealth - 5);
        expect(result.current.combat.logs).toEqual(expect.arrayContaining([
            expect.objectContaining({
                message: expect.stringContaining('(+2 Acid)')
            })
        ]));
    });
});
