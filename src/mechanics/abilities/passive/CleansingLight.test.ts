import { describe, it, expect, beforeEach } from 'vitest';
import { CombatState, Combatant } from '../../../types/CombatState';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import { INITIAL_STATE, enemyWithStats, heroWithStats, } from '../../../tests/testUtils';
import { Hero } from '../../../types/Hero';
import { Enemy } from '../../../types/Character';
import './CleansingLight'; // Register ability

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
        if (!ability || !ability.onPassiveAbility) throw new Error('Ability not found or missing onPassiveAbility');

        // Hero is missing 10 health (20/30)
        const result = ability.onPassiveAbility!(state, { owner: 'hero' });

        expect(result.hero).toBeDefined();
        expect(result.hero!.stats.health).toBe(22); // 20 + 2
        expect(result.logs).toBeDefined();
        expect(result.logs![0].message).toContain('Cleansing Light healed 2 health');
    });

    it('should not heal beyond max health', () => {
        if (!ability || !ability.onPassiveAbility) throw new Error('Ability not found or missing onPassiveAbility');

        // Set hero health to near max
        state.hero!.stats.health = 29;

        const result = ability.onPassiveAbility!(state, { owner: 'hero' });
        expect(result.hero).toBeDefined();
        expect(result.hero!.stats.health).toBe(30); // Capped at 30
        expect(result.logs![0].message).toContain('Cleansing Light healed 1 health');
    });

    it('should do nothing if health is full', () => {
        if (!ability || !ability.onPassiveAbility) throw new Error('Ability not found or missing onPassiveAbility');

        state.hero!.stats.health = 30;

        const result = ability.onPassiveAbility!(state, { owner: 'hero' });
        expect(result).toBe(state);
    });
});
