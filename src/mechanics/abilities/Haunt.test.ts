import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './Haunt';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Haunt', () => {
    it('should summon spirit', () => {
        const ability = getAbilityDefinition('Haunt');
        const state = { ...INITIAL_STATE, logs: [] };
        const result = ability?.onActivate?.(state);

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.source).toBe('Haunt Spirit');
    });

    it('should inflict damage at round end if spirit active', () => {
        const ability = getAbilityDefinition('Haunt');
        const state = {
            ...INITIAL_STATE,
            activeEffects: [{ modification: { source: 'Haunt Spirit', target: 'enemy' }, id: 'haunt-1' }],
            logs: []
        };
        const result = ability?.onRoundEnd?.(state, 'enemy');

        expect(result?.damageDealt).toHaveLength(1);
        expect(result?.damageDealt![0].amount).toBe(2);
    });

    it('should dispel on double roll', () => {
        const ability = getAbilityDefinition('Haunt');
        const state = {
            ...INITIAL_STATE,
            activeEffects: [{ modification: { source: 'Haunt Spirit', target: 'enemy' }, id: 'haunt-1' }],
            logs: []
        };

        const rolls = [{ value: 3, isRerolled: false }, { value: 3, isRerolled: false }];
        const result = ability?.onSpeedRoll?.(state, rolls);

        expect(result?.activeEffects).toEqual([]);
    });
});
