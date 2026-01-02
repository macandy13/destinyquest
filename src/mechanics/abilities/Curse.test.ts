import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './Curse';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Curse', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Curse')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should add speed reduction to enemy on activation', () => {
        const state = INITIAL_STATE;
        const result = ability.onActivate?.(state, 'hero');

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.stats.speed).toBe(-1);
        expect(result?.modifications![0].modification.target).toBe('enemy');
        expect(result?.modifications![0].duration).toBe(1);
    });
});
