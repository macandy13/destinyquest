import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './Judgement';
import { enemyWithStats, heroWithStats, INITIAL_STATE } from '../../../tests/testUtils';

describe('Judgement', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Judgement')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should inflict half speed as damage back', () => {
        const state = {
            ...INITIAL_STATE,
            hero: heroWithStats({ speed: 7 }),
            enemy: enemyWithStats({ health: 10 }),
            logs: []
        };
        const result = ability.onDamageDealt?.(state, { owner: 'hero', target: 'hero' }, 'Attack', 5);

        expect(result).toEqual(expect.objectContaining({
            enemy: expect.objectContaining({
                stats: expect.objectContaining({
                    health: 6
                })
            })
        }));
    });
});
