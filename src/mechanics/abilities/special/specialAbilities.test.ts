import { describe, expect, it, beforeEach, assert } from 'vitest';
import { addAbility, CombatState, getEffect, hasEffect, requireAbilityDefinition } from '../../../types/combatState';
import { createCombatant, MOCK_HERO, MOCK_ENEMY, INITIAL_STATE, mockDiceRolls } from '../../../tests/testUtils';
import { deterministicRoll } from '../../../types/dice';
import '../../allAbilities';

describe('Special Abilities Patterns', () => {
    let state: CombatState;

    beforeEach(() => {
        state = {
            ...INITIAL_STATE,
            enemy: createCombatant(MOCK_ENEMY),
            hero: createCombatant(MOCK_HERO),
        };
    });

    describe('Round Start Abilities', () => {
        it('Acid: should trigger damage on roll of 1 or 2', () => {
            mockDiceRolls([1]);

            const ability = requireAbilityDefinition('Acid');
            state = ability.onRoundStart!(state, { ability: undefined, owner: 'enemy', target: 'hero' });

            expect(state.hero.stats.health).toBeLessThan(MOCK_HERO.stats.health);
            expect(state.logs.some(l => l.message.includes('Acid check: rolled 1'))).toBe(true);
        });

        it('And by crook: should apply modifiers when health < 20', () => {
            state.enemy = createCombatant(MOCK_ENEMY);

            const ability = requireAbilityDefinition('And by crook');
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
            const def = requireAbilityDefinition('Bewitched');

            state.enemySpeedRolls = deterministicRoll([1, 2, 6]);

            mockDiceRolls([3, 4]);
            state = def!.onSpeedRoll!(state, { ability: undefined, owner: 'enemy' });

            expect(state.enemySpeedRolls).toEqual([
                { value: 3, isRerolled: true },
                { value: 4, isRerolled: true },
                { value: 6, isRerolled: false }
            ]);
            expect(state.logs.some(l => l.message.includes('Bewitched'))).toBe(true);
        });
    });

    describe('Dice Manipulation Abilities', () => {
        it('Blood Drinker: should add die and heal on rolling a 6', () => {
            state = {
                ...state,
                enemy: createCombatant({
                    ...MOCK_ENEMY,
                }),
                hero: createCombatant(MOCK_HERO),
                winner: 'enemy',
                damage: {
                    damageRolls: deterministicRoll([6]),
                    modifiers: []
                }
            };

            mockDiceRolls([3]);
            state.enemy.stats.health = 15;

            const def = requireAbilityDefinition('Blood Drinker');
            assert(def && def.onDamageRoll);
            state = def!.onDamageRoll!(state, { owner: 'enemy', target: 'hero' });

            expect(state.damage!.damageRolls).toHaveLength(2);
            expect(state.damage!.damageRolls[1].value).toBe(3);
            expect(state.enemy.stats.health).toBe(17);
        });

        it('Distraction: should skip damage on roll 1-2 when losing', () => {
            state.winner = 'enemy';

            mockDiceRolls([5]);
            const def = requireAbilityDefinition('Distraction');
            state = def!.onDamageRoll!(state, { owner: 'hero' });

            expect(state.winner).toEqual('enemy');
            expect(state.logs).not.toContain(expect.objectContaining({
                message: expect.stringContaining('Skipping damage')
            }));

            mockDiceRolls([1]);
            state.logs = [];
            state = def!.onDamageRoll!(state, { owner: 'hero' });

            expect(state.winner).toBeNull();
            expect(state.logs.some(l => l.message && l.message.includes('Skipping damage'))).toBe(true);
        });

        it('Zen Charge: should add speed dice in round 1', () => {
            state.round = 1;

            const def = requireAbilityDefinition('Zen Charge');
            state = def!.onRoundStart!(state, { owner: 'enemy' });
            expect(hasEffect(state, 'enemy', 'Zen Charge')).toBe(true);

            const effect = state.enemy.activeEffects.find(e => e.source === 'Zen Charge');
            expect(effect?.stats.speedDice).toBe(1);

            state.round = 2;
            // Manual clear as endRound isn't called here
            state.enemy.activeEffects = [];
            state = def!.onRoundStart!(state, { owner: 'enemy' });
            expect(hasEffect(state, 'enemy', 'Zen Charge')).toBe(false);
        });

        it('Downsized: should reduce stats based on missing health', () => {
            // Full health
            state.enemy.stats.maxHealth = 40;
            state.enemy.stats.health = 40;
            const def = requireAbilityDefinition('Downsized');
            state = def.onRoundStart!(state, { owner: 'enemy' });
            expect(hasEffect(state, 'enemy', 'Downsized')).toBe(false);

            // Lose 20 health -> 2 stacks
            state.enemy.stats.health = 15; // Lost 25
            state = def.onRoundStart!(state, { owner: 'enemy' });
            const effect = state.enemy.activeEffects.find(e => e.source === 'Downsized');
            expect(effect).toBeDefined();
            // 25 // 10 = 2
            expect(effect?.stats.speed).toBe(-2);
            expect(effect?.stats.brawn).toBe(-2);
        });

        it('Charge Her Up: should skip damage and discharge every 2 wins', () => {
            state = {
                ...state,
                winner: 'enemy',
                damage: {
                    damageRolls: deterministicRoll([5]),
                    modifiers: []
                }
            };

            const def = requireAbilityDefinition('Charge her up');
            state = def!.onDamageRoll!(state, { owner: 'enemy', ability: state.enemy.activeAbilities.get('charge-her-up') });
            expect(state.damage?.damageRolls).toEqual([]);
            expect(hasEffect(state, 'enemy', 'Charge her up')).toBe(true);

            state.damage = {
                damageRolls: deterministicRoll([5]),
                modifiers: []
            };
            state = def!.onDamageRoll!(state, { owner: 'enemy' });
            expect(state.damage?.damageRolls).toEqual([]);
            expect(state.hero.stats.health).toBe(MOCK_HERO.stats.health - 10);
            expect(hasEffect(state, 'enemy', 'Charge her up')).toBe(false);
        });
    });

    describe('Other abilities', () => {
        it('Dragon Breath: should deal damage if opponent is burning', () => {
            // Mock burn effect
            state.hero = createCombatant(MOCK_HERO);
            state.hero.activeEffects.push({
                source: 'Ignite',
                target: 'hero',
                stats: {},
                duration: 1
            });

            const def = requireAbilityDefinition('Dragon breath');
            state = def.onRoundStart!(state, { owner: 'enemy' });

            expect(state.damageDealt).toContainEqual({
                target: 'hero',
                source: 'Dragon breath',
                amount: 2
            });
        });

        it('Entrapment: should reduce opponent speed dice on win', () => {
            const ability = requireAbilityDefinition('Entrapment');
            state.winner = 'hero';

            state = ability.onDamageRoll!(state, { owner: 'hero' });

            const effect = getEffect(state, 'enemy', 'Entrapment');
            expect(effect).toBeDefined();
            expect(effect?.stats.speedDice).toBe(-1);
        });

        it('Eye Beam: should deal damage on speed roll 6', () => {
            state.heroSpeedRolls = deterministicRoll([6]);

            const ability = requireAbilityDefinition('Eye Beam');
            state = ability.onSpeedRoll!(state, { owner: 'hero' });

            expect(state.damageDealt).toContainEqual({
                target: 'enemy',
                source: 'Eye Beam',
                amount: 2
            });
        });

        it('Faithful Duty: should heal when low health and trigger only once', () => {
            const def = requireAbilityDefinition('Faithful duty');
            const ability = addAbility(state.hero, def);
            state.hero.stats.health = 4;
            expect(ability?.uses).toBe(1);

            // First trigger
            state = def.onDamageDealt!(state,
                { ability, owner: 'hero' }, 'Attack', 5);

            expect(state.hero.stats.health).toBe(14); // 4 + 10
            expect(ability?.uses).toBe(0);

            // Second trigger (should fail)
            state.hero.stats.health = 4;
            state = def.onDamageDealt!(state,
                { ability, owner: 'hero' }, 'Attack', 5);
            expect(state.hero.stats.health).toBe(4); // No heal
        });

        it('Ferocity: should add damage die on speed roll 6', () => {
            const def = requireAbilityDefinition('Ferocity');
            const ability = addAbility(state.hero, def);

            // Mock speed roll with 6
            state.heroSpeedRolls = deterministicRoll([6]);

            state = def.onSpeedRoll!(state, { ability, owner: 'hero' });

            expect(hasEffect(state, 'hero', 'Ferocity')).toBe(true);
        });

        it('Frenzy: should add damage die on combat start', () => {
            const def = requireAbilityDefinition('Frenzy');
            console.log(def);

            state = def.onRoundStart!(state, { owner: 'enemy' });

            expect(hasEffect(state, 'enemy', 'Frenzy')).toBe(true);
            const effect = getEffect(state, 'enemy', 'Frenzy');
            expect(effect?.stats.damageDice).toBe(1);
        });

        it('Glutinous maximus: should reduce hero speed dice on win', () => {
            const def = requireAbilityDefinition('Glutinous maximus');
            state.winner = 'hero';

            state = def.onDamageRoll!(state, { owner: 'enemy' });

            expect(hasEffect(state, 'hero', 'Glutinous maximus')).toBe(true);
            const effect = getEffect(state, 'hero', 'Glutinous maximus');
            expect(effect?.stats.speedDice).toBe(-1);
        });

        it('Ink bombs: should make hero lose round on rolling 1', () => {
            const def = requireAbilityDefinition('Ink bombs');
            state.heroSpeedRolls = deterministicRoll([1, 3]);

            state = def.onSpeedRoll!(state, { owner: 'enemy' });

            expect(state.winner).toBe('enemy');
        });

        it('King of the swingers: should deal passive damage reduced by armour', () => {
            const def = requireAbilityDefinition('King of the swingers');
            state.hero.stats.armour = 5;
            state.hero.stats.health = 30;

            state = def.onPassiveAbility!(state, { owner: 'enemy' });

            // 15 - 5 armour = 10 damage
            expect(state.hero.stats.health).toBe(20);
        });
    });
});
