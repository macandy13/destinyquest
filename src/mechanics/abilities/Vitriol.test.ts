import { describe, it, expect } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './Vitriol';
import { INITIAL_STATE, enemyWithStats, heroWithStats } from '../../tests/testUtils';

describe('Vitriol', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Vitriol')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should inflict 1 damage to both enemy and hero on round end', () => {
        const state = {
            ...INITIAL_STATE,
            enemy: enemyWithStats({ health: 10 }),
            hero: heroWithStats({ health: 20 })
        };

        const updates = ability?.onRoundEnd?.(state, 'hero');

        expect(updates?.enemy?.stats.health).toBe(9);
        expect(updates?.hero?.stats.health).toBe(19);
        const logMessages = updates?.logs?.map(l => l.message).join(' ');
        expect(logMessages).toContain('Vitriol dealt 1 damage to Test Hero');
        expect(logMessages).toContain('Vitriol dealt 1 damage to Test Enemy');
    });
});
