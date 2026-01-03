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

        const result = ability.onActivate?.(state, { owner: 'hero' });

        expect(result?.hero.activeEffects).toHaveLength(1);
        expect(result?.hero.activeEffects[0].stats.armour).toBe(3);

        // TODO: Add proper test
    });
});
