import { describe, it, expect, vi } from 'vitest';
import { useCombat } from './useCombat';
import { renderHook, act } from '@testing-library/react';
import { Hero } from '../types/hero';
import { Enemy } from '../types/combat';
import '../mechanics/abilities'; // Import side-effects for registration


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
    abilities: ['Charge', 'Trample', 'Bleed^']
};

describe('Full Battle Flow', () => {
    it('Scenario: Ben vs Minorian', () => {
        const { result } = renderHook(() => useCombat(BEN_NEVIS));

        // --- START ---
        // Mock First Strike to deal 2 damage (requires Math.random() between 1/6 and 2/6, e.g. 0.25)
        // using 0.25 to be safely in range [0.166..., 0.333...]
        const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0.25);
        act(() => result.current.startCombat(MINORIAN));
        randomSpy.mockRestore();

        expect(result.current.combat.enemy!.stats.health).toBe(78); // 80 - 2 (First Strike)

        // --- ROUND 1 ---
        act(() => result.current.resolveSpeedRolls({
            heroRolls: [{ value: 3, isRerolled: false }, { value: 5, isRerolled: false }],
            enemyRolls: [{ value: 3, isRerolled: false }, { value: 2, isRerolled: false }, { value: 5, isRerolled: false }]
        })); // Enemy Charge: 3 dice.
        expect(result.current.combat.winner).toBe('enemy');

        act(() => result.current.commitSpeedResult());
        act(() => result.current.activateAbility('Sidestep'));
        act(() => result.current.resolveDamageRolls([{ value: 5, isRerolled: false }]));
        act(() => result.current.commitDamageResult());

        expect(result.current.combat.hero!.stats.health).toBe(35); // Sidestep avoids damage.
        expect(result.current.combat.enemy!.stats.health).toBe(74); // -2 (Bleed & Venom)

        // --- ROUND 2 ---
        act(() => result.current.nextRound());
        act(() => result.current.activateAbility('Webbed'));
        act(() => result.current.resolveSpeedRolls({ // Webbed: Enemy has 1 die (2 default - 1)
            heroRolls: [{ value: 3, isRerolled: false }, { value: 1, isRerolled: false }],
            enemyRolls: [{ value: 6, isRerolled: false }]
        }));
        expect(result.current.combat.winner).toBe('enemy'); // 14 vs 17

        act(() => result.current.commitSpeedResult());
        act(() => result.current.activateAbility('Last Laugh')); // Mock call
        // Damage: Trample on 6 -> +5. Reroll to 2.
        // We simulate final result = 2.
        act(() => result.current.resolveDamageRolls([{ value: 2, isRerolled: true }]));
        act(() => result.current.commitDamageResult());

        expect(result.current.combat.hero!.stats.health).toBe(26); // 35 - 9 (dmg) - 1 (bleed) when enemy abilities are handled
        expect(result.current.combat.enemy!.stats.health).toBe(70); // 74 - 4 (Bleed & Venom)

        // --- ROUND 3 ---
        act(() => result.current.nextRound());
        act(() => result.current.resolveSpeedRolls({
            heroRolls: [{ value: 6, isRerolled: false }, { value: 3, isRerolled: false }],
            enemyRolls: [{ value: 4, isRerolled: false }, { value: 1, isRerolled: false }]
        }));
        expect(result.current.combat.winner).toBe('hero'); // 19 vs 16

        act(() => result.current.commitSpeedResult());
        act(() => result.current.activateAbility('Piercing'));
        act(() => result.current.useBackpackItem(1)); // Pot of Brawn

        act(() => result.current.resolveDamageRolls([{ value: 5, isRerolled: false }]));
        act(() => result.current.commitDamageResult());

        // Dmg: 5 + 12(Brawn) + 2(Pot) = 19. Armour 0 (Piercing).
        expect(result.current.combat.enemy!.stats.health).toBe(47); // 70 - 19 - 4
        expect(result.current.combat.hero!.stats.health).toBe(26); // 26 (No damage)

        // --- ROUND 4 ---
        act(() => result.current.nextRound());
        act(() => result.current.resolveSpeedRolls({
            heroRolls: [{ value: 2, isRerolled: false }, { value: 4, isRerolled: false }],
            enemyRolls: [{ value: 5, isRerolled: false }, { value: 4, isRerolled: false }]
        }));
        // Charm Reroll logic manually simulated
        act(() => result.current.activateAbility('Charm'));
        act(() => result.current.resolveSpeedRolls({
            heroRolls: [{ value: 3, isRerolled: true }, { value: 4, isRerolled: false }],
            enemyRolls: [{ value: 5, isRerolled: false }, { value: 4, isRerolled: false }]
        }));
        expect(result.current.combat.winner).toBe('enemy'); // 17 vs 20

        act(() => result.current.commitSpeedResult());
        act(() => result.current.resolveDamageRolls([{ value: 3, isRerolled: false }]));
        act(() => result.current.commitDamageResult());

        // Dmg: 3 + 10 = 13. Armour 3. 10 Dmg.
        expect(result.current.combat.hero!.stats.health).toBe(16); // 26 - 10
        expect(result.current.combat.enemy!.stats.health).toBe(43); // 47 - 4

        // --- POST R4 HEAL ---
        act(() => result.current.useBackpackItem(0)); // Gourd +6
        act(() => result.current.activateAbility('Heal')); // +4
        expect(result.current.combat.hero!.stats.health).toBe(26); // 16 + 6 + 4 = 26

        // --- ROUND 5 ---
        act(() => result.current.nextRound());
        act(() => result.current.resolveSpeedRolls({
            heroRolls: [{ value: 6, isRerolled: false }, { value: 5, isRerolled: false }],
            enemyRolls: [{ value: 2, isRerolled: false }, { value: 6, isRerolled: false }]
        }));
        expect(result.current.combat.winner).toBe('hero');

        act(() => result.current.commitSpeedResult());
        act(() => result.current.activateAbility('Deep Wound'));

        // Critical Strike Logic
        act(() => result.current.resolveDamageRolls([{ value: 1, isRerolled: false }, { value: 5, isRerolled: false }]));
        act(() => result.current.activateAbility('Critical Strike')); // Sets to 6, 6

        // Life Spark Trigger (Double 6s) - Manual Heal
        act(() => {
            // Apply Life Spark +4
            const h = result.current.combat.hero!;
            h.stats.health = Math.min(35, h.stats.health + 4);
        });

        act(() => result.current.commitDamageResult());

        // Dmg: 6+6 + 12 = 24. Armour 8. 16 Dmg.
        expect(result.current.combat.enemy!.stats.health).toBe(23); // 43 - 16 - 4
        expect(result.current.combat.hero!.stats.health).toBe(30); // 26+4 = 30

        // --- ROUND 6 ---
        act(() => result.current.nextRound());
        act(() => result.current.resolveSpeedRolls({
            heroRolls: [{ value: 2, isRerolled: false }, { value: 2, isRerolled: false }],
            enemyRolls: [{ value: 5, isRerolled: false }, { value: 4, isRerolled: false }]
        }));

        // Life Spark (Speed Double 2s) - Manual Heal
        act(() => {
            const h = result.current.combat.hero!;
            h.stats.health = Math.min(35, h.stats.health + 4);
        });

        expect(result.current.combat.winner).toBe('enemy'); // 14 vs 20

        act(() => result.current.commitSpeedResult());

        // Trample: Roll 6 -> +5.
        // Manually:
        act(() => {
            // Mock Trample activation
            const c = result.current.combat;
            c.modifications.push({ modification: { source: 'Trample', target: 'enemy', stats: { damageModifier: 5 } }, duration: 1, id: 'trample-proc' });
        });

        act(() => result.current.resolveDamageRolls([{ value: 6, isRerolled: false }]));
        act(() => result.current.commitDamageResult());

        // Dmg: 6 + 10 + 5(Trample) = 21. Armour 3. 18 Dmg.
        // HP: 34 (30+4) - 18 = 16.
        expect(result.current.combat.hero!.stats.health).toBe(16);
        expect(result.current.combat.enemy!.stats.health).toBe(19); // 23 - 4

        // --- ROUND 7 ---
        act(() => result.current.nextRound());
        act(() => result.current.resolveSpeedRolls({
            heroRolls: [{ value: 4, isRerolled: false }, { value: 6, isRerolled: false }],
            enemyRolls: [{ value: 1, isRerolled: false }, { value: 4, isRerolled: false }]
        }));
        expect(result.current.combat.winner).toBe('hero');

        act(() => result.current.commitSpeedResult());
        act(() => result.current.resolveDamageRolls([{ value: 1, isRerolled: false }]));
        act(() => result.current.commitDamageResult());

        // Dmg: 1 + 12 = 13. Armour 8. 5 Dmg.
        expect(result.current.combat.enemy!.stats.health).toBe(10); // 19 - 5 - 4
        expect(result.current.combat.hero!.stats.health).toBe(16); // 16 (Winner)

        // --- ROUND 8 ---
        act(() => result.current.nextRound());
        act(() => result.current.resolveSpeedRolls({
            heroRolls: [{ value: 3, isRerolled: false }, { value: 5, isRerolled: false }],
            enemyRolls: [{ value: 2, isRerolled: false }, { value: 2, isRerolled: false }]
        }));
        expect(result.current.combat.winner).toBe('hero');

        act(() => result.current.commitSpeedResult());
        act(() => result.current.resolveDamageRolls([{ value: 2, isRerolled: false }]));
        act(() => result.current.commitDamageResult());

        // Dmg: 2 + 12 = 14. Armour 8. 6 Dmg.
        expect(result.current.combat.enemy!.stats.health).toBe(0); // 10 - 6 - 4 => 0.
        expect(result.current.combat.hero!.stats.health).toBe(16); // 16 (Winner)

        // Victory!
    });
});
