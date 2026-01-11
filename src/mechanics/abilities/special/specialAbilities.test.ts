import { describe, expect, it, beforeEach, assert } from 'vitest';
import { CombatState, hasAbility, hasEffect } from '../../../types/combatState';
import { createCombatant, MOCK_HERO, MOCK_ENEMY, INITIAL_STATE, mockDiceRolls } from '../../../tests/testUtils';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './immunities';
import './passiveDamage';
import './statModifiers';
import './Acid';
import './AndByCrook';
import './Bewitched';
import './specialAbilityPatterns';

describe('Special Abilities Patterns', () => {
    let state: CombatState;

    beforeEach(() => {
        state = {
            ...INITIAL_STATE,
            phase: 'passive-damage' // Most DoTs trigger here
        };
    });

    describe('DoT Abilities', () => {
        it('should deal damage ignoring armour by default (Black coils)', () => {
            const enemy = {
                ...MOCK_ENEMY,
                abilities: ['Black coils']
            };
            state.enemy = createCombatant(enemy);

            // Hero has armour
            const hero = {
                ...MOCK_HERO,
                stats: { ...MOCK_HERO.stats, health: 30, armour: 10 }
            };
            state.hero = createCombatant(hero);

            // Trigger passive ability hook
            const def = getAbilityDefinition('Black coils');
            expect(def).toBeDefined();

            if (def && def.onPassiveAbility) {
                // Call hook with owner = enemy
                state = def.onPassiveAbility(state, { owner: 'enemy', target: 'hero' });
            }

            // Expect damage dealt = 2, hero health = 28 (30 - 2, ignore armour)
            expect(state.hero.stats.health).toBe(28);
            expect(state.damageDealt).toEqual([
                { target: 'hero', source: 'Black coils', amount: 2 }
            ]);
        });

        it('should trigger conditional DoTs (Black venom)', () => {
            // Black venom triggers on damage dealt
            const enemy = {
                ...MOCK_ENEMY,
                abilities: ['Black venom']
            };
            state.enemy = createCombatant(enemy);
            state.hero = createCombatant(MOCK_HERO);

            const def = getAbilityDefinition('Black venom');
            expect(def).toBeDefined();

            // 1. Trigger onDamageDealt to apply effect
            if (def && def.onDamageDealt) {
                state = def.onDamageDealt(state, { ability: undefined, owner: 'enemy', target: 'hero' }, 'Attack', 5);
            }

            expect(hasEffect(state, 'hero', 'Black venom')).toBe(true);

            // 2. Trigger onPassiveAbility to deal damage
            if (def && def.onPassiveAbility) {
                state = def.onPassiveAbility(state, { owner: 'enemy', target: 'hero' });
            }

            // Damage is 2
            expect(state.hero.stats.health).toBe(28);
        });
    });

    describe('Immunities', () => {
        it('should register immunity abilities correctly', () => {
            const enemy = {
                ...MOCK_ENEMY,
                abilities: ['Blazing armour']
            };
            state.enemy = createCombatant(enemy);

            // Manually populate active abilities because createCombatant doesn't do it from strings automatically
            // in the test utility context unless specifically handled.
            // But hasAbility checks activeAbilities map.
            // Note: The real game logic likely calls 'initializeCombat' which populates this.
            // Here we must simulate it.
            const def = getAbilityDefinition('Blazing armour');
            if (def) {
                state.enemy.activeAbilities.set('blazing-armour', {
                    name: 'Blazing armour',
                    owner: 'enemy',
                    def
                });
            }

            expect(hasAbility(state, 'enemy', 'Blazing armour')).toBe(true);

            expect(def).toBeDefined();
            expect(def?.description).toContain('Ignite');
        });
    });

    describe('Stat Modifiers', () => {
        it('should apply onCombatStart buffs (Holy Aura)', () => {
            const def = getAbilityDefinition('Holy Aura');
            expect(def).toBeDefined();

            state.phase = 'combat-start';

            // Assume enemy has it, but it targets Hero
            if (def && def.onCombatStart) {
                state = def.onCombatStart(state, { owner: 'enemy' });
            }

            // Hero should have effect
            const effect = state.hero.activeEffects.find(e => e.source === 'Holy Aura');
            expect(effect).toBeDefined();
            expect(effect?.stats?.brawn).toBe(2);
        });
    });

    describe('Round Start Abilities', () => {
        it('should trigger Acid damage on roll of 1 or 2', () => {
            const def = getAbilityDefinition('Acid');
            assert(def && def.onRoundStart);
            const ability = def!;

            const enemy = {
                ...MOCK_ENEMY,
                abilities: [ability.name]
            };
            state.enemy = createCombatant(enemy);
            state.hero = createCombatant(MOCK_HERO);

            mockDiceRolls([1]);

            state = ability.onRoundStart!(state, { ability: undefined, owner: 'enemy', target: 'hero' });

            expect(state.hero.stats.health).toBeLessThan(MOCK_HERO.stats.health);
            expect(state.logs.some(l => l.message.includes('Acid check: rolled 1'))).toBe(true);
        });

        it('should apply And by crook modifiers when health < 20', () => {
            const def = getAbilityDefinition('And by crook');
            assert(def && def.onRoundStart);
            const ability = def!;

            const enemy = {
                ...MOCK_ENEMY,
                abilities: ['And by crook'],
                stats: { ...MOCK_ENEMY.stats, health: 30, maxHealth: 30 }
            };
            state.enemy = createCombatant(enemy);

            state = ability.onRoundStart!(state, { ability: undefined, owner: 'enemy' });
            expect(hasEffect(state, 'enemy', 'And by crook')).toBe(false);

            // 2. Reduce health to 15
            state.enemy.stats.health = 15;
            state = ability.onRoundStart!(state, { ability: undefined, owner: 'enemy' });
            expect(hasEffect(state, 'enemy', 'And by crook')).toBe(true);

            // Check effective stats would have speedDice=1 (2-1) and damageDice=2 (1+1)
            // (Assuming base defaults 2 and 1)
            const effect = state.enemy.activeEffects.find(e => e.source === 'And by crook');
            expect(effect?.stats.speedDice).toBe(-1);
            expect(effect?.stats.damageDice).toBe(1);

            // 3. Heal back to 25
            state.enemy.stats.health = 25;
            state = ability.onRoundStart!(state, { ability: undefined, owner: 'enemy' });
            expect(hasEffect(state, 'enemy', 'And by crook')).toBe(false);
        });
    });


    describe('Reroll Abilities', () => {
        it('should reroll low dice (Bewitched)', () => {
            const enemy = {
                ...MOCK_ENEMY,
                abilities: ['Bewitched']
            };
            state.enemy = createCombatant(enemy);

            const def = getAbilityDefinition('Bewitched');
            assert(def && def.onSpeedRoll);

            // Setup speed rolls with 1s and 2s
            state.enemySpeedRolls = [
                { value: 1, isRerolled: false },
                { value: 2, isRerolled: false },
                { value: 6, isRerolled: false }
            ];

            mockDiceRolls([3, 4]);
            state = def!.onSpeedRoll!(state, { ability: undefined, owner: 'enemy' });

            // Expect 1 and 2 to be rerolled to 6. 6 should stay 6.
            expect(state.enemySpeedRolls).toEqual([
                { value: 3, isRerolled: true },
                { value: 4, isRerolled: true },
                { value: 6, isRerolled: false }
            ]);
            expect(state.logs.some(l => l.message.includes('Bewitched'))).toBe(true);
        });
    });
});
