import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './Shock';
import { enemyWithStats, INITIAL_STATE } from '../../tests/testUtils';

describe('Shock!', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Shock!')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should inflict extra damage for high armour enemy', () => {
        const state = {
            ...INITIAL_STATE,
            enemy: enemyWithStats({ armour: 6 }),
            logs: []
        };
        const result = ability.onDamageDealt?.(state, 'enemy', 5); // Dealing 5 damage to enemy

        expect(result?.damageDealt).toHaveLength(1);
        expect(result?.damageDealt![0].amount).toBe(3); // 6/2 = 3
    });
});
