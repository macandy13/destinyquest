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
} from './CombatEngine';
import { MOCK_HERO, MOCK_ENEMY, TEST_BOOK, deterministicRoll, enemyWithStats, heroWithStats, mockDiceRolls, testEquipment, testBackpackItem } from '../tests/testUtils';
import './abilities/passive/Barbs';
import './abilities/passive/Bleed';
import { Hero } from '../types/Hero';
import { Enemy } from '../types/Character';

describe('CombatEngine', () => {
    it('should work for a simple flow', () => {
        const hero = heroWithStats({
            speed: 1,
            brawn: 3,
            magic: 1,
            armour: 2,
            health: 10,
            maxHealth: 10,
        }).original;
        hero.equipment['mainHand'] = testEquipment({
            type: 'mainHand',
            name: 'Test Weapon',
            abilities: ['Bleed']
        });
        const enemy = enemyWithStats({
            speed: 1,
            brawn: 3,
            magic: 1,
            armour: 1,
            health: 10,
            maxHealth: 10,
        }).original;
        enemy.abilities = ['Bleed', 'Barbs'];
        let state = startCombat(hero, enemy);
        expect(state).toEqual(expect.objectContaining({
            phase: 'combat-start',
            round: 0,
        }));

        state = startRound(state);
        expect(state).toEqual(expect.objectContaining({
            phase: 'round-start',
            round: 1,
        }));

        const heroSpeedRolls = deterministicRoll([6, 6]);
        const enemySpeedRolls = deterministicRoll([1, 1]);
        state = rollForSpeed(state,
            heroSpeedRolls,
            enemySpeedRolls);
        expect(state).toEqual(expect.objectContaining({
            phase: 'speed-roll',
            winner: 'hero',
            heroSpeedRolls,
            enemySpeedRolls,
        }));

        const damageRolls = deterministicRoll([3]);
        state = rollForDamage(state, damageRolls);
        expect(state).toEqual(expect.objectContaining({
            phase: 'damage-roll',
            damage: expect.objectContaining({
                damageRolls,
            }),
        }));

        state = applyDamage(state);
        expect(state).toEqual(expect.objectContaining({
            phase: 'apply-damage',
            enemy: expect.objectContaining({
                stats: expect.objectContaining({
                    health: 5, // 10 - (3 dmg + 3 brawn - 1 armor)
                }),
            }),
        }));

        state = applyPassiveAbilities(state);
        expect(state).toEqual(expect.objectContaining({
            phase: 'passive-damage',
            hero: expect.objectContaining({
                stats: expect.objectContaining({
                    health: 9, // -1 Barbs, 0 Bleed, as enemy didn't deal damage
                }),
            }),
            enemy: expect.objectContaining({
                stats: expect.objectContaining({
                    health: 4, // -1 Bleed
                }),
            }),
        }));

        state = endRound(state);
        expect(state).toEqual(expect.objectContaining({
            phase: 'round-end',
        }));
    });

    it('Use backpack item', () => {
        const hero = {
            ...MOCK_HERO,
            stats: {
                ...MOCK_HERO.stats,
                health: 5,
                maxHealth: 10,
            },
            backpack: [testBackpackItem(
                {
                    effect: {
                        source: 'Potion',
                        target: 'hero',
                        stats: {
                            health: 4
                        },
                        duration: 0,
                    },
                    uses: 2,
                }
            ), null, null, null, null]
        };
        let state = startCombat(hero, MOCK_ENEMY);
        state = useBackpackItem(state, 0);
        expect(state).toEqual(expect.objectContaining({
            hero: expect.objectContaining({
                stats: expect.objectContaining({
                    health: 9, // 5 + 4, max 10
                }),
            }),
            backpack: expect.arrayContaining([expect.objectContaining({
                uses: 1
            })]),
        }));
        state = useBackpackItem(state, 0);
        expect(state).toEqual(expect.objectContaining({
            hero: expect.objectContaining({
                stats: expect.objectContaining({
                    health: 10, // 9 + 4, max 10
                }),
            }),
            backpack: [],
        }));
    });

    // it('should calculate damage and apply armour', () => {
    //     const hero = heroWithStats({ brawn: 5 });
    //     let state = initCombat(hero, enemyWithStats({
    //         speed: 1,
    //         brawn: 1,
    //         magic: 1,
    //         armour: 2,
    //         health: 20,
    //         maxHealth: 20
    //     }).original);

    //     // Speed win for hero
    //     state = rollForSpeed(state,
    //         /*hero=*/ deterministicRoll([6, 6]),
    //         /*enemy=*/ deterministicRoll([1, 1]));
    //     state = commitSpeedResult(state);

    //     const initialHealth = state.enemy!.stats.health;
    //     state = rollForDamage(state, deterministicRoll([6]));
    //     state = applyDamage(state);
    //     // Damage: Roll(6) + Brawn(5) = 11. Enemy Armour(2). Result = 9.
    //     expect(state.enemy!.stats.health).toEqual(initialHealth - 9);

    //     state = endRound(state);

    //     expect(state.enemy!.stats.health).toEqual(initialHealth - 9);
    //     expect(state.phase).toBe('round-end');
    // });

    // it('should handle abilities that modify stats', () => {
    //     const MockAbilityDef = {
    //         name: 'Engine Test Buff',
    //         type: 'modifier' as const,
    //         description: 'Adds +3 damage',
    //         onActivate: (s: any) => applyUpdates(s, {
    //             modifications: [...s.modifications, {
    //                 modification: {
    //                     stats: { damageModifier: 3 },
    //                     source: 'Mock Buff',
    //                     target: 'hero'
    //                 },
    //                 duration: 2,
    //                 id: 'engine-buff-id'
    //             }]
    //         })
    //     };
    //     registerAbility(MockAbilityDef);

    //     const hero: Hero = {
    //         ...MOCK_HERO,
    //         stats: { ...MOCK_HERO.stats, brawn: 0 },
    //         equipment: {
    //             ring1: testEquipment({
    //                 type: 'ring',
    //                 name: 'Test Ring',
    //                 abilities: ['Engine Test Buff']
    //             })
    //         }
    //     };

    //     let state = initCombat(hero);
    //     state = activateAbility(state, 'Engine Test Buff');

    //     expect(state.modifications).toHaveLength(1);
    //     expect(state.modifications[0].modification.stats.damageModifier).toBe(3);

    //     const damageMod = state.modifications[0].modification.stats.damageModifier;

    //     expect(damageMod).toBe(3);
    // });

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

