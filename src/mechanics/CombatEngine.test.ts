import { describe, it, expect, beforeEach } from 'vitest';
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
import { registerAbility, toCanonicalName } from './abilityRegistry';
import { MOCK_HERO, MOCK_ENEMY, deterministicRoll, enemyWithStats, heroWithStats, testEquipment, testBackpackItem } from '../tests/testUtils';
import { Hero } from '../types/hero';
import { Enemy } from '../types/character';

describe('CombatEngine', () => {
    let hero: Hero;
    let enemy: Enemy;

    beforeEach(() => {
        hero = heroWithStats({
            speed: 1,
            brawn: 3,
            magic: 1,
            armour: 2,
            health: 10,
            maxHealth: 10,
        }).original;
        enemy = enemyWithStats({
            speed: 1,
            brawn: 3,
            magic: 1,
            armour: 1,
            health: 10,
            maxHealth: 10,
        }).original;
    });

    describe('startCombat', () => {
        it('should initialize combat state correctly', () => {
            const state = startCombat(hero, [enemy]);
            expect(state).toEqual(expect.objectContaining({
                phase: 'combat-start',
                round: 0,
                hero: expect.objectContaining({ name: hero.name }),
                enemies: expect.arrayContaining([expect.objectContaining({ name: enemy.name })]),
            }));
        });

        it('should apply onCombatStart hooks', () => {
            const abilityName = 'StartCombateTestHook';
            registerAbility({
                name: abilityName,
                type: 'passive',
                description: 'Test Hook',
                onCombatStart: (s) => ({
                    ...s,
                    hero: { ...s.hero, stats: { ...s.hero.stats, speed: 99 } }
                })
            });
            hero.equipment.mainHand = testEquipment({ abilities: [abilityName] });
            const state = startCombat(hero, [enemy]);
            expect(state.hero.stats.speed).toBe(99);
        });
    });

    describe('startRound', () => {
        it('should increment round and set phase', () => {
            let state = startCombat(hero, [enemy]);
            expect(state.round).toEqual(0);
            state = startRound(state);
            expect(state).toEqual(expect.objectContaining({
                phase: 'round-start',
                round: 1,
                heroSpeedRolls: undefined,
                enemySpeedRolls: undefined,
                winner: undefined,
                damage: undefined,
            }));
        });
    });

    describe('rollForSpeed', () => {
        it('should determine winner based on rolls and stats', () => {
            let state = startCombat(hero, [enemy]);
            state = startRound(state);

            // Hero speed 1, Enemy speed 1
            const heroRolls = deterministicRoll([6, 6]); // 12 + 1 = 13
            const enemyRolls = deterministicRoll([1, 1]); // 2 + 1 = 3

            state = rollForSpeed(state, heroRolls, enemyRolls);

            expect(state).toEqual(expect.objectContaining({
                phase: 'speed-roll',
                winner: 'hero',
                heroSpeedRolls: heroRolls,
                enemySpeedRolls: enemyRolls,
            }));
        });

        it('should handle draws', () => {
            let state = startCombat(hero, [enemy]);
            const roll = deterministicRoll([1, 1]);
            state = rollForSpeed(state, roll, roll);
            expect(state.winner).toBeNull();
        });
    });

    describe('handlePendingInteractions', () => {
        it('should ask user for choice and process response', () => {

        });
    });

    describe('rollForDamage', () => {
        it('should roll damage dice for the winner', () => {
            let state = startCombat(hero, [enemy]);
            state = { ...state, winner: 'hero' };
            const damageRolls = deterministicRoll([3]);

            state = rollForDamage(state, damageRolls);

            expect(state).toEqual(expect.objectContaining({
                phase: 'damage-roll',
                damage: expect.objectContaining({
                    damageRolls,
                }),
            }));
        });

        it('should not roll if no winner', () => {
            let state = startCombat(hero, [enemy]);
            state = { ...state, winner: null }; // Draw
            state = rollForDamage(state);
            expect(state.damage).toBeUndefined();
        });
    });

    describe('applyDamage', () => {
        it('should calculate damage correctly (Roll + Skill - Armour)', () => {
            let state = startCombat(hero, [enemy]);
            // Hero wins. Brawn 3. Damage Roll 3. Enemy Armour 1.
            // Damage = 3 + 3 - 1 = 5.
            state = {
                ...state,
                winner: 'hero',
                phase: 'damage-roll',
                damage: { damageRolls: deterministicRoll([3]), modifiers: [] }
            };

            state = applyDamage(state);

            // Enemy starts with 10 health. 10 - 5 = 5.
            expect(state.enemies[0].stats.health).toBe(5);
        });

        it('should handle damage modifiers', () => {
            let state = startCombat(hero, [enemy]);
            state = {
                ...state,
                winner: 'hero',
                phase: 'damage-roll',
                damage: {
                    damageRolls: deterministicRoll([3]),
                    modifiers: [{ amount: 2, source: 'Bonus', target: 'enemy' }]
                }
            };
            // Damage = 3 (roll) + 3 (brawn) + 2 (mod) - 1 (armour) = 7.
            state = applyDamage(state);
            expect(state.enemies[0].stats.health).toBe(3);
        });
    });

    describe('applyPassiveAbilities', () => {
        it('should verify passive abilities are triggered', () => {
            const abilityName = 'PassiveBleed';
            registerAbility({
                name: abilityName,
                type: 'passive',
                description: 'Passive Dmg',
                onPassiveAbility: (s) => {
                    const newEnemies = [...s.enemies];
                    newEnemies[0] = {
                        ...newEnemies[0],
                        stats: { ...newEnemies[0].stats, health: newEnemies[0].stats.health - 1 }
                    };
                    return { ...s, enemies: newEnemies };
                }
            });
            hero.equipment.mainHand = testEquipment({ abilities: [abilityName] });

            let state = startCombat(hero, [enemy]);
            state = applyPassiveAbilities(state);

            expect(state.phase).toBe('passive-damage');
            expect(state.enemies[0].stats.health).toBe(9);
        });
    });

    describe('activateAbility', () => {
        it('should activate an ability and reduce uses', () => {
            const abilityName = 'ActiveStrike';
            registerAbility({
                name: abilityName,
                type: 'combat',
                description: 'Strike',
                onActivate: (s) => s // No-op for this test, just check overhead
            });

            // Setup hero with limited use ability
            const limitedHero = heroWithStats({}).original;
            // Inject ability manually or via equipment
            const item = testEquipment({ abilities: [abilityName] });
            item.abilities = [abilityName];
            limitedHero.equipment.mainHand = item;

            let state = startCombat(limitedHero, [enemy]);
            // Ensure it has uses. createHeroCombatant sets uses to 1 for combat abilities if checking equipment
            // But let's verify specific behavior.
            // Note: 'combat' type abilities get 1 use per item by default in createHeroCombatant

            expect(state.hero.activeAbilities.get(toCanonicalName(abilityName))?.uses).toBe(1);

            state = activateAbility(state, abilityName);
            expect(state.hero.activeAbilities.has(toCanonicalName(abilityName))).toBe(false); // Should be removed if uses 0
        });
    });

    describe('useBackpackItem', () => {
        it('should apply item effect and remove if empty', () => {
            const heroWithItem = {
                ...MOCK_HERO,
                backpack: [testBackpackItem({
                    effect: { source: 'Potion', target: 'hero', stats: { health: 5 }, duration: 0 },
                    uses: 1
                }), null, null, null, null]
            };

            let state = startCombat(heroWithItem, [MOCK_ENEMY]);
            state = {
                ...state,
                hero: { ...state.hero, stats: { ...state.hero.stats, health: 1 } }
            };

            state = useBackpackItem(state, 0);

            expect(state.hero.stats.health).toBe(6);
            expect(state.backpack[0]).toBeUndefined(); // Should be filtered out or null? implementation uses filter logic
            expect(state.backpack.length).toBe(0); // filter checks for uses > 0
        });

        it('should handle infinite use items', () => {
            const heroWithItem = {
                ...MOCK_HERO,
                backpack: [testBackpackItem({
                    effect: { source: 'Rock', target: 'enemy', stats: { health: -1 }, duration: 0 },
                    // uses undefined means infinite
                }), null, null, null, null]
            };
            let state = startCombat(heroWithItem, [MOCK_ENEMY]);
            state = useBackpackItem(state, 0);
            expect(state.backpack.length).toBe(1);
        });

        it('should recalculate winner if used during speed-roll', () => {
            const heroWithSpeedPotion = {
                ...MOCK_HERO,
                stats: { ...MOCK_HERO.stats, speed: 2 }, // Base speed 2
                backpack: [testBackpackItem({
                    name: 'Speed Potion',
                    effect: { source: 'Potion', target: 'hero', stats: { speed: 5 }, duration: 1 },
                    uses: 1
                }), null, null, null, null]
            };
            const fastEnemy = {
                ...MOCK_ENEMY,
                stats: { ...MOCK_ENEMY.stats, speed: 5 } // Base speed 5
            };

            let state = startCombat(heroWithSpeedPotion, [fastEnemy]);
            state = startRound(state);

            // Hero rolls 1, Enemy rolls 1.
            // Hero Total: 2 + 1 = 3.
            // Enemy Total: 5 + 1 = 6.
            // Enemy wins.
            const roll = deterministicRoll([1, 1]);
            state = rollForSpeed(state, roll, roll);

            expect(state.phase).toBe('speed-roll');
            expect(state.winner).toBe('enemy');

            // Use potion found at index 0. +5 Speed.
            // New Hero Total: 2 + 5 (buff) + 1 (roll) = 8.
            // Enemy Total: 6.
            // Hero should win.
            state = useBackpackItem(state, 0);

            expect(state.winner).toBe('hero');
            expect(state.hero.activeEffects).toHaveLength(1);
            expect(state.hero.activeEffects[0].stats.speed).toBe(5);
        });
    });

    describe('endRound', () => {
        it('should decrement effect durations and remove expired', () => {
            let state = startCombat(hero, [enemy]);
            state.hero.activeEffects = [
                { source: 'ShortBuff', target: 'hero', stats: { speed: 1 }, duration: 1 },
                { source: 'LongBuff', target: 'hero', stats: { brawn: 1 }, duration: 2 },
                { source: 'ForeverBuff', target: 'hero', stats: { magic: 1 }, duration: undefined }
            ];

            state = endRound(state);

            expect(state.phase).toBe('round-end');
            // ShortBuff 1 -> 0 (removed)
            // LongBuff 2 -> 1
            // ForeverBuff undefined (kept)
            const effects = state.hero.activeEffects;
            expect(effects).toHaveLength(2);
            expect(effects.find(e => e.source === 'ShortBuff')).toBeUndefined();
            expect(effects.find(e => e.source === 'LongBuff')?.duration).toBe(1);
            expect(effects.find(e => e.source === 'ForeverBuff')?.duration).toBeUndefined();
        });
    });

    describe('checkCombatEnd', () => {
        it('should end combat if health is 0 at start', () => {
            const deadHero = { ...hero, stats: { ...hero.stats, health: 0 } };
            const state = startCombat(deadHero, [enemy]);
            expect(state.phase).toBe('combat-end');
        });

        it('should end combat when enemy dies', () => {
            let state = startCombat(hero, [enemy]);
            state = {
                ...state,
                winner: 'hero',
                damage: { damageRolls: deterministicRoll([100]), modifiers: [] },
                phase: 'damage-roll'
            };
            // Force apply damage to kill
            state = applyDamage(state);
            expect(state.phase).toBe('combat-end');
        });
    });
});