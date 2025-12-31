import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './ThornArmour';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Thorn Armour', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Thorn Armour')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should buff armour and inflict damage', () => {
        const state = INITIAL_STATE;
        const result = ability.onActivate?.(state);

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.stats.armour).toBe(3);
        expect(result?.damageDealt).toHaveLength(1);
        expect(result?.damageDealt![0].amount).toBeGreaterThanOrEqual(1);
    });
});
