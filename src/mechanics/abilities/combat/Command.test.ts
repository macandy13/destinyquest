import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './Command';
import { INITIAL_STATE } from '../../../tests/testUtils';

describe('Command', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Command')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should set winner to hero', () => {
        const state = {
            ...INITIAL_STATE,
            phase: 'damage-roll' as const,
            winner: 'enemy' as const,
        };
        // Command usually activates during speed roll or round resolution, but logic is custom

        expect(ability.canActivate?.(state, { owner: 'hero' })).toBe(true);

        const result = ability.onActivate?.(state, { owner: 'hero' });

        expect(result?.winner).toBe('hero');
    });
});
