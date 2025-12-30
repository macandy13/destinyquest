import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './Shock';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Shock!', () => {
    it('should inflict extra damage for high armour enemy', () => {
        const ability = getAbilityDefinition('Shock!');
        const state = {
            ...INITIAL_STATE,
            enemy: { ...INITIAL_STATE.enemy!, stats: { ...INITIAL_STATE.enemy!.stats, armour: 6 } },
            logs: []
        };
        const result = ability?.onDamageDealt?.(state, 'enemy', 5); // Dealing 5 damage to enemy

        expect(result?.damageDealt).toHaveLength(1);
        expect(result?.damageDealt![0].amount).toBe(3); // 6/2 = 3
    });
});
