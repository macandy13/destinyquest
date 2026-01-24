import { describe, expect, it, beforeEach } from 'vitest';
import { CombatState, requireAbilityDefinition } from '../../../types/combatState';
import {
    createCombatant,
    MOCK_HERO,
    MOCK_ENEMY,
    INITIAL_STATE
} from '../../../tests/testUtils';
import '../../allAbilities';
import { calculateEffectiveStats } from '../../../mechanics/CombatEngine';

describe('Stat Modifier Abilities', () => {
    let state: CombatState;

    beforeEach(() => {
        state = {
            ...INITIAL_STATE,
            enemies: [createCombatant(MOCK_ENEMY)], activeEnemyIndex: 0,
            hero: createCombatant(MOCK_HERO),
        };
    });

    it('Avian\'s aid: should add 2 to damage score', () => {
        const def = requireAbilityDefinition('Avian\'s aid');
        // Apply the ability
        state = def.onCombatStart!(state, { owner: 'hero' });

        // Check if effect is applied
        const stats = calculateEffectiveStats(state);
        expect(stats.hero.damageModifier).toBe(2);
    });


    it('Caaleb\'s Shield: should increase armour by 2', () => {
        const def = requireAbilityDefinition('Caaleb\'s Shield');
        state = def.onCombatStart!(state, { owner: 'hero' });

        const stats = calculateEffectiveStats(state);
        expect(stats.hero.armour).toBe(state.hero.stats.armour + 2);
    });

    it('Holy Water: should add 2 to damage modifier', () => {
        const def = requireAbilityDefinition('Holy Water');
        state = def.onCombatStart!(state, { owner: 'hero' });
        const stats = calculateEffectiveStats(state);
        expect(stats.hero.damageModifier).toBe(2);
    });
});
