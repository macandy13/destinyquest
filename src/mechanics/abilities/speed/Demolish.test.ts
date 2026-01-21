import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './Demolish';
import { INITIAL_STATE } from '../../../tests/testUtils';
import { getActiveEnemy } from '../../../types/combatState';

describe('Demolish', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Demolish')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should add speed reduction and armour reduction to enemy on activation', () => {
        const state = INITIAL_STATE;
        const result = ability.onActivate?.(state, { owner: 'hero' });

        expect(getActiveEnemy(result!).activeEffects).toHaveLength(2);

        const speedMod = getActiveEnemy(result!).activeEffects?.find(m => m.stats.speedDice === -1);
        expect(speedMod).toBeDefined();
        expect(speedMod?.target).toBe('enemy');
        expect(speedMod?.duration).toBe(1);

        const armourMod = getActiveEnemy(result!).activeEffects?.find(m => m.stats.armour === -1);
        expect(armourMod).toBeDefined();
        expect(armourMod?.target).toBe('enemy');
        expect(armourMod?.duration).toBeUndefined(); // Remainder of combat
    });
});
