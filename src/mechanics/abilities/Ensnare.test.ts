import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './Ensnare';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Ensnare', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Ensnare')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should apply Ensnare effect', () => {
        const state = INITIAL_STATE;
        const result = ability.onActivate?.(state);

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.source).toBe('Ensnare');
    });
});
