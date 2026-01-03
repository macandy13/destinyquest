import { describe, it, expect } from 'vitest';

import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import { INITIAL_STATE } from '../../../tests/testUtils';

import './Charge';

describe('Charge', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Charge')!;
        expect(def).toBeDefined();
        ability = def;
    })

    it('should not increase speed by 2', () => {
        const combatState = { ...INITIAL_STATE, round: 1 };
        expect(ability.canActivate?.(combatState, 'hero')).toBe(true);

        const result = ability.onActivate?.(combatState, 'hero');
        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.stats.speed).toBe(2);
        expect(result?.modifications![0].duration).toBe(1);
    });

    it('should not increase speed by 2', () => {
        const combatState = { ...INITIAL_STATE, round: 2 };
        expect(ability.canActivate?.(combatState, 'hero')).toBe(false);

        const result = ability.onActivate?.(combatState, 'hero');
        expect(result).toEqual({});
    });

});
