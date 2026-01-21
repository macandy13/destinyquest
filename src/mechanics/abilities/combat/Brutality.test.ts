import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './Brutality';
import { deterministicRoll, INITIAL_STATE, mockDiceRolls } from '../../../tests/testUtils';
import { getActiveEnemy } from '../../../types/combatState';

describe('Brutality', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Brutality')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should stop opponent damage and inflict damage back', () => {
        const state = {
            ...INITIAL_STATE,
            phase: 'damage-roll' as const,
            winner: 'enemy' as const,
            damage: {
                damageRolls: deterministicRoll([5]),
                modifiers: []
            }
        };

        expect(ability.canActivate?.(state, { owner: 'hero' })).toBe(true);

        mockDiceRolls([1, 2]);

        const result = ability.onActivate?.(state, { owner: 'hero' });

        expect(result?.phase).toBe('passive-damage');
        expect(getActiveEnemy(result!).stats.health).toBe(getActiveEnemy(INITIAL_STATE).stats.health - 3);
    });
});
