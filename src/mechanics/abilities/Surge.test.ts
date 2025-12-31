import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './Surge';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Surge', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Surge')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should buff magic and debuff speed', () => {
        const state = INITIAL_STATE;
        const result = ability.onActivate?.(state);

        expect(result?.modifications).toHaveLength(2);
        expect(result?.modifications![0].modification.stats.magic).toBe(3);
        expect(result?.modifications![1].modification.stats.speed).toBe(-1);
    });
});
