import { describe, expect, it, beforeEach } from 'vitest';
import { CombatState, requireAbilityDefinition } from '../../../types/combatState';
import {
    createCombatant,
    MOCK_HERO,
    MOCK_ENEMY,
    INITIAL_STATE
} from '../../../tests/testUtils';
import '../../allAbilities';

describe('Healing Abilities', () => {
    let state: CombatState;

    beforeEach(() => {
        state = {
            ...INITIAL_STATE,
            enemy: createCombatant(MOCK_ENEMY),
            hero: createCombatant(MOCK_HERO),
        };
    });

    it('Regeneration: should heal 2 at round start', () => {
        const def = requireAbilityDefinition('Regeneration');
        state.enemy.stats.health = 20;
        state.enemy.stats.maxHealth = 30;

        state = def.onRoundStart!(state, { owner: 'enemy' });

        expect(state.enemy.stats.health).toBe(22);
    });

    it('Regeneration: should not heal when at 0 health', () => {
        const def = requireAbilityDefinition('Regeneration');
        state.enemy.stats.health = 0;
        state.enemy.stats.maxHealth = 30;

        state = def.onRoundStart!(state, { owner: 'enemy' });

        expect(state.enemy.stats.health).toBe(0);
    });

    it('Healing touch: should heal 2 at round end (passive)', () => {
        const def = requireAbilityDefinition('Healing touch');
        state.enemy.stats.health = 20;
        state.enemy.stats.maxHealth = 30;

        state = def.onPassiveAbility!(state, { owner: 'enemy' });

        expect(state.enemy.stats.health).toBe(22);
    });
});
