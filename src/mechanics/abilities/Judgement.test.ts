import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './Judgement';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Judgement', () => {
    it('should inflict half speed as damage back', () => {
        const ability = getAbilityDefinition('Judgement');
        const state = {
            ...INITIAL_STATE,
            hero: { ...INITIAL_STATE.hero!, stats: { ...INITIAL_STATE.hero!.stats, speed: 7 } },
            logs: []
        };
        const result = ability?.onDamageDealt?.(state, 'hero', 5);

        expect(result?.damageDealt).toHaveLength(1);
        expect(result?.damageDealt![0].amount).toBe(4); // ceil(7/2) = 4
    });
});
