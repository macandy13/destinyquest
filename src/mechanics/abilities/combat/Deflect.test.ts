import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './Deflect';
import { INITIAL_STATE, mockDiceRolls } from '../../../tests/testUtils';

describe('Deflect', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Deflect')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should stop opponent damage and inflict damage back', () => {
        const state = {
            ...INITIAL_STATE,
            phase: 'damage-roll' as const,
            winner: 'enemy' as const,
            logs: []
        };

        expect(ability.canActivate?.(state, { owner: 'hero' })).toBe(true);

        mockDiceRolls([1, 2]);

        const result = ability.onActivate?.(state, { owner: 'hero' });

        expect(result?.phase).toBe('passive-damage');
        expect(result?.enemy.stats.health).toBe(INITIAL_STATE.enemy.stats.health - 3);
    });
});
