import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './Pound';
import { INITIAL_STATE } from '../../../tests/testUtils';

describe('Pound', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Pound')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should apply damage buff and self speed debuff', () => {
        const state = INITIAL_STATE;
        const result = ability.onActivate?.(state, { owner: 'hero' });

        expect(result?.hero.activeEffects).toHaveLength(2);
        // Effects might be in any order if appended sequentially.
        const damageMod = result?.hero.activeEffects.find(e => e.stats.damageModifier === 3);
        const speedMod = result?.hero.activeEffects.find(e => e.stats.speed === -1);

        expect(damageMod).toBeDefined();
        expect(speedMod).toBeDefined();
    });
});
