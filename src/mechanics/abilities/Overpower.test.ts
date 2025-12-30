import { describe, it, expect } from 'vitest';
import {
    initCombat,
    resolveSpeedRolls,
    commitSpeedResult,
    activateAbility
} from '../CombatEngine';
import { heroWithStats } from '../../tests/testUtils';
import { Hero } from '../../types/hero';
import './Overpower'; // Ensure Overpower is registered

describe('Overpower', () => {
    it('should allow activation when enemy wins speed round and apply damage', () => {
        // Setup Hero with Overpower
        const baseHero = heroWithStats({ brawn: 5, magic: 0, speed: 5 });
        const OVERPOWER_HERO: Hero = {
            ...baseHero.original,
            equipment: {
                mainHand: {
                    name: 'Sword of Power',
                    abilities: ['Overpower'],
                    id: 'op-sword',
                    type: 'mainHand',
                    book: 'book1',
                    act: 1
                }
            }
        };

        let state = initCombat(OVERPOWER_HERO);
        const initialEnemyHealth = state.enemy!.stats.health;

        state = resolveSpeedRolls(state,
            [{ value: 1, isRerolled: false }, { value: 1, isRerolled: false }],
            [{ value: 6, isRerolled: false }, { value: 6, isRerolled: false }]
        );

        state = commitSpeedResult(state);
        state = activateAbility(state, 'Overpower');

        expect(state.phase).toBe('round-end');

        const enemyHealth = state.enemy!.stats.health;
        const damageDealt = initialEnemyHealth - enemyHealth;

        // Overpower deals 2d6 damage (min 2, max 12)
        expect(damageDealt).toBeGreaterThanOrEqual(2);
        expect(damageDealt).toBeLessThanOrEqual(12);

        expect(state.logs).toEqual(expect.arrayContaining([
            expect.objectContaining({
                message: expect.stringContaining('Overpower!')
            })
        ]));

        expect(state.hero?.stats.health).toBe(baseHero.stats.maxHealth);
    });
});
