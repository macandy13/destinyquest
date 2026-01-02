import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './ChillTouch';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Chill Touch', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Chill Touch')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should add speed reduction to enemy on activation', () => {
        const state = INITIAL_STATE;
        const result = ability.onActivate?.(state, 'hero');

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.stats.speed).toBe(-2);
        expect(result?.modifications![0].modification.target).toBe('enemy');
        expect(result?.modifications![0].duration).toBe(1);
    });
});
