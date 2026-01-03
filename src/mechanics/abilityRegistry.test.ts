import { describe, it, expect } from 'vitest';
import { getAbilityDefinition, registerAbility, AbilityDefinition } from './abilityRegistry';
import './allAbilities';


describe('Ability Registry', () => {
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
});


