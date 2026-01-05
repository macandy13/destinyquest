import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import { INITIAL_STATE } from '../../../tests/testUtils';
import './Consume';

describe('Consume', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Consume')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should reduce opponent speed rolls', () => {
        const state = {
            ...INITIAL_STATE,
            phase: 'speed-roll' as const,
            // Setup opponent rolls
            enemySpeedRolls: [
                { value: 4, isRerolled: false },
                { value: 1, isRerolled: false }
            ]
        };

        // Activate as hero targetting enemy (via Consume logic which targets "opponent")
        const result = ability.onSpeedRoll?.(state, { owner: 'hero' });

        expect(result).toBeDefined();
        expect(result?.enemySpeedRolls).toEqual([
            { value: 3, isRerolled: true },
            { value: 1, isRerolled: true } // Min 1
        ]);
        // Hero rolls shoud be untouched
        expect(result?.heroSpeedRolls).toBeUndefined();
    });
});
