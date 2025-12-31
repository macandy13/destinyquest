import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './Immobilise';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Immobilise', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Immobilise')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should add speed reduction to enemy on activation', () => {
        const state = { ...INITIAL_STATE, logs: [] };
        const result = ability.onActivate?.(state);

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.stats.speed).toBe(-1);
        expect(result?.modifications![0].modification.target).toBe('enemy');
        expect(result?.modifications![0].duration).toBe(1);
    });
});
