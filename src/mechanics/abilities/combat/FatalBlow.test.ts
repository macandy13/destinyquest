import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './FatalBlow';
import { INITIAL_STATE } from '../../../tests/testUtils';

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

        expect(result?.enemy.activeEffects).toHaveLength(1);
        expect(result?.enemy.activeEffects[0].source).toBe('Fatal Blow');
    });
});
