import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './AvengingSpirit';
import { heroWithStats, INITIAL_STATE } from '../../tests/testUtils';

describe('Avenging Spirit', () => {
    it('should inflict damage back on taking partial damage', () => {
        const ability = getAbilityDefinition('Avenging Spirit');
        const state = {
            ...INITIAL_STATE,
            hero: heroWithStats({ armour: 2 }),
        };
        // Mock damage dealt to hero
        const result = ability?.onDamageDealt?.(state, 'hero', 5);

        expect(result?.damageDealt).toHaveLength(1);
        expect(result?.damageDealt![0]).toEqual({ target: 'enemy', amount: 2, source: 'Avenging Spirit' });
    });
});
