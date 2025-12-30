import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './Corruption';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Corruption', () => {
    it('should apply corruption buff on activate', () => {
        const ability = getAbilityDefinition('Corruption');
        const state = {
            ...INITIAL_STATE,
            logs: [],
            damageDealt: [{ target: 'enemy', amount: 5, source: 'Melee' }]
        };
        const result = ability?.onActivate?.(state);

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.stats.brawn).toBe(-2);
        expect(result?.modifications![0].modification.target).toBe('enemy');
    });
});
