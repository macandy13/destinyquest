import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../../abilityRegistry';
import './Charm';
import { INITIAL_STATE } from '../../../tests/testUtils';

describe('Charm', () => {
    it('should be registered', () => {
        const def = getAbilityDefinition('Charm');
        expect(def).toBeDefined();
        expect(def?.name).toBe('Charm');
    });

    it('should charm enemy', () => {
        const state = INITIAL_STATE;
        const ability = getAbilityDefinition('Charm')!;
        ability.onActivate?.(state, { ability: { name: 'Charm', owner: 'hero', def: ability, uses: 1 }, owner: 'hero' });
        // TODO: Add expectations
    });
});
