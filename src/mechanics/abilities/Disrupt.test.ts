import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './Disrupt';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Disrupt', () => {
    it('should apply magic reduction on activate', () => {
        const ability = getAbilityDefinition('Disrupt');
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
        const result = ability?.onActivate?.(state);

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.stats.magic).toBe(-3);
        expect(result?.modifications![0].modification.target).toBe('enemy');
    });
});
