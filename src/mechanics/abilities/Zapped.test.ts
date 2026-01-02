import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './Zapped';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Zapped!', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Zapped!')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should reduce enemy stats on activation', () => {
        const state = INITIAL_STATE;
        const result = ability.onActivate?.(state, 'hero');

        expect(result?.modifications).toHaveLength(1);
        const mod = result?.modifications![0];
        expect(mod?.modification.stats.speed).toBe(-3);
        expect(mod?.modification.stats.brawn).toBe(-3);
        expect(mod?.modification.stats.magic).toBe(-3);
        expect(mod?.modification.target).toBe('enemy');
        expect(mod?.duration).toBe(1);
    });
});
