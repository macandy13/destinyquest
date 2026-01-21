import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './Shock';
import { enemyWithStats, INITIAL_STATE } from '../../../tests/testUtils';

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
            enemies: [enemyWithStats({ armour: 5 })], activeEnemyIndex: 0,
            logs: []
        };
        const result = ability.onDamageDealt?.(state, { owner: 'hero', target: 'enemy' }, 'Attack', 5); // Dealing 5 damage to enemy

        // Shock deals extra damage. Since dealDamage modifies state, we expect state changes.
        // Original health 30. 5 damage dealt. Shock extra = 5/2 = 2. Total damage 7.
        // The ability itself only deals the EXTRA damage (2). The initial 5 was dealt before calling this hook?
        // Wait, onDamageDealt hook is called AFTER damage dealt?
        // Yes, but usually logic is: ability deals EXTRA damage.
        expect(result?.enemies[0].stats.health).toBe(20 - 2); // Initial health 20, deals 2 extra damage
        // dealDamage returns NEW state. Input state had full health (or whatever).
        // If input state passed to onDamageDealt has not yet applied the 5 damage (it's "onDamageDealt", implying it just happened, but state might not reflect it if it's just a notification hook without state chained?)
        // Actually, `CombatEngine` likely chains these.
        // But in this unit test, `state` has full health.
        // So result should have `health - 2`.
        expect(result?.logs.some(l => l.message?.includes('Shock! dealt 2 damage'))).toBe(true);
    });
});
