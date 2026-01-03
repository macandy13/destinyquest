import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './Cleave';
import { INITIAL_STATE } from '../../../tests/testUtils';

describe('Cleave', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Cleave')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should inflict damage to enemy', () => {
        const state = {
            ...INITIAL_STATE,
            phase: 'damage-roll' as const,
            winner: 'hero' as const,
        };

        expect(ability.canActivate?.(state, { owner: 'hero' })).toBe(true);

        const result = ability.onActivate?.(state, { owner: 'hero' });

        expect(result?.phase).toBe('passive-damage');
        expect(result?.logs.some(l => l.message?.includes('Cleave'))).toBe(true);
    });
});
