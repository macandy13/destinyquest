import { describe, it, expect } from 'vitest';
import { getAbilityDefinition, registerAbility, AbilityDefinition, toCanonicalName } from './abilityRegistry';
import './allAbilities';

describe('Ability Registry', () => {
    describe('toCanonicalName', () => {
        it('should return canonical name regardless of input case', () => {
            expect(toCanonicalName('Fireball')).toBe('fireball');
            expect(toCanonicalName('fireball')).toBe('fireball');
            expect(toCanonicalName('FIREBALL')).toBe('fireball');
            expect(toCanonicalName('Fireballs and ICE')).toBe('fireballs-and-ice');
        });
    });

    describe('getAbilityDefinition', () => {
        it('should retrieve registered abilities', () => {
            const acid = getAbilityDefinition('Acid');
            expect(acid).toBeDefined();
            expect(acid?.name).toBe('Acid');
        });

        it('should return undefined for unknown abilities', () => {
            const unknown = getAbilityDefinition('UnknownAbility');
            expect(unknown).toBeUndefined();
        });

        it('should allow registering new abilities', () => {
            const newAbility: AbilityDefinition = {
                name: 'TestAbility',
                type: 'passive',
                description: 'Test Description',
                onCombatStart: (state) => ({ ...state, logs: [] })
            };
            registerAbility(newAbility);
            expect(getAbilityDefinition('TestAbility')).toBe(newAbility);
        });

        it('should find definition with case insensitive name', () => {
            registerAbility({
                name: 'Fireball',
                type: 'combat',
                description: 'A ball of fire',
            });
            const def = getAbilityDefinition('fireball');
            expect(def).toBeDefined();
            expect(def?.name).toBe('Fireball');
        });
    });
});


