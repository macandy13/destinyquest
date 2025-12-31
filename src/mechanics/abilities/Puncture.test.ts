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
import './Puncture';

describe('Puncture', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Puncture')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should inflict damage and reduce armour when activated', () => {
        const baseHero = heroWithStats({ brawn: 5, magic: 0, speed: 5 });
        const HERO: Hero = {
            ...baseHero.original,
            equipment: {
                mainHand: testEquipment({
                    name: 'Spear',
                    abilities: ['Puncture'],
                    type: 'mainHand',
                })
            }
        };

        let state = initCombat(HERO);
        const initialEnemyHealth = state.enemy!.stats.health;

        // Hero: 5 + (6+6) = 17
        // Enemy: 2 + (1+1) = 4
        state = resolveSpeedRolls(state,
            [{ value: 6, isRerolled: false }, { value: 6, isRerolled: false }],
            [{ value: 1, isRerolled: false }, { value: 1, isRerolled: false }]
        );

        state = commitSpeedResult(state);

        expect(state.phase).toBe('damage-roll');
        expect(state.winner).toBe('hero');

        expect(ability.canActivate?.(state)).toBe(true);
        state = activateAbility(state, 'Puncture');

        expect(state.phase).toBe('round-end');

        const currentEnemyHealth = state.enemy!.stats.health;
        const damageDealt = initialEnemyHealth - currentEnemyHealth;
        expect(damageDealt).toBeGreaterThanOrEqual(2);
        expect(damageDealt).toBeLessThanOrEqual(12);

        const armourMod = state.modifications.find(m => m.modification.source === 'Puncture');
        expect(armourMod).toBeDefined();
        expect(armourMod?.modification.stats.armour).toBe(-1);

        expect(state.logs).toEqual(expect.arrayContaining([
            expect.objectContaining({
                message: expect.stringContaining('Puncture!')
            })
        ]));
    });
});
