import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './Hamstring';
import { INITIAL_STATE } from '../../tests/testUtils';
import { CombatState } from '../../types/combat';

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
        const result = ability.onActivate?.(state);

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.source).toBe('Hamstring');
    });
});
