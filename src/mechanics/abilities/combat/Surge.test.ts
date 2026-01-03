import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './Surge';
import { INITIAL_STATE } from '../../../tests/testUtils';

describe('Surge', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Surge')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should buff magic and debuff speed', () => {
        const state = INITIAL_STATE;
        const result = ability.onActivate?.(state, { owner: 'hero' });

        expect(result?.hero.activeEffects).toHaveLength(2);
        const magicMod = result?.hero.activeEffects.find(e => e.stats.magic === 3);
        const speedMod = result?.hero.activeEffects.find(e => e.stats.speed === -1);

        expect(magicMod).toBeDefined();
        expect(speedMod).toBeDefined();
    });
});
