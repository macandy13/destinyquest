import { describe, it, expect, beforeEach } from 'vitest';
import { CombatState, Enemy } from '../../types/combat';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './CleansingLight'; // Register ability
import { INITIAL_STATE, enemyWithStats, heroWithStats, } from '../../tests/testUtils';
import { Combatant } from '../../types/combatant';
import { Hero } from '../../types/hero';

describe('Cleansing Light', () => {
    let hero: Combatant<Hero>;
    let enemy: Combatant<Enemy>;
    let state: CombatState;
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Cleansing Light')!;
        expect(def).toBeDefined();
        ability = def;

        hero = heroWithStats({ health: 20, maxHealth: 30 });
        enemy = enemyWithStats({
            maxHealth: 50,
        });
        state = {
            ...INITIAL_STATE,
            hero, enemy,
        } as CombatState;
    });

    it('should heal the hero at the end of the round', () => {
        const ability = getAbilityDefinition('Cleansing Light');
        if (!ability || !ability.onRoundEnd) throw new Error('Ability not found or missing onRoundEnd');

        // Hero is missing 10 health (20/30)
        const result = ability.onRoundEnd(state, 'hero');

        expect(result.hero).toBeDefined();
        expect(result.hero!.stats.health).toBe(22); // 20 + 2
        expect(result.logs).toBeDefined();
        expect(result.logs![0].message).toContain('Cleansing Light healed 2 health');
    });

    it('should not heal beyond max health', () => {
        const ability = getAbilityDefinition('Cleansing Light');
        if (!ability || !ability.onRoundEnd) throw new Error('Ability not found or missing onRoundEnd');

        // Set hero health to near max
        state.hero!.stats.health = 29;

        const result = ability.onRoundEnd(state, 'hero');
        expect(result.hero).toBeDefined();
        expect(result.hero!.stats.health).toBe(30); // Capped at 30
        expect(result.logs![0].message).toContain('Cleansing Light healed 1 health');
    });

    it('should do nothing if health is full', () => {
        const ability = getAbilityDefinition('Cleansing Light');
        if (!ability || !ability.onRoundEnd) throw new Error('Ability not found or missing onRoundEnd');

        state.hero!.stats.health = 30;

        const result = ability.onRoundEnd(state, 'hero');
        expect(result).toEqual({});
    });
});
