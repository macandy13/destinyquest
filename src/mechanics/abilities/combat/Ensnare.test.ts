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
        const enemy = {
            ...INITIAL_STATE.enemy,
            activeAbilities: new Map([['Dodge', {
                name: 'Dodge',
                type: 'combat',
                description: 'test',
                canActivate: () => true,
                owner: 'enemy' as const,
                def: {} as any
            }]])
        };
        const state = {
            ...INITIAL_STATE,
            enemy
        };
        const result = ability.onActivate?.(state, { owner: 'hero' });

        expect(result?.enemy.activeEffects).toHaveLength(1);
        expect(result?.enemy.activeEffects[0].source).toBe('Ensnare');
    });
});
