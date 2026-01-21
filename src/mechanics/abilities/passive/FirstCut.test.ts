import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../../abilityRegistry';
import './FirstCut';
import { INITIAL_STATE, enemyWithStats } from '../../../tests/testUtils';
import { AbilityDefinition } from '../../abilityRegistry';

describe('First Cut', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('First Cut')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should inflict 1 damage to enemy on combat start', () => {
        const state = {
            ...INITIAL_STATE,
            enemies: [enemyWithStats({ health: 10 })], activeEnemyIndex: 0
        };

        const updates = ability?.onCombatStart?.(state, { owner: 'hero' });

        expect(updates?.enemies[0].stats.health).toBe(9);
        expect(updates?.logs?.[0].message).toContain('First Cut dealt 1 damage');
    });
});
