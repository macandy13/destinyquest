import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './FatalBlow';
import { INITIAL_STATE } from '../../../tests/testUtils';
import { getActiveEnemy } from '../../../types/combatState';

describe('Fatal Blow', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Fatal Blow')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should apply modifier on activate', () => {
        const state = INITIAL_STATE;
        const result = ability.onActivate?.(state, { owner: 'hero' });

        expect(getActiveEnemy(result!).activeEffects).toHaveLength(1);
        expect(getActiveEnemy(result!).activeEffects[0].source).toBe('Fatal Blow');
    });
});
