import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './Courage';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Courage', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Courage')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should add speed bonus modifier on activation', () => {
        const state = { ...INITIAL_STATE, logs: [] };

        // Courage is always active in theory unless constrained, but factory usually doesn't add restriction unless specified
        // Let's just check onActivate
        const result = ability.onActivate?.(state, 'hero');

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.stats.speed).toBe(4);
        expect(result?.modifications![0].modification.target).toBe('hero');
        expect(result?.modifications![0].duration).toBe(1);
    });
});
