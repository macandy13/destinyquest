import { describe, it, expect, beforeEach } from 'vitest';
import { INITIAL_STATE, enemyWithStats } from '../../tests/testUtils';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './Piercing';

describe('Piercing', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Piercing')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should reduce enemy armour to 0', () => {
        const enemy = enemyWithStats({ armour: 5 });
        const state = { ...INITIAL_STATE, enemy };

        const updates = ability.onActivate?.(state);

        expect(updates!.modifications![0].modification.stats.armour).toBe(-5);
        expect(updates!.modifications![0].modification.target).toBe('enemy');
    });
});
