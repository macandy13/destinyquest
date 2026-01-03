import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './Demolish';
import { INITIAL_STATE } from '../../../tests/testUtils';

describe('Demolish', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Demolish')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should add speed reduction and armour reduction to enemy on activation', () => {
        const state = INITIAL_STATE;
        const result = ability.onActivate?.(state, 'hero');

        expect(result?.modifications).toHaveLength(2);

        const speedMod = result?.modifications?.find(m => m.modification.stats.speed === -1);
        expect(speedMod).toBeDefined();
        expect(speedMod?.modification.target).toBe('enemy');
        expect(speedMod?.duration).toBe(1);

        const armourMod = result?.modifications?.find(m => m.modification.stats.armour === -1);
        expect(armourMod).toBeDefined();
        expect(armourMod?.modification.target).toBe('enemy');
        expect(armourMod?.duration).toBeUndefined(); // Remainder of combat
    });
});
