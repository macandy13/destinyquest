import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './SwampLegs';
import { INITIAL_STATE } from '../../../tests/testUtils';

describe('Swamp Legs', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Swamp Legs')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should add speed reduction to enemy on activation', () => {
        const state = INITIAL_STATE;
        const result = ability.onActivate?.(state, { owner: 'hero' });

        expect(result?.enemy.activeEffects).toHaveLength(1);
        expect(result?.enemy.activeEffects[0].stats.speed).toBe(-1);
        expect(result?.enemy.activeEffects[0].target).toBe('enemy');
        expect(result?.enemy.activeEffects[0].duration).toBe(1);
    });
});
