import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './Judgement';
import { heroWithStats, INITIAL_STATE } from '../../tests/testUtils';

describe('Judgement', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Judgement')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should inflict half speed as damage back', () => {
        const state = {
            ...INITIAL_STATE,
            hero: heroWithStats({ speed: 7 }),
            logs: []
        };
        const result = ability.onDamageDealt?.(state, 'hero', 5);

        expect(result?.damageDealt).toHaveLength(1);
        expect(result?.damageDealt![0].amount).toBe(4); // ceil(7/2) = 4
    });
});
