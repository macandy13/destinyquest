import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './CatsSpeed';
import { INITIAL_STATE, MOCK_HERO } from '../../tests/testUtils';
import { renderHook, act } from '@testing-library/react';
import { useCombat } from '../../hooks/useCombat';
import { Hero } from '../../types/hero';

describe("Cat's Speed", () => {
    it('should add speed bonus modifier on activation', () => {
        const ability = getAbilityDefinition("Cat's Speed");
        const state = { ...INITIAL_STATE, logs: [] };
        const result = ability?.onActivate?.(state);

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.stats.speed).toBe(1);
        expect(result?.modifications![0].modification.target).toBe('hero');
        expect(result?.modifications![0].duration).toBe(1);
    });

    it('should apply Cat\'s Speed via hook (+1 speed for 1 round)', () => {
        const HERO: Hero = {
            ...MOCK_HERO,
            stats: { ...MOCK_HERO.stats, speed: 0 },
            equipment: {
                feet: {
                    name: 'Cat Boots',
                    abilities: ["Cat's Speed"],
                    id: 'cat-boots',
                    type: 'feet' as const,
                    act: 1,
                    book: 'core'
                }
            }
        };

        const { result } = renderHook(() => useCombat(HERO));

        act(() => result.current.startCombat());

        act(() => result.current.activateAbility("Cat's Speed"));

        expect(result.current.combat.modifications).toHaveLength(1);
        expect(result.current.combat.modifications[0].modification.stats.speed).toBe(1);
        expect(result.current.combat.modifications[0].duration).toBe(1);
    });
});
