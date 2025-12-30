import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './Cripple';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Cripple', () => {
    it('should apply speed reduction on activate', () => {
        const ability = getAbilityDefinition('Cripple');
        const state = {
            ...INITIAL_STATE,
            logs: [],
            damageDealt: [{ target: 'enemy' as const, amount: 5, source: 'Melee' }]
        };
        const result = ability?.onActivate?.(state);

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.stats.speed).toBe(-1);
        expect(result?.modifications![0].duration).toBe(3);
    });
});
