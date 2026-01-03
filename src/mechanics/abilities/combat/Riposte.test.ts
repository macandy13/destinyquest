import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './Riposte';
import { INITIAL_STATE } from '../../../tests/testUtils';

describe('Riposte', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Riposte')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should inflict damage back', () => {
        const state = INITIAL_STATE;
        const result = ability.onDamageDealt?.(state, { owner: 'hero', target: 'hero' }, 'Attack', 5);

        // Should return a modified state (not undefined/null)
        expect(result).toBeDefined();
        // Should contain logs indicating Riposte used
        expect(result?.logs.some(l => l.message?.includes('Riposte'))).toBe(true);
    });

    it('should not inflict damage back if not taking damage', () => {
        const state = INITIAL_STATE;
        // owner != target => attacking someone else? No, Riposte triggers when *taking* damage (owner == target).
        // If owner != target, it means owner is dealing damage (presumably). Riposte description: "When taking health damage".
        // If owner is hero, target is enemy -> Hero hits enemy. Riposte (owned by hero) should NOT trigger? 
        // Logic in Riposte.ts: `if (owner !== target ...) return state;`
        // So ability owner (hero) must be the target (hero taking damage).

        const res1 = ability.onDamageDealt?.(state, { owner: 'hero', target: 'enemy' }, 'Attack', 5);
        expect(res1).toBe(state); // Should return original state unmodified

        const res2 = ability.onDamageDealt?.(state, { owner: 'hero', target: 'hero' }, 'Attack', 0);
        expect(res2).toBe(state); // No damage taken
    });
});
