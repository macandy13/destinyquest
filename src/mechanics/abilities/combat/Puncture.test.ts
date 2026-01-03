import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './Puncture';
import { INITIAL_STATE } from '../../../tests/testUtils';
describe('Puncture', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Puncture')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should inflict 2 dice damage and reduce armour', () => {
        const state = {
            ...INITIAL_STATE,
            phase: 'damage-roll' as const,
            winner: 'hero' as const,
            enemy: { ...INITIAL_STATE.enemy!, stats: { ...INITIAL_STATE.enemy!.stats, armour: 5 } }
        };

        expect(ability.canActivate?.(state, { owner: 'hero' })).toBe(true);

        const result = ability.onActivate?.(state, { owner: 'hero' });

        expect(result?.phase).toBe('passive-damage');

        // Puncture deals damage (2d6). Min 2.
        expect(result?.logs.some(l => l.message?.includes('Puncture'))).toBe(true);

        // Check armour reduction. 
        // Effects are applied. calculateEffectiveStats handles it, but here we check if effect was appended or applied?
        // Returning CombatState with modified stats?
        // `createStatModification` returns `Effect`. `appendEffect` adds to `activeEffects`.
        // `INITIAL_STATE.enemy.activeEffects` should have it.
        // Wait, `dealDamage` returns state. `state.enemy` might be a new reference.
        // `appendEffect` returns state with new enemy ref.
        expect(result?.enemy?.activeEffects.some(e => e.source === 'Puncture' && e.stats.armour === -1)).toBe(true);
    });
});
