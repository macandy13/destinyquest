import { describe, it, expect, beforeEach } from 'vitest';
import { INITIAL_STATE } from '../../tests/testUtils';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './Sidestep';

describe('Sidestep', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Sidestep')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should boost armour by 200 on activation', () => {
        const state = { ...INITIAL_STATE };
        const updates = ability.onActivate?.(state);

        expect(updates!.modifications![0].modification.stats.armour).toBe(200);
        expect(updates!.modifications![0].duration).toBe(1);
    });
});
