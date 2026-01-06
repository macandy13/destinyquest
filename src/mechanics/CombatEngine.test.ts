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
} from './CombatEngine';
import { registerAbility } from './abilityRegistry';
import { MOCK_HERO, MOCK_ENEMY, deterministicRoll, enemyWithStats, heroWithStats, testEquipment, testBackpackItem } from '../tests/testUtils';

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

    it('useBackpackItem', () => {
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



    describe('checkCombatEnd', () => {
        it('should end combat if health is 0 at start of combat', () => {
            const nearlyDeadHero = {
                ...MOCK_HERO,
                stats: { ...MOCK_HERO.stats, health: 0 }
            };
            const state = startCombat(nearlyDeadHero, MOCK_ENEMY);
            expect(state.phase).toBe('combat-end');
        });

        it('should end combat when enemy health reaches 0 during damage application', () => {
            let state = startCombat(MOCK_HERO, MOCK_ENEMY);

            // Set enemy health to 1 for easy kill
            state = {
                ...state,
                winner: 'hero',
                phase: 'damage-roll',
                damage: {
                    damageRolls: [{ value: 100, isRerolled: false }],
                    modifiers: []
                },
                enemy: {
                    ...state.enemy,
                    stats: {
                        ...state.enemy.stats,
                        health: 1
                    }
                }
            };

            state = applyDamage(state);
            expect(state.phase).toBe('combat-end');
            expect(state.enemy.stats.health).toBeLessThanOrEqual(0);
        });

        it('should end combat when hero health reaches 0 after using a backpack item', () => {
            let state = startCombat(MOCK_HERO, MOCK_ENEMY);
            state = {
                ...state,
                hero: {
                    ...state.hero,
                    stats: { ...state.hero.stats, health: 1 }
                },
                backpack: [testBackpackItem({
                    effect: {
                        source: 'Suicide Pill',
                        target: 'hero',
                        stats: { health: -10 },
                        duration: 0
                    },
                    uses: 1
                })]
            };
            state = useBackpackItem(state, 0);
            expect(state.phase).toBe('combat-end');
            expect(state.hero.stats.health).toBeLessThanOrEqual(0);
        });

        it('should end combat when health reaches 0 from passive damage', () => {
            registerAbility({
                name: 'Sudden Death',
                type: 'passive',
                description: 'Dies instantly',
                onPassiveAbility: (s: any) => ({
                    ...s,
                    hero: {
                        ...s.hero,
                        stats: { ...s.hero.stats, health: 0 }
                    }
                })
            } as any);

            let state = startCombat(MOCK_HERO, MOCK_ENEMY);

            // Mock a passive ability that deals lethal damage
            state.hero.activeAbilities.set('Sudden Death', {
                name: 'Sudden Death',
                owner: 'hero',
                sources: [],
                def: { name: 'Sudden Death' } as any
            });

            state = applyPassiveAbilities(state);
            expect(state.phase).toBe('combat-end');
            expect(state.hero.stats.health).toBeLessThanOrEqual(0);
        });
    });
});