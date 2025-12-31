import { describe, it, expect } from 'vitest';

import { getAbilityDefinition } from '../abilityRegistry';
import { INITIAL_STATE } from '../../tests/testUtils';
import { CombatState } from '../../types/combat';

import './Overload';

describe('Overload', () => {
    it('should add extra damage die', () => {
        const ability = getAbilityDefinition('Overload');
        const state: CombatState = {
            ...INITIAL_STATE,
            phase: 'damage-roll',
            winner: 'hero'
        };
        const result = ability?.onActivate?.(state);

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.stats.damageDice).toBe(1);
    });
});
