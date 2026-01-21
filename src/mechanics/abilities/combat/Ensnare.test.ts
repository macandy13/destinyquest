import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './Ensnare';
import { INITIAL_STATE } from '../../../tests/testUtils';
import { getActiveEnemy } from '../../../types/combatState';

describe('Ensnare', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Ensnare')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should apply Ensnare effect', () => {
        const enemy = {
            ...getActiveEnemy(INITIAL_STATE),
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
            enemies: [enemy]
        };
        const result = ability.onActivate?.(state, { owner: 'hero' });

        expect(getActiveEnemy(result!).activeEffects).toHaveLength(1);
        expect(getActiveEnemy(result!).activeEffects[0].source).toBe('Ensnare');
    });
});
