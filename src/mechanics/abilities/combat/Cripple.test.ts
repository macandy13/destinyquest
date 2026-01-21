import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './Cripple';
import { INITIAL_STATE } from '../../../tests/testUtils';
import { getActiveEnemy } from '../../../types/combatState';

describe('Cripple', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Cripple')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should apply speed reduction on activate when damage is dealt', () => {
        const state = {
            ...INITIAL_STATE,
            logs: [],
            winner: 'hero' as const,
            damageDealt: [{ target: 'enemy' as const, amount: 5, source: 'Melee' }]
        };

        const result = ability.onActivate?.(state, { owner: 'hero' });

        expect(result).toBeDefined();
        expect(getActiveEnemy(result!).activeEffects).toHaveLength(1);
        expect(getActiveEnemy(result!).activeEffects[0].stats.speed).toBe(-1);
        expect(getActiveEnemy(result!).activeEffects[0].duration).toBe(3);
    });

    it('should not activate if no damage dealt to enemy', () => {
        const state = {
            ...INITIAL_STATE,
            logs: [],
            damageDealt: []
        };

        expect(ability.canActivate?.(state, { owner: 'hero' })).toBe(false);
    });
});
