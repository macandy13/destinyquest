import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './Disrupt';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Disrupt', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Disrupt')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should apply magic reduction on activate if damage dealt', () => {
        const state = {
            ...INITIAL_STATE,
            damageDealt: [
                {
                    source: 'Attack',
                    target: 'enemy' as const,
                    amount: 1
                }
            ],
            round: 1
        };

        expect(ability.canActivate?.(state, 'hero')).toBe(true);

        const result = ability.onActivate?.(state, 'hero');

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.stats.magic).toBe(-3);
        expect(result?.modifications![0].modification.target).toBe('enemy');
    });

    it('should not activate if no damage dealt', () => {
        const state = {
            ...INITIAL_STATE,
            damageDealt: [],
            round: 1
        };

        expect(ability.canActivate?.(state, 'hero')).toBe(false);
        const result = ability.onActivate?.(state, 'hero');
        expect(result).toEqual({});
    });
});
