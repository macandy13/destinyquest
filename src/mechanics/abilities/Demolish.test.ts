import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './Demolish';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Demolish', () => {
    it('should add speed reduction and armour reduction to enemy on activation', () => {
        const ability = getAbilityDefinition('Demolish');
        const state = { ...INITIAL_STATE, logs: [] };
        const result = ability?.onActivate?.(state);

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
