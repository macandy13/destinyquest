import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './Haste';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Haste', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Haste')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should add speed bonus modifier on activation', () => {
        const state = { ...INITIAL_STATE, logs: [] };
        const result = ability.onActivate?.(state, 'hero');

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.stats.speed).toBe(1);
        expect(result?.modifications![0].modification.target).toBe('hero');
        expect(result?.modifications![0].duration).toBe(1);
    });
});
