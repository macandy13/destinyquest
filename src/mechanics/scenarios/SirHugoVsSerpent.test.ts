import { deterministicRoll, TEST_BOOK } from "../../tests/testUtils";
import { Enemy } from "../../types/character";
import { Hero } from "../../types/hero";
import { applyDamage, applyPassiveAbilities, endRound, rollForDamage, rollForSpeed, startCombat, startRound, useBackpackItem } from "../CombatEngine";

describe('Scenario: Sir Hugo vs Serpent', () => {
    it('works', () => {
        const SIR_HUGO: Hero = {
            type: 'hero',
            name: 'Sir Hugo',
            stats: {
                speed: 4,
                brawn: 7,
                magic: 1,
                armour: 5,
                health: 30,
                maxHealth: 30,
                speedDice: 2,
                damageDice: 1
            },
            equipment: {},
            backpack: [],
            path: '',
            career: '',
            money: 0
        };

        const SERPENT: Enemy = {
            type: 'enemy',
            name: 'Serpent',
            stats: {
                speed: 6,
                brawn: 3,
                magic: 0,
                armour: 2,
                health: 12,
                maxHealth: 12,
            },
            bookRef: TEST_BOOK,
            abilities: ['Venom']
        };

        let state = startCombat(SIR_HUGO, SERPENT);
        state = startRound(state);

        // --- ROUND 1 ---
        state = rollForSpeed(
            state,
            /*hero=*/ deterministicRoll([2, 4]),
            /*enemy=*/ deterministicRoll([5, 6]));
        expect(state.winner).toBe('enemy');

        state = rollForDamage(state, deterministicRoll([6]));
        state = applyDamage(state);
        state = applyPassiveAbilities(state);
        state = endRound(state);

        expect(state.hero!.stats.health).toBe(24); // 30 - 4 - 2
        expect(state.enemy!.stats.health).toBe(12);

        state = startRound(state);
        state = rollForSpeed(
            state,
            /*hero=*/ deterministicRoll([5, 6]),
            /*enemy=*/ deterministicRoll([2, 2]));
        expect(state.winner).toBe('hero');
        state = rollForDamage(state, deterministicRoll([5]));
        state = applyDamage(state);
        state = applyPassiveAbilities(state);
        state = endRound(state);

        expect(state.hero!.stats.health).toBe(22);
        expect(state.enemy!.stats.health).toBe(2);
    });
});
