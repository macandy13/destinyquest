import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './Windwalker';
import { heroWithStats, INITIAL_STATE } from '../../../tests/testUtils';
import { deterministicRoll } from '../../../types/dice';

describe('Windwalker', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Windwalker')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should use speed dice for damage', () => {
        const state = {
            ...INITIAL_STATE,
            hero: heroWithStats({ speed: 5 }),
            heroSpeedRolls: deterministicRoll([6, 5]),
            damage: { damageRolls: deterministicRoll([1]), modifiers: [] },
            phase: 'damage-roll' as const,
            winner: 'hero' as const,
            logs: []
        };
        const result = ability.onActivate!(state, { owner: 'hero' });

        expect(result?.damage?.damageRolls).toEqual(state.heroSpeedRolls);
    });
});
