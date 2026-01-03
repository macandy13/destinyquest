import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './ThornArmour';
import { INITIAL_STATE } from '../../../tests/testUtils';

describe('Thorn Armour', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Thorn Armour')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should buff armour and inflict damage', () => {
        const state = INITIAL_STATE;
        const result = ability.onActivate?.(state, { owner: 'hero' });

        expect(result?.hero.activeEffects).toHaveLength(1);
        expect(result?.hero.activeEffects[0].stats.armour).toBe(3);
        // Damage is inflicted directly via dealDamage. Check logs.
        const log = result?.logs.find(l => l.message.includes('inflicted'));
        expect(log).toBeDefined();
    });
});
