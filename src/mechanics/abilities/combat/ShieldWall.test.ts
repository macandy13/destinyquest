import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './ShieldWall';
import { heroWithStats, INITIAL_STATE } from '../../../tests/testUtils';

describe('Shield Wall', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Shield Wall')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should double armour and inflict damage', () => {
        const state = {
            ...INITIAL_STATE,
            hero: heroWithStats({ armour: 3 })
        };

        const result = ability.onActivate?.(state, 'hero');

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.stats.armour).toBe(3); // +3 to make it 6 (doubled)
        expect(result?.damageDealt).toHaveLength(1);
        expect(result?.damageDealt![0].amount).toBeGreaterThanOrEqual(1);
    });
});
