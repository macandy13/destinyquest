import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './SwampLegs';
import { INITIAL_STATE } from '../../../tests/testUtils';
import { getActiveEnemy } from '../../../types/combatState';

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

        expect(getActiveEnemy(result!).activeEffects).toHaveLength(1);
        expect(getActiveEnemy(result!).activeEffects[0].stats.speed).toBe(-1);
        expect(getActiveEnemy(result!).activeEffects[0].target).toBe('enemy');
        expect(getActiveEnemy(result!).activeEffects[0].duration).toBe(1);
    });
});
