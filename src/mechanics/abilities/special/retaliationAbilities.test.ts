import { describe, expect, it, beforeEach } from 'vitest';
import { CombatState, requireAbilityDefinition } from '../../../types/combatState';
import {
    createCombatant,
    MOCK_HERO,
    MOCK_ENEMY,
    INITIAL_STATE
} from '../../../tests/testUtils';
import '../../allAbilities';

describe('Retaliation Abilities', () => {
    let state: CombatState;

    beforeEach(() => {
        state = {
            ...INITIAL_STATE,
            enemy: createCombatant(MOCK_ENEMY),
            hero: createCombatant(MOCK_HERO),
        };
    });

    it('Charged: should deal damage when owner takes damage', () => {
        const def = requireAbilityDefinition('Charged');
        state.hero.stats.health = 30;

        // Hero (attacker) deals damage to enemy (owner of Charged)
        state = def.onDamageDealt!(
            state,
            { owner: 'enemy', target: 'enemy' },
            'Attack',
            5
        );

        // Hero takes 2 retaliation damage
        expect(state.hero.stats.health).toBe(28);
    });
});
