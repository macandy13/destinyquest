import { renderHook, act } from '@testing-library/react';
import { useCombat } from '../hooks/useCombat';
import { HeroStats } from '../types/hero';
import { describe, it, expect } from 'vitest';
import { registerAbility } from '../mechanics/abilityRegistry';

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

        act(() => result.current.startCombat());

        expect(result.current.combat.phase).toBe('combat-start');
        expect(result.current.combat.round).toBe(1);
        expect(result.current.combat.enemy).toBeDefined();
    });

    it('should resolve speed round where hero wins', () => {
        const { result } = renderHook(() => useCombat(MOCK_HERO));

        act(() => result.current.startCombat());

        act(() => result.current.nextRound());

        // Hero total: 6 + 5(spd) = 11
        // Enemy total: 2 + enemySpd (dummy 2) = 4
        // Hero wins clearly

        act(() => {
            result.current.resolveSpeedRound({
                heroRolls: [{ value: 3, isRerolled: false }, { value: 3, isRerolled: false }],
                enemyRolls: [{ value: 1, isRerolled: false }, { value: 1, isRerolled: false }]
            });
        });

        expect(result.current.combat.phase).toBe('speed-roll');
        expect(result.current.combat.winner).toBe('hero');
        expect(result.current.combat.heroSpeedRolls).toEqual([
            { value: 3, isRerolled: false },
            { value: 3, isRerolled: false }
        ]);
    });

    it('should resolve damage correctly (applying armour)', () => {
        const { result } = renderHook(() => useCombat(MOCK_HERO));

        act(() => result.current.startCombat());

        // Speed round win for Hero
        act(() => result.current.resolveSpeedRound({
            heroRolls: [{ value: 6, isRerolled: false }, { value: 6, isRerolled: false }],
            enemyRolls: [{ value: 0, isRerolled: false }, { value: 0, isRerolled: false }]
        }));

        const initialEnemyHealth = result.current.combat.enemy!.health;

        // Damage roll 6 + 5(brawn) = 11 damage
        // Enemy armour 2
        act(() => result.current.executeDamageRoll([{ value: 6, isRerolled: false }]));
        act(() => result.current.commitDamageResult());

        expect(result.current.combat.enemy!.health).toBe(initialEnemyHealth - 11);
        expect(result.current.combat.phase).toBe('round-end');
        expect(result.current.combat.damageRolls).toEqual([{ value: 6, isRerolled: false }]);
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

        act(() => result.current.startCombat());

        act(() => {
            result.current.nextRound(); // Speed roll logic would happen here
            result.current.resolveSpeedRound({
                heroRolls: [{ value: 6, isRerolled: false }, { value: 6, isRerolled: false }],
                enemyRolls: [{ value: 1, isRerolled: false }, { value: 1, isRerolled: false }]
            }); // Hero wins
        });

        const initialEnemyHealth = result.current.combat.enemy!.health;

        // Damage roll 3 (1 die) + 5(brawn) = 8 damage
        // Acid adds +1 per die = +1
        // Total = 9
        act(() => result.current.executeDamageRoll([{ value: 3, isRerolled: false }]));
        act(() => result.current.commitDamageResult());

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

        act(() => result.current.startCombat());

        const initialEnemyHealth = result.current.combat.enemy!.health;

        // Simulate combat flow
        act(() => result.current.nextRound());
        act(() => result.current.resolveSpeedRound({
            heroRolls: [{ value: 6, isRerolled: false }, { value: 6, isRerolled: false }],
            enemyRolls: [{ value: 1, isRerolled: false }, { value: 1, isRerolled: false }]
        }));

        // Damage phase
        // Damage: 3 + 5(brawn) = 8.
        act(() => result.current.executeDamageRoll([{ value: 3, isRerolled: false }]));
        act(() => result.current.commitDamageResult());

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

        act(() => result.current.startCombat());

        // Activate Ability
        act(() => result.current.activateAbility('Adrenaline'));

        expect(result.current.combat.modifiers).toHaveLength(1);
        expect(result.current.combat.modifiers[0].value).toBe(2);
        expect(result.current.combat.modifiers[0].duration).toBe(2);

        // Round 1
        act(() => result.current.nextRound()); // Phase: speed-roll

        // Speed: 5 (base) + 2 (mod) + 2 (roll) = 9
        // Enemy: 2 (base) + 2 (roll) = 4
        // Hero wins
        act(() => result.current.resolveSpeedRound({
            heroRolls: [{ value: 1, isRerolled: false }, { value: 1, isRerolled: false }],
            enemyRolls: [{ value: 1, isRerolled: false }, { value: 1, isRerolled: false }]
        }));

        expect(result.current.combat.heroSpeedRolls).toEqual([
            { value: 1, isRerolled: false },
            { value: 1, isRerolled: false }
        ]);
        // Hero Total calculation isn't exposed directly but inferred from log or winner logic
        // If hero had 7 speed (5+2), vs 4.
        expect(result.current.combat.winner).toBe('hero');
        expect(result.current.combat.logs.slice(-1)[0].message).toContain('Hero 9 (+2 mod)');

        // Round 2 (Duration should decrease)
        act(() => result.current.nextRound());

        expect(result.current.combat.modifiers[0].duration).toBe(1);

        // Speed check again
        act(() => {
            result.current.resolveSpeedRound({
                heroRolls: [{ value: 1, isRerolled: false }, { value: 1, isRerolled: false }],
                enemyRolls: [{ value: 1, isRerolled: false }, { value: 1, isRerolled: false }]
            });
        });
        expect(result.current.combat.logs.slice(-1)[0].message).toContain('Hero 9 (+2 mod)');

        // Round 3 (Duration should expire)
        act(() => result.current.nextRound());

        expect(result.current.combat.modifiers).toHaveLength(0);

        // Speed check - modifier gone
        // Speed: 5 (base) + 2 (roll) = 7
        act(() => result.current.resolveSpeedRound({
            heroRolls: [{ value: 1, isRerolled: false }, { value: 1, isRerolled: false }],
            enemyRolls: [{ value: 1, isRerolled: false }, { value: 1, isRerolled: false }]
        }));
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

        act(() => result.current.startCombat());

        // Advance to Speed Round
        act(() => result.current.nextRound());

        // Enemy wins speed round
        // Hero: 5(spd) + 1(roll) = 6
        // Enemy: 2(spd) + 5(roll) = 7
        act(() => result.current.resolveSpeedRound({
            heroRolls: [{ value: 1, isRerolled: false }, { value: 0, isRerolled: false }],
            enemyRolls: [{ value: 2, isRerolled: false }, { value: 3, isRerolled: false }]
        }));

        expect(result.current.combat.phase).toBe('speed-roll');
        expect(result.current.combat.winner).toBe('enemy');

        // Proceed to damage phase confirmed
        act(() => result.current.commitSpeedResult());

        expect(result.current.combat.phase).toBe('damage-roll');

        // Activate Parry
        act(() => result.current.activateAbility('Parry'));

        expect(result.current.combat.phase).toBe('round-end');
        expect(result.current.combat.logs.slice(-1)[0].message).toContain('Parry');
        expect(result.current.combat.damageRolls).toEqual([{ value: 0, isRerolled: false }]);
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

        act(() => result.current.startCombat());

        // Simulate taking damage
        act(() => {
            // Manually trigger damage receive logic or manipulate state logic if possible, 
            // but simpler to just test heal effect when health is lower.
            // Since we can't easily force damage without full round, we can test it at start but full health caps it.
            // However, startCombat sets health to max.
            // We need to simulate damage first.
            result.current.commitSpeedResult();
            result.current.executeDamageRoll([{ value: 10, isRerolled: false }]);
            result.current.commitDamageResult();
            // Wait, I need to set phase to damage-roll and winner to enemy manually or through flow?
            // Easier: Manually activate Heal after a round where Hero took damage?
            // Or just trust state update?
            // I'll simulate a round where enemy wins and deals damage.
            result.current.nextRound();
            result.current.resolveSpeedRound({
                heroRolls: [{ value: 1, isRerolled: false }, { value: 1, isRerolled: false }],
                enemyRolls: [{ value: 6, isRerolled: false }, { value: 6, isRerolled: false }]
            }); // Enemy wins
        });

        act(() => {
            // Hero takes damage
            // Enemy stats: Brawn 2 + Roll 10 = 12. Hero armour 2. Dmg 10.
            // Hero Health 20 -> 10.
            result.current.commitSpeedResult(); // Proceed from speed to damage
            result.current.executeDamageRoll([{ value: 10, isRerolled: false }]);
        });
        act(() => {
            result.current.commitDamageResult();
        });

        const healthBefore = result.current.combat.hero!.stats.health;
        expect(healthBefore).toBeLessThan(MOCK_HERO_STATS.maxHealth);

        // Activate Heal
        act(() => result.current.activateAbility('Heal'));

        expect(result.current.combat.hero!.stats.health).toBe(healthBefore + 4);
        expect(result.current.combat.logs.slice(-1)[0].message).toContain('Restored 4 health');
    });

    it('should apply damage-bonus modifier', () => {
        // This test simulates a custom ability that adds a damage modifier
        const DAMAGE_MOD_HERO = { ...MOCK_HERO };

        const { result } = renderHook(() => useCombat(DAMAGE_MOD_HERO));

        act(() => result.current.startCombat());

        // Manually inject a modifier for testing purposes
        // In a real scenario, this would come from an ability's onActivate
        act(() => {
            // We can't easily inject into state without an ability, 
            // so let's mock an ability that does it or use a trick.
            // Actually, we can just use the internal setCombat if we exposed it, but we don't.
            // We'll use a registered ability.
        });

        // Let's register a temporary mock ability
        const MockAbilityDef = {
            name: 'Mock Damage Buff',
            type: 'modifier' as const,
            description: 'Adds +3 damage',
            onActivate: (state: any) => ({
                modifiers: [...state.modifiers, {
                    name: 'Mock Buff',
                    source: 'Mock Damage Buff',
                    type: 'damage-bonus',
                    value: 3,
                    duration: 2
                }],
                logs: [...state.logs, { round: state.round, message: 'Used Mock Buff', type: 'info' }]
            })
        };
        registerAbility(MockAbilityDef);

        const HERO_WITH_ABILITY = {
            ...MOCK_HERO,
            equipment: {
                trinket: { name: 'Buff Charm', abilities: ['Mock Damage Buff'] }
            }
        };

        const resultWithAbility = renderHook(() => useCombat(HERO_WITH_ABILITY)).result;

        act(() => resultWithAbility.current.startCombat());
        act(() => resultWithAbility.current.activateAbility('Mock Damage Buff'));

        // Verify modifier is present
        expect(resultWithAbility.current.combat.modifiers).toHaveLength(1);
        expect(resultWithAbility.current.combat.modifiers[0].type).toBe('damage-bonus');

        // Go to damage phase
        act(() => resultWithAbility.current.nextRound()); // speed phase
        act(() => resultWithAbility.current.resolveSpeedRound({
            heroRolls: [{ value: 6, isRerolled: false }, { value: 6, isRerolled: false }],
            enemyRolls: [{ value: 1, isRerolled: false }, { value: 1, isRerolled: false }]
        }));
        act(() => resultWithAbility.current.commitSpeedResult()); // damage phase

        // Execute damage
        // Roll = 10. Brawn = 5. Mod = 3. Total = 18.
        const initialEnemyHealth = resultWithAbility.current.combat.enemy!.health;
        act(() => resultWithAbility.current.executeDamageRoll([{ value: 10, isRerolled: false }]));
        act(() => resultWithAbility.current.commitDamageResult());

        // Enemy has 0 armour in mock.
        // Expected damage: 10 (roll) + 5 (brawn) + 3 (mod) = 18.
        const expectedHealth = initialEnemyHealth - 18;
        expect(resultWithAbility.current.combat.enemy!.health).toBe(expectedHealth);
    });

    it('should apply speed-dice modifier', () => {
        const MockDiceAbilityDef = {
            name: 'Mock Dice Buff',
            type: 'modifier' as const,
            description: 'Adds +1 speed die',
            onActivate: (state: any) => ({
                modifiers: [...state.modifiers, {
                    name: 'Mock Dice',
                    source: 'Mock Dice Buff',
                    type: 'speed-dice',
                    value: 1,
                    duration: 2
                }]
            })
        };
        // Mock is already registered via abilityRegistry but we need to do it cleaner or just rely on the import
        // Since we cannot dynamic import easily here without being async or using await import, 
        // and we are already importing getAbilityDefinition in the hook, 
        // let's just use the imported registerAbility.

        registerAbility(MockDiceAbilityDef);

        const HERO_WITH_DICE = {
            ...MOCK_HERO,
            equipment: {
                trinket: { name: 'Dice Charm', abilities: ['Mock Dice Buff'] }
            }
        };

        const { result } = renderHook(() => useCombat(HERO_WITH_DICE));

        act(() => result.current.startCombat());
        act(() => result.current.activateAbility('Mock Dice Buff'));

        // Next round to checking rolling
        act(() => result.current.nextRound());

        // Check the rolls in state. Hero should have speedDice (def 2) + 1 = 3 rolls.
        expect(result.current.combat.heroSpeedRolls).toHaveLength(3);
    });
});
