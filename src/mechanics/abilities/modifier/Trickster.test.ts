import { beforeEach, describe, expect, it } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import { createTestState, deterministicRoll } from '../../../tests/testUtils';
import './Trickster';

describe('Trickster', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Trickster')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('cannot activate outside of speed-roll phase', () => {
        const state = createTestState({
            phase: 'combat-start',
            heroSpeedRolls: deterministicRoll([2, 5]),
            enemySpeedRolls: deterministicRoll([3, 6])
        });

        expect(ability.canActivate?.(state, { owner: 'hero' })).toBe(false);
    });

    it('can activate during speed-roll when a beneficial swap exists', () => {
        const state = createTestState({
            phase: 'speed-roll',
            heroSpeedRolls: deterministicRoll([2, 5]),
            enemySpeedRolls: deterministicRoll([3, 6])
        });

        expect(ability.canActivate?.(state, { owner: 'hero' })).toBe(true);
    });

    it('does not activate if no beneficial swap exists', () => {
        const state = createTestState({
            phase: 'speed-roll',
            heroSpeedRolls: deterministicRoll([6, 6]),
            enemySpeedRolls: deterministicRoll([1, 2])
        });

        expect(ability.canActivate?.(state, { owner: 'hero' })).toBe(false);
    });

    it('swaps lowest hero die with highest enemy die on activate', () => {
        const state = createTestState({
            phase: 'speed-roll',
            heroSpeedRolls: deterministicRoll([2, 5]),
            enemySpeedRolls: deterministicRoll([3, 6])
        });

        const updated = ability.onActivate!(state, {
            owner: 'hero',
            ability: {
                name: 'Trickster',
                owner: 'hero',
                def: ability,
                uses: 1
            }
        });

        // Hero: [2,5] -> lowest(2) becomes 6, so [6,5]
        // Enemy: [3,6] -> highest(6) becomes 2, so [3,2]
        expect(updated.heroSpeedRolls!.map(d => d.value)).toEqual([6, 5]);
        expect(updated.enemySpeedRolls!.map(d => d.value)).toEqual([3, 2]);
    });
});

