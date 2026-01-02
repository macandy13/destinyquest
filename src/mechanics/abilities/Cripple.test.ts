import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './Cripple';
import { INITIAL_STATE } from '../../tests/testUtils';

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
            damageDealt: [{ target: 'enemy' as const, amount: 5, source: 'Melee' }]
        };

        expect(ability.canActivate?.(state, 'hero')).toBe(true);

        const result = ability.onActivate?.(state, 'hero');

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.stats.speed).toBe(-1);
        expect(result?.modifications![0].duration).toBe(3);
    });

    it('should not activate if no damage dealt to enemy', () => {
        const state = {
            ...INITIAL_STATE,
            logs: [],
            damageDealt: []
        };

        expect(ability.canActivate?.(state, 'hero')).toBe(false);
        const result = ability.onActivate?.(state, 'hero');
        expect(result).toBeNull();
    });
});
