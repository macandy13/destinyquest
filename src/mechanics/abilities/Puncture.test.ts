import { describe, it, expect } from 'vitest';
import {
    initCombat,
    resolveSpeedRolls,
    commitSpeedResult,
    activateAbility
} from '../CombatEngine';
import { heroWithStats } from '../../tests/testUtils';
import { Hero } from '../../types/hero';
import './Puncture'; // Ensure ability is registered

describe('Puncture', () => {
    it('should inflict damage and reduce armour when activated', () => {
        // Setup Hero with Puncture
        const baseHero = heroWithStats({ brawn: 5, magic: 0, speed: 5 });
        const HERO: Hero = {
            ...baseHero.original,
            equipment: {
                mainHand: {
                    name: 'Spear',
                    abilities: ['Puncture'],
                    id: 'spear',
                    type: 'mainHand',
                    book: 'book1',
                    act: 1
                }
            }
        };

        // 1. Initialize Combat
        let state = initCombat(HERO);
        const initialEnemyHealth = state.enemy!.stats.health;

        // 2. Resolve Speed Rolls (Hero Wins)
        // Hero: 5 + (6+6) = 17
        // Enemy: 2 + (1+1) = 4
        state = resolveSpeedRolls(state,
            [{ value: 6, isRerolled: false }, { value: 6, isRerolled: false }],
            [{ value: 1, isRerolled: false }, { value: 1, isRerolled: false }]
        );

        // 3. Commit Speed Result (transitions to damage-roll)
        state = commitSpeedResult(state);

        expect(state.phase).toBe('damage-roll');
        expect(state.winner).toBe('hero');

        // 4. Activate Ability
        state = activateAbility(state, 'Puncture');

        // 5. Assertions
        expect(state.phase).toBe('round-end');

        // Check damage application (2d6)
        const currentEnemyHealth = state.enemy!.stats.health;
        const damageDealt = initialEnemyHealth - currentEnemyHealth;
        expect(damageDealt).toBeGreaterThanOrEqual(2);
        expect(damageDealt).toBeLessThanOrEqual(12);

        // Check Armour Reduction
        const armourMod = state.modifications.find(m => m.modification.source === 'Puncture');
        expect(armourMod).toBeDefined();
        expect(armourMod?.modification.stats.armour).toBe(-1);

        // Verify logs
        expect(state.logs).toEqual(expect.arrayContaining([
            expect.objectContaining({
                message: expect.stringContaining('Puncture!')
            })
        ]));
    });
});
