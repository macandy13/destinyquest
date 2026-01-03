import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './Impale';
import { INITIAL_STATE } from '../../../tests/testUtils';

describe('Impale', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Impale')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should apply damage buff and speed debuff', () => {
        const state = { ...INITIAL_STATE, logs: [] };
        const result = ability.onActivate?.(state, 'hero');

        expect(result?.modifications).toHaveLength(2);
        expect(result?.modifications).toContainEqual(expect.objectContaining({
            modification: expect.objectContaining({ stats: expect.objectContaining({ damageModifier: 3 }) })
        }));
        expect(result?.modifications).toContainEqual(expect.objectContaining({
            modification: expect.objectContaining({ stats: expect.objectContaining({ speed: -1 }) })
        }));
    });
});
