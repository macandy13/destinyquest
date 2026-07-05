import { describe, expect, it, beforeEach } from 'vitest';
import { CombatState, hasEffect, requireAbilityDefinition }
    from '../../../types/combatState';
import {
    createCombatant,
    MOCK_HERO,
    MOCK_ENEMY,
    INITIAL_STATE,
} from '../../../tests/testUtils';
import '../../allAbilities';
import { defineAbility, modifyStat, dealDamage, onRoundStart, always } from './index';

// These tests verify the defineAbility builder by exercising abilities
// that were migrated to use it, covering each trigger type.

describe('defineAbility builder', () => {
    let state: CombatState;

    beforeEach(() => {
        state = {
            ...INITIAL_STATE,
            enemies: [createCombatant({
                ...MOCK_ENEMY,
                stats: { ...MOCK_ENEMY.stats, health: 20, maxHealth: 20 },
            })],
            hero: createCombatant({
                ...MOCK_HERO,
                stats: { ...MOCK_HERO.stats, health: 30, maxHealth: 30 },
            }),
        };
    });

    // -------------------------------------------------------------------------
    // onRoundEnd(always()) — passive damage
    // -------------------------------------------------------------------------

    describe('onRoundEnd(always())', () => {
        it('Hellfire: deals 2 damage to hero each round end', () => {
            const def = requireAbilityDefinition('Hellfire');
            state = def.onPassiveAbility!(
                state, { owner: 'enemy', target: 'hero' }
            );
            expect(state.hero.stats.health).toBe(28);
        });

        it('Earth golems: deals 2 damage to enemy each round end', () => {
            const def = requireAbilityDefinition('Earth golems');
            state = def.onPassiveAbility!(
                state, { owner: 'hero', target: 'enemy' }
            );
            expect(state.enemies[0].stats.health).toBe(18);
        });
    });

    // -------------------------------------------------------------------------
    // onRoundStart() — Carrion Crows fires at round start
    // -------------------------------------------------------------------------

    describe('onRoundStart()', () => {
        it('Carrion Crows: deals 4 damage at round start', () => {
            const def = requireAbilityDefinition('Carrion Crows');
            expect(def.onRoundStart).toBeDefined();
            state = def.onRoundStart!(
                state, { owner: 'enemy', target: 'hero' }
            );
            expect(state.hero.stats.health).toBe(26);
        });
    });

    // -------------------------------------------------------------------------
    // onRoundEndAfterFirstHit — conditional DoT (on-damage pattern)
    // -------------------------------------------------------------------------

    describe('onRoundEndAfterFirstHit()', () => {
        it('Disease: does NOT deal damage before first hit', () => {
            const def = requireAbilityDefinition('Disease');
            state = def.onPassiveAbility!(
                state, { owner: 'enemy', target: 'hero' }
            );
            expect(state.hero.stats.health).toBe(30); // no change
        });

        it('Disease: sets marker on first hit', () => {
            const def = requireAbilityDefinition('Disease');
            state = def.onDamageDealt!(
                state,
                { owner: 'enemy', target: 'hero' },
                'Attack',
                5,
            );
            expect(hasEffect(state, 'hero', 'Disease')).toBe(true);
        });

        it('Disease: does NOT set marker when damage is 0', () => {
            const def = requireAbilityDefinition('Disease');
            state = def.onDamageDealt!(
                state,
                { owner: 'enemy', target: 'hero' },
                'Attack',
                0,
            );
            expect(hasEffect(state, 'hero', 'Disease')).toBe(false);
        });

        it('Disease: deals 2 damage per round end after first hit', () => {
            const def = requireAbilityDefinition('Disease');
            // Activate
            state = def.onDamageDealt!(
                state,
                { owner: 'enemy', target: 'hero' },
                'Attack',
                5,
            );
            // First round end
            state = def.onPassiveAbility!(
                state, { owner: 'enemy', target: 'hero' }
            );
            expect(state.hero.stats.health).toBe(28);
            // Second round end
            state = def.onPassiveAbility!(
                state, { owner: 'enemy', target: 'hero' }
            );
            expect(state.hero.stats.health).toBe(26);
        });
    });

    // -------------------------------------------------------------------------
    // onDamageTaken(fromSource(...)) — immunity (cancelDamage)
    // -------------------------------------------------------------------------

    describe('onDamageTaken(fromSource(...))', () => {
        it('Body of Bone: cancels Bleed damage to enemy', () => {
            state.enemies[0].stats.health = 15; // took 5 damage

            const def = requireAbilityDefinition('Body of Bone');
            state = def.onDamageDealt!(
                state,
                { owner: 'enemy', target: 'enemy' },
                'Bleed',
                5,
            );
            expect(state.enemies[0].stats.health).toBe(20); // healed back
        });

        it('Body of Bone: does NOT cancel non-immune source', () => {
            state.enemies[0].stats.health = 15;

            const def = requireAbilityDefinition('Body of Bone');
            state = def.onDamageDealt!(
                state,
                { owner: 'enemy', target: 'enemy' },
                'Attack',
                5,
            );
            expect(state.enemies[0].stats.health).toBe(15); // no change
        });
    });

    // -------------------------------------------------------------------------
    // onDamageTaken(always()) — retaliation (dealDamage('opponent'))
    // -------------------------------------------------------------------------

    describe('onDamageTaken(always())', () => {
        it('Charged: deals 2 damage to hero when enemy is hit', () => {
            state.enemies[0].stats.health = 15; // enemy took 5 damage

            const def = requireAbilityDefinition('Charged');
            state = def.onDamageDealt!(
                state,
                { owner: 'enemy', target: 'enemy' },
                'Attack',
                5,
            );
            // Hero should take 2 retaliation damage
            expect(state.hero.stats.health).toBe(28);
        });

        it('Charged: does NOT fire when hero is the target', () => {
            const def = requireAbilityDefinition('Charged');
            state = def.onDamageDealt!(
                state,
                { owner: 'enemy', target: 'hero' },
                'Attack',
                5,
            );
            // Hero is target but owner is enemy → not "owner takes damage"
            expect(state.hero.stats.health).toBe(30);
        });
    });

    // -------------------------------------------------------------------------
    // onCombatStart() — stat modifiers
    // -------------------------------------------------------------------------

    describe('onCombatStart()', () => {
        it("Cat's speed: adds 1 speedDice to enemy at combat start", () => {
            const def = requireAbilityDefinition("Cat's speed");
            expect(def.onCombatStart).toBeDefined();
            state = def.onCombatStart!(
                state, { owner: 'enemy', target: 'hero' }
            );
            const effect = state.enemies[0].activeEffects.find(
                (e) => e.source === "Cat's speed"
            );
            expect(effect).toBeDefined();
            expect(effect?.stats.speedDice).toBe(1);
        });
    });

    // -------------------------------------------------------------------------
    // Active abilities and target resolution (winner/loser, skipDamage)
    // -------------------------------------------------------------------------
    describe('Active abilities and new effects', () => {
        it('supports active abilities with canActivate and onActivate', () => {
            let activeState = state;
            const canActivateMock = (s: CombatState) => s.phase === 'speed-roll';

            defineAbility({
                name: 'Test Active speed',
                description: 'Add speed',
                canActivate: canActivateMock,
                effect: modifyStat({ speed: 2 }, 'owner', { duration: 1 }),
            });

            const def = requireAbilityDefinition('Test Active speed');
            expect(def.canActivate).toBe(canActivateMock);
            expect(def.onActivate).toBeDefined();

            // Should not activate if canActivate is false
            activeState.phase = 'combat-start';
            let resultState = def.onActivate!(activeState, { owner: 'hero' });
            expect(resultState.hero.activeEffects.length).toBe(0);

            // Should activate if canActivate is true
            activeState.phase = 'speed-roll';
            resultState = def.onActivate!(activeState, { owner: 'hero' });
            expect(resultState.hero.activeEffects[0].stats.speed).toBe(2);
        });

        it('supports resolving winner and loser targets', () => {
            let activeState: CombatState = { ...state, winner: 'hero' as const };

            defineAbility({
                name: 'Test Winner damage',
                description: 'deals damage to loser',
                trigger: onRoundStart(always()),
                effect: dealDamage(3, 'loser'),
            });

            const def = requireAbilityDefinition('Test Winner damage');
            activeState = def.onRoundStart!(activeState, { owner: 'hero' });
            expect(activeState.enemies[0].stats.health).toBe(17);
        });
    });
});
