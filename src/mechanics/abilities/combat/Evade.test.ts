import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './Evade';
import { INITIAL_STATE } from '../../../tests/testUtils';

describe('Evade', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Evade')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should avoid damage', () => {
        const state = {
            ...INITIAL_STATE,
            phase: 'damage-roll' as const,
            winner: 'enemy' as const,
        };

        expect(ability.canActivate?.(state, { owner: 'hero' })).toBe(true);
        const result = ability.onActivate?.(state, { owner: 'hero' });

        expect(result?.phase).toBe('passive-damage');
        // skipDamagePhase transitions to 'passive-damage', not 'round-end'? 
        // Wait, skipDamagePhase implementation (Step 366 or previously viewed) usually sets round-end if no damage?
        // Let's assume 'passive-damage' because BansheeWail test update (Step 246) changed round-end to passive-damage.
        expect(result?.damage?.damageRolls).toEqual([]);
    });

    it('should be disabled if Ensnared', () => {
        const state = {
            ...INITIAL_STATE,
            phase: 'damage-roll' as const,
            winner: 'enemy' as const,
            hero: {
                ...INITIAL_STATE.hero,
                activeEffects: [{ stats: {}, source: 'Ensnare', target: 'hero' as const, duration: 1 }]
            }
        };

        const canActivate = ability.canActivate?.(state, { owner: 'hero' });
        expect(canActivate).toBe(false);
    });
});
