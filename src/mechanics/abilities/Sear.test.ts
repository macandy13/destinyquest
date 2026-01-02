import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './Sear';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Sear', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Sear')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should add 1 per damage die', () => {
        const rolls = [{ value: 1, isRerolled: false }, { value: 6, isRerolled: false }];
        const bonus = ability.onDamageCalculate?.(INITIAL_STATE, 'hero', { total: 7, rolls });

        expect(bonus).toBe(2);
    });

    it('should return 0 if no dice', () => {
        const bonus = ability.onDamageCalculate?.(INITIAL_STATE, 'hero', { total: 0, rolls: [] });
        expect(bonus).toBe(0);
    });
});
