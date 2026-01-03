import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import { INITIAL_STATE, mockDiceRolls } from '../../../tests/testUtils';
import { CombatState } from '../../../types/CombatState';
import './Bolt';

describe('Bolt', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Bolt')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should charge up when activated', () => {
        const state: CombatState = {
            ...INITIAL_STATE,
            phase: 'speed-roll' as const,
            winner: 'hero' as const
        };

        expect(ability.canActivate?.(state, { owner: 'hero' })).toBe(true);

        const result = ability.onActivate?.(state, { owner: 'hero' });

        expect(result?.phase).toBe('passive-damage');
        expect(result?.hero.activeEffects).toHaveLength(1);
        expect(result?.hero.activeEffects[0].source).toBe('Bolt');
    });

    it('should release damage on subsequent onDamageRoll', () => {
        const state: CombatState = {
            ...INITIAL_STATE,
            phase: 'damage-roll' as const,
            winner: 'hero' as const,
            hero: {
                ...INITIAL_STATE.hero,
                activeEffects: [{
                    source: 'Bolt',
                    target: 'hero',
                    stats: {},
                    duration: undefined
                }]
            }
        };

        mockDiceRolls([1, 2, 3]);

        const result = ability.onDamageRoll?.(state, { owner: 'hero' });
        expect(result?.phase).toBe('passive-damage');
        expect(result?.logs.some(l => l.message.includes('Bolt released!'))).toBe(true);
        expect(result?.hero.activeEffects).toHaveLength(0); // Charge removed
    });
});
