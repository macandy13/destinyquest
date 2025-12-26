import { Hero } from '../../types/hero';
import { getAbilityDefinition } from '../abilityRegistry';
import './Acid';
import { INITIAL_STATE, heroWithStats } from '../../tests/testUtils';
import { renderHook, act } from '@testing-library/react';
import { useCombat } from '../../hooks/useCombat';

describe('Acid', () => {
    it('should add 1 damage per die rolled', () => {
        const acid = getAbilityDefinition('Acid');
        const rolls = [{ value: 1, isRerolled: false }, { value: 4, isRerolled: false }, { value: 6, isRerolled: false }];
        const bonus = acid?.onDamageCalculate?.(INITIAL_STATE, { total: 10, rolls });
        expect(bonus).toBe(3);
    });

    it('should apply Acid passive ability via hook (add +1 per damage die)', () => {
        const ACID_HERO: Hero = {
            ...heroWithStats({ damageDice: 2, brawn: 0, magic: 0 }),
            equipment: {
                gloves: {
                    name: 'Acid Gloves',
                    abilities: ['Acid'],
                    id: 'acid-gloves',
                    type: 'gloves',
                    act: 1
                }
            }
        };

        const { result } = renderHook(() => useCombat(ACID_HERO));

        act(() => result.current.startCombat());

        act(() => {
            result.current.nextRound(); // Speed roll logic would happen here
            result.current.resolveSpeedRolls({
                heroRolls: [{ value: 6, isRerolled: false }, { value: 6, isRerolled: false }],
                enemyRolls: [{ value: 1, isRerolled: false }, { value: 1, isRerolled: false }]
            }); // Hero wins
        });

        const initialEnemyHealth = result.current.combat.enemy!.health;

        // Damage roll 3 (1 die) + 0(brawn) = 3 damage
        // Acid adds +1 per die = +2
        // Total = 5
        act(() => result.current.resolveDamageRolls([{ value: 2, isRerolled: false }, { value: 1, isRerolled: false }]));
        act(() => result.current.commitDamageResult());

        expect(result.current.combat.enemy!.health).toBe(initialEnemyHealth - 5);
        expect(result.current.combat.logs.slice(-1)[0].message).toContain('(+2 Acid)');
    });
});
