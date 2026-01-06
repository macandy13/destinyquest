import { describe, it, expect } from 'vitest';
import {
    startCombat,
    startRound,
    endRound,
    rollForSpeed,
    rollForDamage,
    applyDamage,
    applyPassiveAbilities,
    useBackpackItem,
    activateAbility,
} from '../CombatEngine';
import { TEST_BOOK, deterministicRoll, mockDiceRolls } from '../../tests/testUtils';
import { Hero } from '../../types/hero';
import { Enemy } from '../../types/character';

describe('Scenario: Ben vs Minorian', () => {
    it('works', () => {
        const BEN_NEVIS: Hero = {
            type: 'hero',
            name: 'Ben Nevis',
            stats: {
                speed: 10,
                brawn: 12,
                magic: 0,
                armour: 3,
                health: 35,
                maxHealth: 35,
                speedDice: 2,
                damageDice: 1
            },
            equipment: {
                mainHand: { id: 'daggers', type: 'mainHand', act: 1, name: 'Twin Daggers', abilities: ['Deep Wound'] } as any,
                talisman: {
                    id: 'ben-abilities', type: 'talisman', act: 1, name: 'Abilities',
                    abilities: [
                        'First Strike', 'Deadly Poisons', 'Webbed', 'Deep Wound', 'Piercing', 'Sidestep',
                        'Bleed', 'Life Spark', 'Venom', 'Charm', 'Critical Strike', 'Last Laugh', 'Heal'
                    ]
                } as any
            },
            backpack: [
                {
                    name: 'Gourd of Healing',
                    effect: { stats: { health: 6 }, source: 'Gourd of Healing', target: 'hero', duration: 0 },
                    uses: 1
                } as any,
                {
                    name: 'Pot of Brawn',
                    effect: { stats: { brawn: 2 }, source: 'Pot of Brawn', target: 'hero', duration: 1 },
                    duration: 1,
                    uses: 1
                } as any
            ],
            path: '',
            career: '',
            money: 0
        };

        const MINORIAN: Enemy = {
            type: 'enemy',
            name: 'Minorian',
            stats: {
                speed: 11,
                brawn: 10,
                magic: 0,
                armour: 8,
                health: 80,
                maxHealth: 80,
            },
            bookRef: TEST_BOOK,
            abilities: ['Charge', 'Trample', 'Bleed']
        };

        // --- START ---

        mockDiceRolls([2]);
        let state = startCombat(BEN_NEVIS, MINORIAN);
        expect(state.enemy!.stats.health).toBe(78); // 80 - 2 (First Strike)
        state = startRound(state);

        // --- ROUND 1 ---
        state = rollForSpeed(
            state,
            /*hero=*/ deterministicRoll([3, 5]),
            /*enemy=*/ deterministicRoll([3, 5, 5]));
        expect(state.winner).toBe('enemy');

        state = rollForDamage(state, deterministicRoll([5]));
        state = activateAbility(state, 'Sidestep');
        state = applyDamage(state);
        state = applyPassiveAbilities(state);
        state = endRound(state);

        expect(state.hero!.stats.health).toBe(35); // Sidestep avoids damage.
        expect(state.enemy!.stats.health).toBe(74); // -2 (Bleed & Venom)

        // --- ROUND 2 ---
        state = startRound(state);
        state = activateAbility(state, 'Webbed');

        state = rollForSpeed(
            state,
            /*hero=*/ deterministicRoll([3, 1]),
            /*enemy=*/ deterministicRoll([6]));
        expect(state.winner).toBe('enemy'); // 14 vs 17

        state = rollForDamage(state, deterministicRoll([6]));
        state = activateAbility(state, 'Last Laugh'); // Mock call
        state = rollForDamage(state, deterministicRoll([2]));
        // Damage: Trample on 6 -> +5. Reroll to 2.
        state = applyDamage(state);
        state = applyPassiveAbilities(state);
        state = endRound(state);

        expect(state.hero!.stats.health).toBe(25); // 35 - 9 (dmg) - 1 (bleed)
        expect(state.enemy!.stats.health).toBe(70); // 74 - 4 (Bleed & Venom)

        // --- ROUND 3 ---
        state = startRound(state);
        state = rollForSpeed(
            state,
            /*hero=*/ deterministicRoll([6, 3]),
            /*enemy=*/ deterministicRoll([4, 1]));
        expect(state.winner).toBe('hero'); // 19 vs 16

        state = rollForDamage(state, deterministicRoll([5]));
        state = activateAbility(state, 'Piercing');
        state = useBackpackItem(state, 1); // Pot of Brawn
        state = applyDamage(state);
        state = applyPassiveAbilities(state);
        state = endRound(state);

        // Dmg: 5 + 12(Brawn) + 2(Pot) = 19. Armour 0 (Piercing).
        expect(state.enemy!.stats.health).toBe(47); // 70 - 19 - 4
        expect(state.hero!.stats.health).toBe(24); // 26 (No damage)

        // --- ROUND 4 ---
        state = startRound(state);
        state = rollForSpeed(
            state,
            /*hero=*/ deterministicRoll([2, 4]),
            /*enemy=*/ deterministicRoll([5, 4]));
        // Charm Reroll logic manually simulated or if capability exists
        state = activateAbility(state, 'Charm');
        state = rollForSpeed(
            state,
            /*hero=*/ deterministicRoll([3, 4]),
            /*enemy=*/ deterministicRoll([5, 4]));
        expect(state.winner).toBe('enemy'); // 17 vs 20

        state = rollForDamage(state, deterministicRoll([3]));
        state = applyDamage(state);
        state = applyPassiveAbilities(state);
        state = endRound(state);

        // Dmg: 3 + 10 = 13. Armour 3. 10 Dmg.
        expect(state.hero!.stats.health).toBe(13); // 24 - 10 - 1
        expect(state.enemy!.stats.health).toBe(43); // 47 - 4

        // --- POST R4 HEAL ---
        state = useBackpackItem(state, 0); // Gourd +6
        state = activateAbility(state, 'Heal'); // +4
        expect(state.hero!.stats.health).toBe(23); // 13 + 6 + 4 = 23

        // --- ROUND 5 ---
        state = startRound(state);
        state = rollForSpeed(
            state,
            /*hero=*/ deterministicRoll([6, 5]),
            /*enemy=*/ deterministicRoll([2, 6]));
        expect(state.winner).toBe('hero');

        state = activateAbility(state, 'Deep Wound');
        state = rollForDamage(state, deterministicRoll([1, 5]));
        state = activateAbility(state, 'Critical Strike'); // Sets to 6, 6
        // Automatically triggers LifeSpark (double 6)
        state = applyDamage(state); // Heal 4
        expect(state.hero!.stats.health).toBe(27); // 23 + 4 = 27

        state = applyPassiveAbilities(state);
        state = endRound(state);

        // Dmg: 6+6 + 12 = 24. Armour 8. 16 Dmg.
        expect(state.enemy!.stats.health).toBe(23); // 43 - 16 - 4
        expect(state.hero!.stats.health).toBe(26); // 23 + 4 - 1 = 26

        // --- ROUND 6 ---
        state = startRound(state);
        state = rollForSpeed(
            state,
            /*hero=*/ deterministicRoll([2, 2]),
            /*enemy=*/ deterministicRoll([5, 4]));
        expect(state.winner).toBe('enemy'); // 14 vs 20

        state = rollForDamage(state, deterministicRoll([6]));
        state = applyDamage(state);
        state = applyPassiveAbilities(state);
        state = endRound(state);

        // Dmg: 6 + 10 + 5(Trample) = 21. Armour 3. 18 Dmg.
        // HP: 30 (26+4) - 18 - 1 = 11.
        expect(state.hero!.stats.health).toBe(11);
        expect(state.enemy!.stats.health).toBe(19); // 23 - 4

        // --- ROUND 7 ---
        state = startRound(state);
        state = rollForSpeed(
            state,
            /*hero=*/ deterministicRoll([4, 6]),
            /*enemy=*/ deterministicRoll([1, 4]));
        expect(state.winner).toBe('hero');

        state = rollForDamage(state, deterministicRoll([1]));
        state = applyDamage(state);
        state = applyPassiveAbilities(state);
        state = endRound(state);

        // Dmg: 1 + 12 = 13. Armour 8. 5 Dmg.
        expect(state.enemy!.stats.health).toBe(10); // 19 - 5 - 4
        expect(state.hero!.stats.health).toBe(10); // 11 - 1 (bleed)

        // --- ROUND 8 ---
        state = startRound(state);
        state = rollForSpeed(state,
            /*hero=*/ deterministicRoll([3, 5]),
            /*enemy=*/ deterministicRoll([2, 2]));
        expect(state.winner).toBe('hero');

        state = rollForDamage(state, deterministicRoll([2]));
        state = applyDamage(state);
        state = applyPassiveAbilities(state);
        state = endRound(state);

        // Dmg: 2 + 12 = 14. Armour 8. 6 Dmg.
        expect(state.enemy!.stats.health).toBe(0); // 10 - 6 - 4 => 0.
        expect(state.hero!.stats.health).toBe(9); // 10 - 1 (bleed)
    });
});
