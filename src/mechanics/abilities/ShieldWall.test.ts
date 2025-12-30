import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './ShieldWall';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Shield Wall', () => {
    it('should double armour and inflict damage', () => {
        const ability = getAbilityDefinition('Shield Wall');
        const state = {
            ...INITIAL_STATE,
            hero: { ...INITIAL_STATE.hero!, stats: { ...INITIAL_STATE.hero!.stats, armour: 3 } },
            logs: []
        };
        const result = ability?.onActivate?.(state);

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.stats.armour).toBe(3); // +3 to make it 6 (doubled)
        expect(result?.damageDealt).toHaveLength(1);
        expect(result?.damageDealt![0].amount).toBeGreaterThanOrEqual(1);
    });
});
