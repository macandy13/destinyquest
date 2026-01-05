import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../../abilityRegistry';
import { INITIAL_STATE } from '../../../tests/testUtils';
import { CombatState } from '../../../types/combatState';
import './Dodge';

describe('Dodge', () => {
    it('should avoid damage', () => {
        const ability = getAbilityDefinition('Dodge');
        const state = { ...INITIAL_STATE, phase: 'damage-roll' as const, winner: 'enemy' as const, logs: [] };
        const result = ability?.onActivate?.(state, { owner: 'hero' });

        expect(result?.phase).toBe('passive-damage');
        expect(result?.damage?.damageRolls).toEqual([]);
    });

    it('should be disabled if Ensnared', () => {
        const ability = getAbilityDefinition('Dodge');
        const state: CombatState = {
            ...INITIAL_STATE,
            phase: 'damage-roll' as const,
            winner: 'enemy' as const,
            logs: [],
            hero: {
                ...INITIAL_STATE.hero!,
                activeEffects: [{
                    source: 'Ensnare',
                    target: 'hero',
                    stats: {},
                    duration: 1
                }]
            }
        };

        const canActivate = ability?.canActivate?.(state, { owner: 'hero' });
        expect(canActivate).toBe(false);
    });
});
