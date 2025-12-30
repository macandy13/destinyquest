import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './Backfire';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Backfire', () => {
    it('should replace damage roll with specific damage', () => {
        const ability = getAbilityDefinition('Backfire');
        const state = { ...INITIAL_STATE, phase: 'damage-roll' as const, winner: 'hero' as const, logs: [] };
        const result = ability?.onActivate?.(state);

        expect(result?.phase).toBe('round-end');
        expect(result?.damageDealt).toHaveLength(2); // One for enemy, one for hero
        const enemyDmg = result?.damageDealt?.find(d => d.target === 'enemy');
        const heroDmg = result?.damageDealt?.find(d => d.target === 'hero');

        // TODO: Make testing dice rolls easier
        expect(enemyDmg?.amount).toBeGreaterThanOrEqual(3); // 3 dice
        expect(heroDmg?.amount).toBeGreaterThanOrEqual(2); // 2 dice
    });
});
