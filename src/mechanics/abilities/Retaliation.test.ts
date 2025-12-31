import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './Retaliation';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Retaliation', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Retaliation')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should inflict damage back', () => {
        const state = INITIAL_STATE;
        const result = ability.onDamageDealt?.(state, 'hero', 5);

        expect(result?.damageDealt).toHaveLength(1);
        expect(result?.damageDealt![0].amount).toBeGreaterThanOrEqual(1);
    });
});
