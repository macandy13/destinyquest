import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './Haunt';
import { INITIAL_STATE } from '../../tests/testUtils';
import { CombatState } from '../../types/combat';

describe('Haunt', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Haunt')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should summon spirit', () => {
        const state = INITIAL_STATE;
        const result = ability.onActivate?.(state, 'hero');

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.source).toBe('Haunt Spirit');
    });

    it('should inflict damage at round end if spirit active', () => {
        const state: CombatState = {
            ...INITIAL_STATE,
            activeEffects: [{
                modification: {
                    stats: {},
                    source: 'Haunt Spirit',
                    target: 'enemy'
                }, id: 'haunt-1'
            }],
        };
        const result = ability.onRoundEnd?.(state, 'hero');

        expect(result?.damageDealt).toHaveLength(1);
        expect(result?.damageDealt![0].amount).toBe(2);
    });

    it('should dispel on double roll', () => {
        const state: CombatState = {
            ...INITIAL_STATE,
            activeEffects: [{
                modification: {
                    stats: {},
                    source: 'Haunt Spirit',
                    target: 'enemy'
                },
                id: 'haunt-1'
            }],
        };

        const rolls = [{ value: 3, isRerolled: false }, { value: 3, isRerolled: false }];
        const result = ability.onSpeedRoll?.(state, 'hero', rolls);

        expect(result?.activeEffects).toEqual([]);
    });
});
