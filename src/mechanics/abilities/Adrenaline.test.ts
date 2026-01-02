import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './Adrenaline';
import { INITIAL_STATE, heroWithStats, testEquipment } from '../../tests/testUtils';
import { renderHook, act } from '@testing-library/react';
import { useCombat } from '../../hooks/useCombat';
import { Hero } from '../../types/hero';

describe('Adrenaline', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Adrenaline')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should add speed bonus modifier on activation', () => {
        const state = INITIAL_STATE;
        const result = ability.onActivate?.(state, 'hero');

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.stats.speed).toBe(2);
        expect(result?.modifications![0].duration).toBe(2);
    });
});
