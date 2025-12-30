import { describe, it, expect, vi } from 'vitest';
import {
    initCombat,
    activateAbility,
    resolveSpeedRolls,
    commitSpeedResult,
    resolveDamageRolls,
    commitDamageResult,
    nextRound,
    useBackpackItem
} from './CombatEngine';
import { MOCK_HERO, heroWithStats } from '../tests/testUtils';
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
        state = resolveSpeedRolls(state,
            [{ value: 3, isRerolled: false }, { value: 3, isRerolled: false }],
            [{ value: 1, isRerolled: false }, { value: 1, isRerolled: false }]
        );

        expect(state.phase).toBe('speed-roll');
        expect(state.winner).toBe('hero');
        expect(state.heroSpeedRolls).toHaveLength(2);
    });

    it('should calculate damage and apply armour', () => {
        const hero = heroWithStats({ brawn: 5 });
        let state = initCombat(hero, {
            name: 'Armoured dummy',
            stats: { speed: 1, brawn: 1, magic: 1, armour: 2, health: 20, maxHealth: 20 },
            act: 1,
            abilities: []
        });

        // Speed win for hero
        state = resolveSpeedRolls(state, [{ value: 6, isRerolled: false }], [{ value: 1, isRerolled: false }]);

        // Force commit speed
        state = commitSpeedResult(state);
        // Should be in damage-roll phase (implied or explicit depending on flow)

        state = resolveDamageRolls(state, [{ value: 6, isRerolled: false }]);

        const initialHealth = state.enemy!.stats.health;

        state = commitDamageResult(state);

        // Damage: Roll(6) + Brawn(5) = 11. Enemy Armour(2). Result = 9.
        expect(state.enemy!.stats.health).toBe(initialHealth - 9);
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
                ring1: {
                    id: 'test-ring',
                    type: 'ring',
                    act: 1,
                    name: 'Test Ring',
                    abilities: ['Engine Test Buff']
                }
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
            name: 'Minorian',
            stats: {
                speed: 11,
                brawn: 10,
                magic: 0,
                armour: 8,
                health: 80,
                maxHealth: 80,
            },
            act: 1,
            abilities: ['Charge', 'Trample', 'Bleed^']
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
        state = resolveSpeedRolls(state,
            [{ value: 3, isRerolled: false }, { value: 5, isRerolled: false }],
            [{ value: 3, isRerolled: false }, { value: 2, isRerolled: false }, { value: 5, isRerolled: false }]
        ); // Enemy Charge: 3 dice.
        expect(state.winner).toBe('enemy');

        state = commitSpeedResult(state);
        state = activateAbility(state, 'Sidestep');
        state = resolveDamageRolls(state, [{ value: 5, isRerolled: false }]);
        state = commitDamageResult(state);

        expect(state.hero!.stats.health).toBe(35); // Sidestep avoids damage.
        expect(state.enemy!.stats.health).toBe(74); // -2 (Bleed & Venom)

        // --- ROUND 2 ---
        state = nextRound(state);
        state = activateAbility(state, 'Webbed');
        state = resolveSpeedRolls(state,
            [{ value: 3, isRerolled: false }, { value: 1, isRerolled: false }],
            [{ value: 6, isRerolled: false }]
        );
        expect(state.winner).toBe('enemy'); // 14 vs 17

        state = commitSpeedResult(state);
        state = activateAbility(state, 'Last Laugh'); // Mock call
        // Damage: Trample on 6 -> +5. Reroll to 2.
        state = resolveDamageRolls(state, [{ value: 2, isRerolled: true }]);
        state = commitDamageResult(state);

        expect(state.hero!.stats.health).toBe(26); // 35 - 9 (dmg) - 1 (bleed)
        expect(state.enemy!.stats.health).toBe(70); // 74 - 4 (Bleed & Venom)

        // --- ROUND 3 ---
        state = nextRound(state);
        state = resolveSpeedRolls(state,
            [{ value: 6, isRerolled: false }, { value: 3, isRerolled: false }],
            [{ value: 4, isRerolled: false }, { value: 1, isRerolled: false }]
        );
        expect(state.winner).toBe('hero'); // 19 vs 16

        state = commitSpeedResult(state);
        state = activateAbility(state, 'Piercing');
        state = useBackpackItem(state, 1); // Pot of Brawn

        state = resolveDamageRolls(state, [{ value: 5, isRerolled: false }]);
        state = commitDamageResult(state);

        // Dmg: 5 + 12(Brawn) + 2(Pot) = 19. Armour 0 (Piercing).
        expect(state.enemy!.stats.health).toBe(47); // 70 - 19 - 4
        expect(state.hero!.stats.health).toBe(26); // 26 (No damage)

        // --- ROUND 4 ---
        state = nextRound(state);
        state = resolveSpeedRolls(state,
            [{ value: 2, isRerolled: false }, { value: 4, isRerolled: false }],
            [{ value: 5, isRerolled: false }, { value: 4, isRerolled: false }]
        );
        // Charm Reroll logic manually simulated or if capability exists
        state = activateAbility(state, 'Charm');
        // Engine handles reroll state setting, then we handle reroll
        // But for this test we manually input new rolls via resolveSpeedRolls again to simulate result
        state = resolveSpeedRolls(state,
            [{ value: 3, isRerolled: true }, { value: 4, isRerolled: false }],
            [{ value: 5, isRerolled: false }, { value: 4, isRerolled: false }]
        );

        expect(state.winner).toBe('enemy'); // 17 vs 20

        state = commitSpeedResult(state);
        state = resolveDamageRolls(state, [{ value: 3, isRerolled: false }]);
        state = commitDamageResult(state);

        // Dmg: 3 + 10 = 13. Armour 3. 10 Dmg.
        expect(state.hero!.stats.health).toBe(16); // 26 - 10
        expect(state.enemy!.stats.health).toBe(43); // 47 - 4

        // --- POST R4 HEAL ---
        state = useBackpackItem(state, 0); // Gourd +6
        state = activateAbility(state, 'Heal'); // +4
        expect(state.hero!.stats.health).toBe(26); // 16 + 6 + 4 = 26

        // --- ROUND 5 ---
        state = nextRound(state);
        state = resolveSpeedRolls(state,
            [{ value: 6, isRerolled: false }, { value: 5, isRerolled: false }],
            [{ value: 2, isRerolled: false }, { value: 6, isRerolled: false }]
        );
        expect(state.winner).toBe('hero');

        state = commitSpeedResult(state);
        state = activateAbility(state, 'Deep Wound');

        // Critical Strike Logic
        state = resolveDamageRolls(state, [{ value: 1, isRerolled: false }, { value: 5, isRerolled: false }]);
        state = activateAbility(state, 'Critical Strike'); // Sets to 6, 6

        // Life Spark Trigger (Double 6s) - Manual Heal in test logic
        state = {
            ...state,
            hero: {
                ...state.hero!,
                stats: { ...state.hero!.stats, health: Math.min(35, state.hero!.stats.health + 4) }
            }
        };

        state = commitDamageResult(state);

        // Dmg: 6+6 + 12 = 24. Armour 8. 16 Dmg.
        expect(state.enemy!.stats.health).toBe(23); // 43 - 16 - 4
        expect(state.hero!.stats.health).toBe(30); // 26+4 = 30

        // --- ROUND 6 ---
        state = nextRound(state);
        state = resolveSpeedRolls(state,
            [{ value: 2, isRerolled: false }, { value: 2, isRerolled: false }],
            [{ value: 5, isRerolled: false }, { value: 4, isRerolled: false }]
        );

        // Life Spark (Speed Double 2s)
        state = {
            ...state,
            hero: {
                ...state.hero!,
                stats: { ...state.hero!.stats, health: Math.min(35, state.hero!.stats.health + 4) }
            }
        };

        expect(state.winner).toBe('enemy'); // 14 vs 20

        state = commitSpeedResult(state);

        // Trample: Roll 6 -> +5.
        // Manually inject modification
        state = {
            ...state,
            modifications: [
                ...state.modifications,
                { modification: { source: 'Trample', target: 'enemy', stats: { damageModifier: 5 } }, duration: 1, id: 'trample-proc' }
            ]
        }

        state = resolveDamageRolls(state, [{ value: 6, isRerolled: false }]);
        state = commitDamageResult(state);

        // Dmg: 6 + 10 + 5(Trample) = 21. Armour 3. 18 Dmg.
        // HP: 34 (30+4) - 18 = 16.
        expect(state.hero!.stats.health).toBe(16);
        expect(state.enemy!.stats.health).toBe(19); // 23 - 4

        // --- ROUND 7 ---
        state = nextRound(state);
        state = resolveSpeedRolls(state,
            [{ value: 4, isRerolled: false }, { value: 6, isRerolled: false }],
            [{ value: 1, isRerolled: false }, { value: 4, isRerolled: false }]
        );
        expect(state.winner).toBe('hero');

        state = commitSpeedResult(state);
        state = resolveDamageRolls(state, [{ value: 1, isRerolled: false }]);
        state = commitDamageResult(state);

        // Dmg: 1 + 12 = 13. Armour 8. 5 Dmg.
        expect(state.enemy!.stats.health).toBe(10); // 19 - 5 - 4
        expect(state.hero!.stats.health).toBe(16); // 16 (Winner)

        // --- ROUND 8 ---
        state = nextRound(state);
        state = resolveSpeedRolls(state,
            [{ value: 3, isRerolled: false }, { value: 5, isRerolled: false }],
            [{ value: 2, isRerolled: false }, { value: 2, isRerolled: false }]
        );
        expect(state.winner).toBe('hero');

        state = commitSpeedResult(state);
        state = resolveDamageRolls(state, [{ value: 2, isRerolled: false }]);
        state = commitDamageResult(state);

        // Dmg: 2 + 12 = 14. Armour 8. 6 Dmg.
        expect(state.enemy!.stats.health).toBe(0); // 10 - 6 - 4 => 0.
        expect(state.hero!.stats.health).toBe(16); // 16 (Winner)

        randomSpy.mockRestore();
    });
});
