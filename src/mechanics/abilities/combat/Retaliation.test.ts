import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './Retaliation';
import { enemyWithStats, INITIAL_STATE, mockDiceRolls } from '../../../tests/testUtils';
import { getActiveEnemy } from '../../../types/combatState';

describe('Retaliation', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Retaliation')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should inflict damage back', () => {
        const state = {
            ...INITIAL_STATE,
            enemies: [enemyWithStats({ health: 10 })], activeEnemyIndex: 0,
            logs: []
        };

        mockDiceRolls([3]);

        const result = ability.onDamageDealt?.(state, { owner: 'hero', target: 'hero' }, 'Attack', 5);

        // Result is the state. DealDamage modifies logs and stats.
        // It updates `enemy.stats.health`.
        expect(getActiveEnemy(result!).stats.health).toBeLessThan(10);
        // It also adds a log.
        expect(result?.logs.some(l => l.message?.includes('Retaliation'))).toBe(true);
    });
});
