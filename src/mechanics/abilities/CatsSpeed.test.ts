import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './CatsSpeed';
import { INITIAL_STATE, heroWithStats, testEquipment } from '../../tests/testUtils';
import { renderHook, act } from '@testing-library/react';
import { useCombat } from '../../hooks/useCombat';
import { Hero } from '../../types/hero';


describe("Cat's Speed", () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition("Cat's Speed")!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should add speed bonus modifier on activation', () => {
        const state = {
            ...INITIAL_STATE,
            phase: 'speed-roll',
        } as any;

        expect(ability.canActivate?.(state, 'hero')).toBe(true);

        const result = ability.onActivate?.(state, 'hero');

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.stats.speed).toBe(1);
        expect(result?.modifications![0].modification.target).toBe('hero');
        expect(result?.modifications![0].duration).toBe(1);
    });

    it('should not activate if not speed-roll phase', () => {
        const state = {
            ...INITIAL_STATE,
            phase: 'damage-roll',
        } as any;

        expect(ability.canActivate?.(state, 'hero')).toBe(false);
        const result = ability.onActivate?.(state, 'hero');
        expect(result).toEqual({});
    });
});
