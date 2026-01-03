import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import { INITIAL_STATE, testEquipment } from '../../../tests/testUtils';
import { CombatState } from '../../../types/CombatState';
import './Execution';

const TEST_STATE: CombatState = {
    ...INITIAL_STATE,
    phase: 'round-start',
};

describe('Execution', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Execution')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should reduce enemy health to zero if conditions are met', () => {
        const state = TEST_STATE;
        state.hero!.stats.speed = 5;
        state.enemy!.stats.health = 5;
        state.hero!.original.equipment.mainHand = testEquipment({ name: 'sword' });

        expect(ability.canActivate?.(state, { owner: 'hero' })).toBe(true);

        const result = ability.onActivate!(state, { owner: 'hero' });
        expect(result.logs?.[0].message).toContain('Execution dealt 5 damage');
        expect(result.enemy!.stats.health).toBe(0);
    });

    it('should fail if enemy health is greater than hero speed', () => {
        const state = TEST_STATE;
        state.hero!.stats.speed = 4;
        state.enemy!.stats.health = 6;
        state.hero!.original.equipment.mainHand = testEquipment({ name: 'sword' });

        expect(ability.canActivate?.(state, { owner: 'hero' })).toBe(false);

        const result = ability.onActivate!(state, { owner: 'hero' });
        expect(result).toBe(state);
    });

    it('should fail if hero has now sword', () => {
        const state = TEST_STATE;
        state.hero!.stats.speed = 5;
        state.enemy!.stats.health = 5;
        state.hero!.original.equipment.mainHand = testEquipment({ name: 'axe' });

        expect(ability.canActivate?.(state, { owner: 'hero' })).toBe(false);

        const result = ability.onActivate!(state, { owner: 'hero' });
        expect(result).toBe(state);
    });
});
