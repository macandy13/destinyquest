import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './Hamstring';
import { INITIAL_STATE } from '../../tests/testUtils';
import { CombatState } from '../../types/combat';

describe('Hamstring', () => {
    it('should apply Hamstring effect', () => {
        const ability = getAbilityDefinition('Hamstring');
        const state: CombatState = {
            ...INITIAL_STATE,
            winner: 'enemy'
        };
        const result = ability?.onActivate?.(state);

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.source).toBe('Hamstring');
    });
});
