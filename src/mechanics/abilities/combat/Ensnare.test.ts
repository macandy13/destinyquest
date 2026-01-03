import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './Ensnare';
import { INITIAL_STATE } from '../../../tests/testUtils';

describe('Ensnare', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Ensnare')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should apply Ensnare effect', () => {
        const state = {
            ...INITIAL_STATE,
            activeAbilities: [
                {
                    name: 'Dodge',
                    owner: 'enemy' as const,
                    source: 'Test',
                    used: false,
                    def: {} as any
                }]
        };
        const result = ability.onActivate?.(state, 'hero');

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.source).toBe('Ensnare');
    });
});
