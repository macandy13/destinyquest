import { describe, it, expect, beforeEach } from 'vitest';
import { INITIAL_STATE } from '../../../tests/testUtils';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './Webbed';

describe('Webbed', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Webbed')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should reduce enemy speed dice by 1', () => {
        const state = INITIAL_STATE;

        const updates = ability.onActivate?.(state, { owner: 'hero' });

        expect(updates!.enemy.activeEffects[0].stats.speedDice).toBe(-1);
        expect(updates!.enemy.activeEffects[0].target).toBe('enemy');
    });
});
