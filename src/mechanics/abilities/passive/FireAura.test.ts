import { describe, it, expect, beforeEach } from 'vitest';
import './FireAura'; // Register ability
import { getAbilityDefinition } from '../../abilityRegistry';
import { INITIAL_STATE, enemyWithStats } from '../../../tests/testUtils';
import { AbilityDefinition } from '../../abilityRegistry';

describe('Fire Aura', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Fire Aura')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should inflict 1 damage to enemy on round end', () => {
        const state = {
            ...INITIAL_STATE,
            enemies: [enemyWithStats({ health: 10 })], activeEnemyIndex: 0
        };

        const updates = ability?.onPassiveAbility?.(state, { owner: 'hero' });

        expect(updates?.enemies[0].stats.health).toBe(9);
        expect(updates?.logs?.[0].message).toContain('Fire Aura dealt 1 damage to Test Enemy');
    });
});
