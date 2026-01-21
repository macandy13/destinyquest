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
            enemies: [createCombatant(MOCK_ENEMY)], activeEnemyIndex: 0,
            hero: createCombatant(MOCK_HERO),
        };
    });

    it('Regeneration: should heal 2 at round start', () => {
        const def = requireAbilityDefinition('Regeneration');
        state.enemies[0].stats.health = 20;
        state.enemies[0].stats.maxHealth = 30;

        state = def.onRoundStart!(state, { owner: 'enemy' });

        expect(state.enemies[0].stats.health).toBe(22);
    });

    it('Regeneration: should not heal when at 0 health', () => {
        const def = requireAbilityDefinition('Regeneration');
        state.enemies[0].stats.health = 0;
        state.enemies[0].stats.maxHealth = 30;

        state = def.onRoundStart!(state, { owner: 'enemy' });

        expect(state.enemies[0].stats.health).toBe(0);
    });

    it('Healing touch: should heal 2 at round end (passive)', () => {
        const def = requireAbilityDefinition('Healing touch');
        state.enemies[0].stats.health = 20;
        state.enemies[0].stats.maxHealth = 30;

        state = def.onPassiveAbility!(state, { owner: 'enemy' });

        expect(state.enemies[0].stats.health).toBe(22);
    });
});
