import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './Heal';
import { INITIAL_STATE, heroWithStats } from '../../tests/testUtils';

describe('Heal', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Heal')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should restore 4 health up to max', () => {
        const damagedState = {
            ...INITIAL_STATE,
            hero: heroWithStats({ health: 10 })
        };

        const updates = ability.onActivate?.(damagedState, 'hero');
        expect(updates?.hero?.stats.health).toBe(14);
    });

    it('should execute clamping to max health', () => {
        const mildDamageState = {
            ...INITIAL_STATE,
            hero: heroWithStats({ health: 29 })
        };

        const updates = ability.onActivate?.(mildDamageState, 'hero');
        expect(updates?.hero?.stats.health).toBe(30);
    });

    it('should return false for canActivate if health is full', () => {
        const fullHealthState = {
            ...INITIAL_STATE,
            hero: heroWithStats({ health: 30 })
        };
        expect(ability.canActivate?.(fullHealthState, 'hero')).toBe(false);
    });

    it('should return true for canActivate if health is not full', () => {
        const damagedState = {
            ...INITIAL_STATE,
            hero: heroWithStats({ health: 10 })
        };
        expect(ability.canActivate?.(damagedState, 'hero')).toBe(true);
    });
});
