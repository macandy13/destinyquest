import { describe, it, expect, vi } from 'vitest';
import {
    initCombat,
    activateAbility,
    setSpeedRolls,
    commitSpeedResult,
    setDamageRolls,
    commitDamageResult,
    startNewRound,
    useBackpackItem,
    endRound,
} from './CombatEngine';
import { MOCK_HERO, TEST_BOOK, deterministicRoll, enemyWithStats, heroWithStats, mockDiceRolls, testEquipment } from '../tests/testUtils';
import { Hero } from '../types/hero';
import { Enemy } from '../types/combat';
import { registerAbility } from './abilityRegistry';

describe('CombatEngine', () => {
    it('should initialize combat correctly', () => {
        const state = initCombat(MOCK_HERO);
        expect(state.phase).toBe('combat-start');
        expect(state.round).toBe(1);
        expect(state.hero).toBeDefined();
        expect(state.enemy).toBeDefined();
    });

    it('should resolve speed rolls correctly', () => {
        let state = initCombat(heroWithStats({ speed: 5 }));

        // Mock speed roll resolution
        state = setSpeedRolls(state,
            /*hero=*/ deterministicRoll([3, 3]),
            /*enemy=*/ deterministicRoll([1, 1])
        );

        expect(state.phase).toBe('speed-roll');
        expect(state.winner).toBe('hero');
        expect(state.heroSpeedRolls).toHaveLength(2);
    });

    it('should calculate damage and apply armour', () => {
        const hero = heroWithStats({ brawn: 5 });
        let state = initCombat(hero, enemyWithStats({
            speed: 1,
            brawn: 1,
            magic: 1,
            armour: 2,
            health: 20,
            maxHealth: 20
        }).original);

        // Speed win for hero
        state = setSpeedRolls(state,
            /*hero=*/ deterministicRoll([6, 6]),
            /*enemy=*/ deterministicRoll([1, 1]));
        state = commitSpeedResult(state);

        const initialHealth = state.enemy!.stats.health;
        state = setDamageRolls(state, deterministicRoll([6]));
        state = commitDamageResult(state);
        // Damage: Roll(6) + Brawn(5) = 11. Enemy Armour(2). Result = 9.
        expect(state.enemy!.stats.health).toEqual(initialHealth - 9);

        state = endRound(state);

        expect(state.enemy!.stats.health).toEqual(initialHealth - 9);
        expect(state.phase).toBe('round-end');
    });

    it('should handle abilities that modify stats', () => {
        const MockAbilityDef = {
            name: 'Engine Test Buff',
            type: 'modifier' as const,
            description: 'Adds +3 damage',
            onActivate: (s: any) => ({
                modifications: [...s.modifications, {
                    modification: {
                        stats: { damageModifier: 3 },
                        source: 'Mock Buff',
                        target: 'hero'
                    },
                    duration: 2,
                    id: 'engine-buff-id'
                }]
            })
        };
        registerAbility(MockAbilityDef);

        const hero: Hero = {
            ...MOCK_HERO,
            stats: { ...MOCK_HERO.stats, brawn: 0 },
            equipment: {
                ring1: testEquipment({
                    type: 'ring',
                    name: 'Test Ring',
                    abilities: ['Engine Test Buff']
                })
            }
        };

        let state = initCombat(hero);
        state = activateAbility(state, 'Engine Test Buff');

        expect(state.modifications).toHaveLength(1);
        expect(state.modifications[0].modification.stats.damageModifier).toBe(3);

        const damageMod = state.modifications[0].modification.stats.damageModifier;

        expect(damageMod).toBe(3);
    });

    it('Scenario: Ben vs Minorian', () => {
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
                { id: 'gourd', name: 'Gourd of Healing', stats: { health: 6 }, uses: 1 } as any,
                { id: 'pot', name: 'Pot of Brawn', stats: { brawn: 2 }, duration: 1, uses: 1 } as any
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

        let randomCounter = 0;
        const randomSpy = vi.spyOn(Math, 'random').mockImplementation(() => {
            if (randomCounter === 0) { randomCounter++; return 0.25; }
            randomCounter++;
            return (randomCounter % 2 === 0) ? 0.0 : 0.2;
        });

        let state = initCombat(BEN_NEVIS, MINORIAN);
        expect(state.enemy!.stats.health).toBe(78); // 80 - 2 (First Strike)

        // --- ROUND 1 ---
        state = setSpeedRolls(
            state,
            /*hero=*/ deterministicRoll([3, 5]),
            /*enemy=*/ deterministicRoll([3, 5, 5]));
        expect(state.winner).toBe('enemy');
        state = commitSpeedResult(state);

        state = setDamageRolls(state, deterministicRoll([5]));
        state = activateAbility(state, 'Sidestep');
        state = commitDamageResult(state);
        state = endRound(state);

        expect(state.hero!.stats.health).toBe(35); // Sidestep avoids damage.
        expect(state.enemy!.stats.health).toBe(74); // -2 (Bleed & Venom)

        // --- ROUND 2 ---
        state = startNewRound(state);
        state = activateAbility(state, 'Webbed');

        state = setSpeedRolls(
            state,
            /*hero=*/ deterministicRoll([3, 1]),
            /*enemy=*/ deterministicRoll([6]));
        expect(state.winner).toBe('enemy'); // 14 vs 17

        state = commitSpeedResult(state);
        state = setDamageRolls(state, deterministicRoll([6]));
        state = activateAbility(state, 'Last Laugh'); // Mock call
        state = setDamageRolls(state, deterministicRoll([2]));
        // Damage: Trample on 6 -> +5. Reroll to 2.
        state = commitDamageResult(state);
        state = endRound(state);

        expect(state.hero!.stats.health).toBe(25); // 35 - 9 (dmg) - 1 (bleed)
        expect(state.enemy!.stats.health).toBe(70); // 74 - 4 (Bleed & Venom)

        // --- ROUND 3 ---
        state = startNewRound(state);
        state = setSpeedRolls(
            state,
            /*hero=*/ deterministicRoll([6, 3]),
            /*enemy=*/ deterministicRoll([4, 1]));
        expect(state.winner).toBe('hero'); // 19 vs 16
        state = commitSpeedResult(state);

        state = setDamageRolls(state, deterministicRoll([5]));
        state = activateAbility(state, 'Piercing');
        state = useBackpackItem(state, 1); // Pot of Brawn
        state = commitDamageResult(state);
        state = endRound(state);

        // Dmg: 5 + 12(Brawn) + 2(Pot) = 19. Armour 0 (Piercing).
        expect(state.enemy!.stats.health).toBe(47); // 70 - 19 - 4
        expect(state.hero!.stats.health).toBe(24); // 26 (No damage)

        // --- ROUND 4 ---
        state = startNewRound(state);
        state = setSpeedRolls(
            state,
            /*hero=*/ deterministicRoll([2, 4]),
            /*enemy=*/ deterministicRoll([5, 4]));
        // Charm Reroll logic manually simulated or if capability exists
        state = activateAbility(state, 'Charm');
        state = setSpeedRolls(
            state,
            /*hero=*/ deterministicRoll([3, 4]),
            /*enemy=*/ deterministicRoll([5, 4]));
        expect(state.winner).toBe('enemy'); // 17 vs 20
        state = commitSpeedResult(state);

        state = setDamageRolls(state, deterministicRoll([3]));
        state = commitDamageResult(state);
        state = endRound(state);

        // Dmg: 3 + 10 = 13. Armour 3. 10 Dmg.
        expect(state.hero!.stats.health).toBe(13); // 24 - 10 - 1
        expect(state.enemy!.stats.health).toBe(43); // 47 - 4

        // --- POST R4 HEAL ---
        state = useBackpackItem(state, 0); // Gourd +6
        state = activateAbility(state, 'Heal'); // +4
        expect(state.hero!.stats.health).toBe(23); // 13 + 6 + 4 = 13

        // --- ROUND 5 ---
        state = startNewRound(state);
        state = setSpeedRolls(
            state,
            /*hero=*/ deterministicRoll([6, 5]),
            /*enemy=*/ deterministicRoll([2, 6]));
        expect(state.winner).toBe('hero');
        state = commitSpeedResult(state);

        state = setDamageRolls(state, deterministicRoll([1]));
        mockDiceRolls([5]);
        state = activateAbility(state, 'Deep Wound');
        state = activateAbility(state, 'Critical Strike'); // Sets to 6, 6
        // Automatically trigger LifeSpark (double 6)
        expect(state.hero!.stats.health).toBe(27); // 23 + 4 = 27

        state = commitDamageResult(state); // Heal 4
        console.log(state.hero!.stats.health); // 23 + 4 - 1 = 26
        state = endRound(state);

        // Dmg: 6+6 + 12 = 24. Armour 8. 16 Dmg.
        expect(state.enemy!.stats.health).toBe(23); // 43 - 16 - 4
        expect(state.hero!.stats.health).toBe(26); // 23 + 4 - 1 = 26

        // --- ROUND 6 ---
        state = startNewRound(state);
        state = setSpeedRolls(
            state,
            /*hero=*/ deterministicRoll([2, 2]),
            /*enemy=*/ deterministicRoll([5, 4]));
        expect(state.winner).toBe('enemy'); // 14 vs 20
        state = commitSpeedResult(state);

        state = setDamageRolls(state, deterministicRoll([6]));
        state = commitDamageResult(state);
        state = endRound(state);

        // Dmg: 6 + 10 + 5(Trample) = 21. Armour 3. 18 Dmg.
        // HP: 30 (26+4) - 18 - 1 = 11.
        expect(state.hero!.stats.health).toBe(11);
        expect(state.enemy!.stats.health).toBe(19); // 23 - 4

        // --- ROUND 7 ---
        state = startNewRound(state);
        state = setSpeedRolls(
            state,
            /*hero=*/ deterministicRoll([4, 6]),
            /*enemy=*/ deterministicRoll([1, 4]));
        expect(state.winner).toBe('hero');

        state = commitSpeedResult(state);
        state = setDamageRolls(state, deterministicRoll([1]));
        state = commitDamageResult(state);
        state = endRound(state);

        // Dmg: 1 + 12 = 13. Armour 8. 5 Dmg.
        expect(state.enemy!.stats.health).toBe(10); // 19 - 5 - 4
        expect(state.hero!.stats.health).toBe(10); // 11 - 1 (bleed)

        // --- ROUND 8 ---
        state = startNewRound(state);
        state = setSpeedRolls(state,
            /*hero=*/ deterministicRoll([3, 5]),
            /*enemy=*/ deterministicRoll([2, 2]));
        expect(state.winner).toBe('hero');

        state = commitSpeedResult(state);
        state = setDamageRolls(state, deterministicRoll([2]));
        state = commitDamageResult(state);
        state = endRound(state);

        // Dmg: 2 + 12 = 14. Armour 8. 6 Dmg.
        expect(state.enemy!.stats.health).toBe(0); // 10 - 6 - 4 => 0.
        expect(state.hero!.stats.health).toBe(9); // 10 - 1 (bleed)

        randomSpy.mockRestore();
    });
});

