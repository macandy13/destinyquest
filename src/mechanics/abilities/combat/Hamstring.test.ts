import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './Hamstring';
import { INITIAL_STATE } from '../../../tests/testUtils';
import { CombatState, getActiveEnemy } from '../../../types/combatState';

describe('Hamstring', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Hamstring')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should apply Hamstring effect', () => {
        const state: CombatState = {
            ...INITIAL_STATE,
            winner: 'enemy'
        };
        const result = ability.onActivate?.(state, { owner: 'hero' });

        expect(result).toBeDefined();
        // Hamstring returns appended effect.
        expect(getActiveEnemy(result!).activeEffects).toEqual(expect.arrayContaining([expect.objectContaining({ source: 'Hamstring' })]));
    });
});
