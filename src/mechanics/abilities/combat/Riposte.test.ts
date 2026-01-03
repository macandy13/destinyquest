import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './Riposte';
import { INITIAL_STATE } from '../../../tests/testUtils';

describe('Riposte', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Riposte')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should inflict damage back', () => {
        const state = INITIAL_STATE;
        const result = ability.onDamageDealt?.(state, 'hero', 'hero', 5);

        expect(result?.damageDealt).toHaveLength(1);
        expect(result?.damageDealt![0].amount).toBeGreaterThanOrEqual(1);
    });

    it('should not inflict damage back if not taking damage', () => {
        const state = INITIAL_STATE;
        expect(ability.onDamageDealt?.(state, 'hero', 'enemy', 5)).toEqual({});
        expect(ability.onDamageDealt?.(state, 'hero', 'hero', 0)).toEqual({});
    });
});
