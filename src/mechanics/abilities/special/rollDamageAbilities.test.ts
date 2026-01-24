import { describe, expect, it, beforeEach } from 'vitest';
import { CombatState, requireAbilityDefinition } from '../../../types/combatState';
import {
    createCombatant,
    MOCK_HERO,
    MOCK_ENEMY,
    INITIAL_STATE
} from '../../../tests/testUtils';
import { deterministicRoll } from '../../../types/dice';
import '../../allAbilities';

describe('Roll-Based Damage Abilities', () => {
    let state: CombatState;

    beforeEach(() => {
        state = {
            ...INITIAL_STATE,
            enemies: [createCombatant(MOCK_ENEMY)], activeEnemyIndex: 0,
            hero: createCombatant(MOCK_HERO),
        };
    });

    it('By hook: should deal 2 damage per 1 rolled', () => {
        const def = requireAbilityDefinition('By hook');
        state.hero.stats.health = 30;
        state.heroSpeedRolls = deterministicRoll([1, 1, 5]);

        state = def.onSpeedRoll!(state, { owner: 'enemy' });

        // 2 ones = 4 damage
        expect(state.hero.stats.health).toBe(26);
    });

    it('Whiplash: should deal 2 damage per 6 rolled by enemy', () => {
        const def = requireAbilityDefinition('Whiplash');
        state.hero.stats.health = 30;
        state.enemySpeedRolls = deterministicRoll([6, 6, 3]);

        state = def.onSpeedRoll!(state, { owner: 'enemy' });

        // 2 sixes = 4 damage
        expect(state.hero.stats.health).toBe(26);
    });

    it('Crone\'s dagger: should deal 1 extra damage if enemy rolls a 6', () => {
        const def = requireAbilityDefinition('Crone\'s dagger');
        state.hero.stats.health = 30;
        state.winner = 'enemy';
        state.damage = {
            damageRolls: deterministicRoll([6, 2]),
            modifiers: []
        };

        state = def.onDamageRoll!(state, { owner: 'enemy' });

        // It deals damage directly via dealDamage which reduces health
        // 1 six = 1 damage
        expect(state.hero.stats.health).toBe(29);
    });
});
