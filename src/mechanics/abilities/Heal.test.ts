import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './Heal';
import { INITIAL_STATE, MOCK_HERO } from '../../tests/testUtils';

describe('Heal', () => {
    it('should restore 4 health up to max', () => {
        const heal = getAbilityDefinition('Heal');
        const damagedState = {
            ...INITIAL_STATE,
            hero: { ...MOCK_HERO, stats: { ...MOCK_HERO.stats, health: 10 } }
        };

        const updates = heal?.onActivate?.(damagedState);
        expect(updates?.hero?.stats.health).toBe(14);
    });

    it('should execute clamping to max health', () => {
        const heal = getAbilityDefinition('Heal');
        const mildDamageState = {
            ...INITIAL_STATE,
            hero: { ...MOCK_HERO, stats: { ...MOCK_HERO.stats, health: 29 } }
        };

        const updates = heal?.onActivate?.(mildDamageState);
        expect(updates?.hero?.stats.health).toBe(30);
    });

    it('should return false for canActivate if health is full', () => {
        const heal = getAbilityDefinition('Heal');
        const fullHealthState = {
            ...INITIAL_STATE,
            hero: { ...MOCK_HERO, stats: { ...MOCK_HERO.stats, health: 30 } }
        };
        expect(heal?.canActivate?.(fullHealthState)).toBe(false);
    });

    it('should return true for canActivate if health is not full', () => {
        const heal = getAbilityDefinition('Heal');
        const damagedState = {
            ...INITIAL_STATE,
            hero: { ...MOCK_HERO, stats: { ...MOCK_HERO.stats, health: 10 } }
        };
        expect(heal?.canActivate?.(damagedState)).toBe(true);
    });
});
