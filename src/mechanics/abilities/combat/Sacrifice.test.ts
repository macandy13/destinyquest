import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './Sacrifice';
import { INITIAL_STATE } from '../../../tests/testUtils';
import { CombatState } from '../../../types/combatState';

describe('Sacrifice', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Sacrifice')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should absorb damage and remove shades', () => {
        const state: CombatState = {
            ...INITIAL_STATE,
            phase: 'damage-roll' as const,
            winner: 'enemy' as const,
            hero: {
                ...INITIAL_STATE.hero,
                activeEffects: [{
                    stats: {},
                    source: 'Shades',
                    target: 'hero',
                    duration: undefined
                }]
            },
        };

        expect(ability.canActivate?.(state, { owner: 'hero' })).toBe(true);

        const result = ability.onActivate?.(state, { owner: 'hero' });

        expect(result?.phase).toBe('passive-damage');
        // Clears damage (depends on implementation: result.damage.damageRolls = []?)
        expect(result?.damage?.damageRolls).toEqual([]);
        expect(result?.hero.activeEffects).toEqual([]); // Shades removed
    });
});
