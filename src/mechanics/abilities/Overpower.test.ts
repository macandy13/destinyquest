import { describe, it, expect, beforeEach } from 'vitest';
import {
    initCombat,
    resolveSpeedRolls,
    commitSpeedResult,
    activateAbility
} from '../CombatEngine';
import { heroWithStats, testEquipment } from '../../tests/testUtils';
import { Hero } from '../../types/hero';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './Overpower';

describe('Overpower', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Overpower')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should allow activation when enemy wins speed round and apply damage', () => {
        const baseHero = heroWithStats({ brawn: 5, magic: 0, speed: 5 });
        const OVERPOWER_HERO: Hero = {
            ...baseHero.original,
            equipment: {
                mainHand: testEquipment({
                    name: 'Sword of Power',
                    abilities: ['Overpower'],
                    type: 'mainHand',
                })
            }
        };

        let state = initCombat(OVERPOWER_HERO);
        const initialEnemyHealth = state.enemy!.stats.health;

        state = resolveSpeedRolls(state,
            [{ value: 1, isRerolled: false }, { value: 1, isRerolled: false }],
            [{ value: 6, isRerolled: false }, { value: 6, isRerolled: false }]
        );

        state = commitSpeedResult(state);

        expect(ability.canActivate?.(state, 'hero')).toBe(true);
        state = activateAbility(state, 'Overpower');

        expect(state.phase).toBe('round-end');

        const enemyHealth = state.enemy!.stats.health;
        const damageDealt = initialEnemyHealth - enemyHealth;

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
