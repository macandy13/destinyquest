import { renderHook, act } from '@testing-library/react';
import { useCombat } from '../hooks/useCombat';
import { HeroStats } from '../types/hero';
import { describe, it, expect } from 'vitest';

const MOCK_HERO_STATS: HeroStats = {
    speed: 5,
    brawn: 5,
    magic: 0,
    armour: 2,
    health: 20,
    maxHealth: 20
};

const MOCK_HERO: any = {
    name: 'Test Hero',
    stats: MOCK_HERO_STATS,
    equipment: {}
};

describe('useCombat Hook', () => {
    it('should initialize in inactive state', () => {
        const { result } = renderHook(() => useCombat(MOCK_HERO));
        expect(result.current.combat.phase).toBe('combat-start');
    });

    it('should start combat correctly', () => {
        const { result } = renderHook(() => useCombat(MOCK_HERO));

        act(() => {
            result.current.startCombat();
        });

        expect(result.current.combat.phase).toBe('combat-start');
        expect(result.current.combat.round).toBe(1);
        expect(result.current.combat.enemy).toBeDefined();
    });

    it('should resolve speed round where hero wins', () => {
        const { result } = renderHook(() => useCombat(MOCK_HERO));

        act(() => {
            result.current.startCombat();
        });

        act(() => {
            result.current.nextRound();
        });

        // Hero total: 6 + 5(spd) = 11
        // Enemy total: 2 + enemySpd (dummy 2) = 4
        // Hero wins clearly

        act(() => {
            result.current.resolveSpeedRound({ heroRolls: [3, 3], enemyRolls: [1, 1] });
        });

        expect(result.current.combat.phase).toBe('damage-roll');
        expect(result.current.combat.winner).toBe('hero');
        expect(result.current.combat.heroSpeedRolls).toEqual([3, 3]);
    });

    it('should resolve damage correctly (applying armour)', () => {
        const { result } = renderHook(() => useCombat(MOCK_HERO));

        act(() => {
            result.current.startCombat();
        });

        // Speed round win for Hero
        act(() => {
            result.current.resolveSpeedRound({ heroRolls: [6, 6], enemyRolls: [0, 0] });
        });

        const initialEnemyHealth = result.current.combat.enemy!.health;

        // Damage roll 6 + 5(brawn) = 11 damage
        // Enemy armour 0
        act(() => {
            result.current.resolveDamageAndArmour([6]);
        });

        expect(result.current.combat.enemy!.health).toBe(initialEnemyHealth - 11);
        expect(result.current.combat.phase).toBe('round-end');
        expect(result.current.combat.damageRolls).toEqual([6]);
    });

    it('should apply Acid passive ability (add +1 per damage die)', () => {
        const ACIC_HERO = {
            ...MOCK_HERO,
            equipment: {
                gloves: {
                    name: 'Acid Gloves',
                    abilities: ['Acid']
                }
            }
        };

        const { result } = renderHook(() => useCombat(ACIC_HERO));

        act(() => {
            result.current.startCombat();
        });

        act(() => {
            result.current.nextRound(); // Speed roll logic would happen here
            result.current.resolveSpeedRound({ heroRolls: [6, 6], enemyRolls: [1, 1] }); // Hero wins
        });

        const initialEnemyHealth = result.current.combat.enemy!.health;

        // Damage roll 3 (1 die) + 5(brawn) = 8 damage
        // Acid adds +1 per die = +1
        // Total = 9
        act(() => {
            result.current.resolveDamageAndArmour([3]);
        });

        // 20 - 9 = 11
        expect(result.current.combat.enemy!.health).toBe(initialEnemyHealth - 9);
        expect(result.current.combat.logs.slice(-1)[0].message).toContain('(+1 Acid)');
    });

    it('should apply Barbs passive ability (1 damage at end of round)', () => {
        const BARBS_HERO = {
            ...MOCK_HERO,
            equipment: {
                gloves: {
                    name: 'Barbed Bracers',
                    abilities: ['Barbs']
                }
            }
        };

        const { result } = renderHook(() => useCombat(BARBS_HERO));

        act(() => {
            result.current.startCombat();
        });

        const initialEnemyHealth = result.current.combat.enemy!.health;

        // Simulate combat flow
        act(() => {
            result.current.nextRound();
        });

        act(() => {
            result.current.resolveSpeedRound({ heroRolls: [6, 6], enemyRolls: [1, 1] });
        });

        // Damage phase
        // Damage: 3 + 5(brawn) = 8.
        act(() => {
            result.current.resolveDamageAndArmour([3]);
        });

        // 8 combat damage + 1 Barbs damage = 9 total
        expect(result.current.combat.enemy!.health).toBe(initialEnemyHealth - 9);
        expect(result.current.combat.logs.slice(-1)[0].message).toContain('Barbs inflicts 1 damage');
    });

    it('should apply Adrenaline speed ability (+2 speed for 2 rounds)', () => {
        const ADRENALINE_HERO = {
            ...MOCK_HERO,
            equipment: {
                gloves: {
                    name: 'Adrenaline Gloves',
                    abilities: ['Adrenaline']
                }
            }
        };

        const { result } = renderHook(() => useCombat(ADRENALINE_HERO));

        act(() => {
            result.current.startCombat();
        });

        // Activate Ability
        act(() => {
            result.current.activateAbility('Adrenaline');
        });

        expect(result.current.combat.modifiers).toHaveLength(1);
        expect(result.current.combat.modifiers[0].value).toBe(2);
        expect(result.current.combat.modifiers[0].duration).toBe(2);

        // Round 1
        act(() => {
            result.current.nextRound(); // Phase: speed-roll
        });

        // Speed: 5 (base) + 2 (mod) + 2 (roll) = 9
        // Enemy: 2 (base) + 2 (roll) = 4
        // Hero wins
        act(() => {
            result.current.resolveSpeedRound({ heroRolls: [1, 1], enemyRolls: [1, 1] });
        });

        expect(result.current.combat.heroSpeedRolls).toEqual([1, 1]);
        // Hero Total calculation isn't exposed directly but inferred from log or winner logic
        // If hero had 7 speed (5+2), vs 4.
        expect(result.current.combat.winner).toBe('hero');
        expect(result.current.combat.logs.slice(-1)[0].message).toContain('Hero 9 (+2 mod)');

        // Round 2 (Duration should decrease)
        act(() => {
            result.current.nextRound();
        });

        expect(result.current.combat.modifiers[0].duration).toBe(1);

        // Speed check again
        act(() => {
            result.current.resolveSpeedRound({ heroRolls: [1, 1], enemyRolls: [1, 1] });
        });
        expect(result.current.combat.logs.slice(-1)[0].message).toContain('Hero 9 (+2 mod)');

        // Round 3 (Duration should expire)
        act(() => {
            result.current.nextRound();
        });

        expect(result.current.combat.modifiers).toHaveLength(0);

        // Speed check - modifier gone
        // Speed: 5 (base) + 2 (roll) = 7
        act(() => {
            result.current.resolveSpeedRound({ heroRolls: [1, 1], enemyRolls: [1, 1] });
        });
        expect(result.current.combat.logs.slice(-1)[0].message).toContain('Hero 7 vs'); // No mod text
    });

    it('should apply Parry combat ability (cancel enemy damage)', () => {
        const PARRY_HERO = {
            ...MOCK_HERO,
            equipment: {
                mainHand: {
                    name: 'Parrying Dagger',
                    abilities: ['Parry']
                }
            }
        };

        const { result } = renderHook(() => useCombat(PARRY_HERO));

        act(() => {
            result.current.startCombat();
        });

        // Advance to Speed Round
        act(() => {
            result.current.nextRound();
        });

        // Enemy wins speed round
        // Hero: 5(spd) + 1(roll) = 6
        // Enemy: 2(spd) + 5(roll) = 7
        act(() => {
            result.current.resolveSpeedRound({ heroRolls: [1, 0], enemyRolls: [2, 3] });
        });

        expect(result.current.combat.phase).toBe('damage-roll');
        expect(result.current.combat.winner).toBe('enemy');

        // Activate Parry
        act(() => {
            result.current.activateAbility('Parry');
        });

        expect(result.current.combat.phase).toBe('round-end');
        expect(result.current.combat.logs.slice(-1)[0].message).toContain('Parry');
        expect(result.current.combat.damageRolls).toEqual([0]);
        // Hero should not have taken damage
        expect(result.current.combat.hero!.stats.health).toBe(MOCK_HERO_STATS.health);
    });

    it('should apply Heal modifier ability (restore 4 health)', () => {
        const HEAL_HERO = {
            ...MOCK_HERO,
            equipment: {
                accessory: {
                    name: 'Healing Potion',
                    abilities: ['Heal']
                }
            }
        };

        const { result } = renderHook(() => useCombat(HEAL_HERO));

        act(() => {
            result.current.startCombat();
        });

        // Simulate taking damage
        act(() => {
            // Manually trigger damage receive logic or manipulate state logic if possible, 
            // but simpler to just test heal effect when health is lower.
            // Since we can't easily force damage without full round, we can test it at start but full health caps it.
            // However, startCombat sets health to max.
            // We need to simulate damage first.
            result.current.resolveDamageAndArmour([10]); // Enemy hits hero
            // Wait, I need to set phase to damage-roll and winner to enemy manually or through flow?
            // Easier: Manually activate Heal after a round where Hero took damage?
            // Or just trust state update?
            // I'll simulate a round where enemy wins and deals damage.
            result.current.nextRound();
            result.current.resolveSpeedRound({ heroRolls: [1, 1], enemyRolls: [6, 6] }); // Enemy wins
        });

        act(() => {
            // Hero takes damage
            // Enemy stats: Brawn 2 + Roll 10 = 12. Hero armour 2. Dmg 10.
            // Hero Health 20 -> 10.
            result.current.resolveDamageAndArmour([10]);
        });

        const healthBefore = result.current.combat.hero!.stats.health;
        expect(healthBefore).toBeLessThan(MOCK_HERO_STATS.maxHealth);

        // Activate Heal
        act(() => {
            result.current.activateAbility('Heal');
        });

        expect(result.current.combat.hero!.stats.health).toBe(healthBefore + 4);
        expect(result.current.combat.logs.slice(-1)[0].message).toContain('Restored 4 health');
    });
});
