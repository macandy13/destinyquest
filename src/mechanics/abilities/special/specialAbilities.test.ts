import { describe, expect, it, beforeEach } from 'vitest';
import { CombatState, hasAbility, hasEffect } from '../../../types/combatState';
import { createCombatant, MOCK_HERO, MOCK_ENEMY, INITIAL_STATE } from '../../../tests/testUtils';
import { getAbilityDefinition } from '../../abilityRegistry';
import './immunities';
import './passiveDamage';
import './statModifiers';
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
});
