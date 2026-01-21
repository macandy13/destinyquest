import { describe, expect, it, beforeEach } from 'vitest';
import {
    CombatState,
    hasEffect,
    getEffect,
    requireAbilityDefinition,
    getActiveEnemy,
} from '../../../types/combatState';
import {
    createCombatant,
    MOCK_HERO,
    MOCK_ENEMY,
    INITIAL_STATE,
    mockDiceRolls
} from '../../../tests/testUtils';
import { deterministicRoll } from '../../../types/dice';
import '../../allAbilities';

describe('Complex Abilities', () => {
    let state: CombatState;

    beforeEach(() => {
        state = {
            ...INITIAL_STATE,
            enemies: [createCombatant(MOCK_ENEMY)], activeEnemyIndex: 0,
            hero: createCombatant(MOCK_HERO),
        };
    });

    describe('Snap out of it!', () => {
        it('should apply Hopeless state when rolling a 6', () => {
            mockDiceRolls([6]);

            const def = requireAbilityDefinition('Snap out of it!');
            state = def.onRoundStart!(state, { owner: 'enemy' });

            expect(hasEffect(state, 'hero', 'Snap out of it!')).toBe(true);
        });

        it('should not apply Hopeless state on other rolls', () => {
            mockDiceRolls([3]);

            const def = requireAbilityDefinition('Snap out of it!');
            state = def.onRoundStart!(state, { owner: 'enemy' });

            expect(hasEffect(state, 'hero', 'Snap out of it!')).toBe(false);
        });
    });

    describe('Soft spot', () => {
        it('should skip damage when hero rolls 1 or 2', () => {
            state.winner = 'hero';
            mockDiceRolls([2]);

            const def = requireAbilityDefinition('Soft spot');
            state = def.onDamageRoll!(state, { owner: 'enemy' });

            expect(state.phase).toBe('passive-damage');
        });

        it('should proceed with damage on other rolls', () => {
            state.winner = 'hero';
            state.phase = 'damage-roll';
            mockDiceRolls([5]);

            const def = requireAbilityDefinition('Soft spot');
            state = def.onDamageRoll!(state, { owner: 'enemy' });

            expect(state.phase).toBe('damage-roll');
        });
    });

    describe('Watch your step', () => {
        it('should make hero lose round when rolling a 1', () => {
            state.heroSpeedRolls = deterministicRoll([1, 4]);

            const def = requireAbilityDefinition('Watch your step');
            state = def.onSpeedRoll!(state, { owner: 'enemy' });

            expect(state.winner).toBe('enemy');
        });

        it('should not affect round when no 1 rolled', () => {
            state.heroSpeedRolls = deterministicRoll([3, 4]);

            const def = requireAbilityDefinition('Watch your step');
            state = def.onSpeedRoll!(state, { owner: 'enemy' });

            expect(state.winner).toBeUndefined();
        });
    });

    describe('Whirlwind', () => {
        it('should add extra dice for each 6 rolled', () => {
            state.winner = 'enemy';
            state.damage = {
                damageRolls: deterministicRoll([6, 3]),
                modifiers: []
            };
            mockDiceRolls([4]); // Extra die result

            const def = requireAbilityDefinition('Whirlwind');
            state = def.onDamageRoll!(state, { owner: 'enemy' });

            expect(state.damage?.damageRolls).toHaveLength(3);
            expect(state.damage?.damageRolls[2].value).toBe(4);
        });

        it('should chain extra dice if new 6s are rolled', () => {
            state.winner = 'enemy';
            state.damage = {
                damageRolls: deterministicRoll([6]),
                modifiers: []
            };
            mockDiceRolls([6, 3]); // First extra is 6, second is 3

            const def = requireAbilityDefinition('Whirlwind');
            state = def.onDamageRoll!(state, { owner: 'enemy' });

            expect(state.damage?.damageRolls).toHaveLength(3);
        });
    });

    describe('Warts and all', () => {
        it('should apply toad effect when rolling 1', () => {
            mockDiceRolls([1]);

            const def = requireAbilityDefinition('Warts and all');
            state = def.onRoundStart!(state, { owner: 'enemy' });

            expect(hasEffect(state, 'hero', 'Warts and all')).toBe(true);
            const effect = getEffect(state, 'hero', 'Warts and all');
            expect(effect?.stats.speedDice).toBe(-1);
        });

        it('should not apply effect on other rolls', () => {
            mockDiceRolls([4]);

            const def = requireAbilityDefinition('Warts and all');
            state = def.onRoundStart!(state, { owner: 'enemy' });

            expect(hasEffect(state, 'hero', 'Warts and all')).toBe(false);
        });
    });

    describe('Punishing blows', () => {
        it('should reduce hero armour by 1 per hit', () => {
            const def = requireAbilityDefinition('Punishing blows');

            state = def.onDamageDealt!(
                state,
                { owner: 'enemy', target: 'hero' },
                'Attack',
                5
            );

            const effect = getEffect(state, 'hero', 'Punishing blows');
            expect(effect?.stats.armour).toBe(-1);

            // Second hit
            state = def.onDamageDealt!(
                state,
                { owner: 'enemy', target: 'hero' },
                'Attack',
                5
            );

            const effect2 = getEffect(state, 'hero', 'Punishing blows');
            expect(effect2?.stats.armour).toBe(-2);
        });
    });

    describe('Split personality', () => {
        it('should gain +1 speed/brawn per 10 health lost', () => {
            state.enemies[0].stats.maxHealth = 50;
            state.enemies[0].stats.health = 25; // Lost 25 = 2 stacks

            const def = requireAbilityDefinition('Split personality');
            state = def.onRoundStart!(state, { owner: 'enemy' });

            const effect = getEffect(state, 'enemy', 'Split personality');
            expect(effect?.stats.speed).toBe(2);
            expect(effect?.stats.brawn).toBe(2);
        });

        it('should not apply if no health lost', () => {
            state.enemies[0].stats.maxHealth = 50;
            state.enemies[0].stats.health = 50;

            const def = requireAbilityDefinition('Split personality');
            state = def.onRoundStart!(state, { owner: 'enemy' });

            expect(hasEffect(state, 'enemy', 'Split personality')).toBe(false);
        });
    });

    describe('Strangle vines', () => {
        it('should deal round * 2 damage each round', () => {
            state.round = 3;

            const def = requireAbilityDefinition('Strangle vines');
            state = def.onRoundStart!(state, { owner: 'enemy' });

            expect(state.hero.stats.health).toBe(MOCK_HERO.stats.health - 6);
        });
    });

    describe('Wailing Bride', () => {
        it('should reduce hero stats based on round number', () => {
            state.round = 2;

            const def = requireAbilityDefinition('Wailing Bride');
            state = def.onRoundStart!(state, { owner: 'enemy' });

            const effect = getEffect(state, 'hero', 'Wailing Bride');
            expect(effect?.stats.speed).toBe(-2);
            expect(effect?.stats.brawn).toBe(-2);
            expect(effect?.stats.magic).toBe(-2);
        });
    });

    describe('Many heads', () => {
        it('should restore all health at round 4', () => {
            state.round = 4;
            state.enemies[0].stats.maxHealth = 50;
            state.enemies[0].stats.health = 20;

            const def = requireAbilityDefinition('Many heads');
            state = def.onRoundStart!(state, { owner: 'enemy' });

            expect(state.enemies[0].stats.health).toBe(50);
        });

        it('should not trigger before round 4', () => {
            state.round = 3;
            state.enemies[0].stats.maxHealth = 50;
            state.enemies[0].stats.health = 20;

            const def = requireAbilityDefinition('Many heads');
            state = def.onRoundStart!(state, { owner: 'enemy' });

            expect(state.enemies[0].stats.health).toBe(20);
        });
    });

    describe('Wind-dancer', () => {
        it('should remove hero abilities and backpack', () => {
            state.hero.activeAbilities.set('test', {
                name: 'Test',
                owner: 'hero',
                def: { name: 'Test', description: '', type: 'combat' }
            });
            state.backpack = [{
                id: 'potion',
                name: 'Potion',
                type: 'backpack',
                description: '',
                bookRef: { book: 'test', act: 1 },
                effect: {
                    stats: { health: 10 },
                    source: 'potion',
                    target: 'hero'
                }
            }];

            const def = requireAbilityDefinition('Wind-dancer');
            state = def.onCombatStart!(state, { owner: 'enemy' });

            expect(state.hero.activeAbilities.size).toBe(0);
            expect(state.backpack).toHaveLength(0);
        });
    });

    describe('Wail of the Banshee', () => {
        it('should defeat hero if health >= 100', () => {
            state.enemies[0].stats.health = 100;
            state.enemies[0].stats.maxHealth = 100;

            const def = requireAbilityDefinition('Wail of the Banshee');
            state = def.onCombatStart!(state, { owner: 'enemy' });

            expect(state.hero.stats.health).toBe(0);
            expect(state.phase).toBe('combat-end');
        });

        it('should not affect hero if health < 100', () => {
            state.hero.stats.health = 99;

            const def = requireAbilityDefinition('Wail of the Banshee');
            state = def.onCombatStart!(state, { owner: 'enemy' });

            expect(state.hero.stats.health).toBe(99);
        });
    });

    describe('Endless Swarm', () => {
        it('should prevent enemy defeat by restoring to 1 health', () => {
            state.enemies[0].stats.health = 0;

            const def = requireAbilityDefinition('Endless Swarm');
            state = def.onDamageDealt!(
                state,
                { owner: 'enemy', target: 'enemy' },
                'Attack',
                10
            );

            expect(getActiveEnemy(state).stats.health).toBe(1);
        });

        it('should not affect hero damage', () => {
            state.hero.stats.health = 0;

            const def = requireAbilityDefinition('Endless Swarm');
            state = def.onDamageDealt!(
                state,
                { owner: 'enemy', target: 'hero' },
                'Attack',
                10
            );

            expect(state.hero.stats.health).toBe(0);
        });
    });

    describe('Gathering Darkness (in healingAbilities)', () => {
        it('should heal 8 health at round end', () => {
            state.enemies[0].stats.maxHealth = 50;
            state.enemies[0].stats.health = 30;

            const def = requireAbilityDefinition('Gathering Darkness');
            state = def.onPassiveAbility!(state, { owner: 'enemy' });

            expect(state.enemies[0].stats.health).toBe(38);
        });

        it('should not heal if at 0 health', () => {
            state.enemies[0].stats.maxHealth = 50;
            state.enemies[0].stats.health = 0;

            const def = requireAbilityDefinition('Gathering Darkness');
            state = def.onPassiveAbility!(state, { owner: 'enemy' });

            expect(state.enemies[0].stats.health).toBe(0);
        });
    });
});
