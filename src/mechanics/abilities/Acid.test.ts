import { describe, it, expect, beforeEach } from 'vitest';
import { Hero } from '../../types/hero';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './Acid';
import { INITIAL_STATE, heroWithStats, testEquipment } from '../../tests/testUtils';
import { renderHook, act } from '@testing-library/react';
import { useCombat } from '../../hooks/useCombat';

describe('Acid', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Acid')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should add 1 damage per die rolled', () => {
        const rolls = [{ value: 1, isRerolled: false }, { value: 4, isRerolled: false }, { value: 6, isRerolled: false }];
        const bonus = ability.onDamageCalculate?.(INITIAL_STATE, 'hero', 'hero', { total: 10, rolls });
        expect(bonus).toBe(3);
    });
});
