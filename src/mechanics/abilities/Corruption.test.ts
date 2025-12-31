import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './Corruption';
import { INITIAL_STATE } from '../../tests/testUtils';
import { CombatState } from '../../types/combat';

describe('Corruption', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Corruption')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should apply corruption buff on activate if damage dealt', () => {
        const state: CombatState = {
            ...INITIAL_STATE,
            damageDealt: [{ target: 'enemy', amount: 5, source: 'Melee' }]
        };

        expect(ability.canActivate?.(state)).toBe(true);

        const result = ability.onActivate?.(state);

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.stats.brawn).toBe(-2);
        expect(result?.modifications![0].modification.target).toBe('enemy');
    });

    it('should not activate if no damage dealt', () => {
        const state: CombatState = {
            ...INITIAL_STATE,
            damageDealt: []
        };

        expect(ability.canActivate?.(state)).toBe(false);
        const result = ability.onActivate?.(state);
        expect(result).toBeNull();
    });
});
