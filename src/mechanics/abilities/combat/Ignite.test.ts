import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './Ignite';
import { INITIAL_STATE } from '../../../tests/testUtils';

describe('Ignite', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Ignite')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should inflict damage and apply burn', () => {
        const state = {
            ...INITIAL_STATE,
            phase: 'damage-roll' as const,
            winner: 'hero' as const,
        };

        expect(ability.canActivate?.(state, { owner: 'hero' })).toBe(true);

        const result = ability.onActivate?.(state, { owner: 'hero' });

        expect(result?.phase).toBe('apply-damage');
        // Check logs for damage
        expect(result?.logs.some(l => l.message?.includes('Ignite dealt'))).toBe(true);
        // Check for burn effect
        expect(result?.enemy.activeEffects.some(e => e.source === 'Ignite')).toBe(true);
    });
});
