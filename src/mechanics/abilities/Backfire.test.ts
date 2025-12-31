import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './Backfire';
import { INITIAL_STATE } from '../../tests/testUtils';

describe('Backfire', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Backfire')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should replace damage roll with specific damage', () => {
        const state = {
            ...INITIAL_STATE,
            phase: 'damage-roll' as const,
            winner: 'hero' as const,
        };

        expect(ability.canActivate?.(state)).toBe(true);

        const result = ability.onActivate?.(state);

        expect(result?.phase).toBe('round-end');
        expect(result?.damageDealt).toHaveLength(2); // One for enemy, one for hero
        const enemyDmg = result?.damageDealt?.find(d => d.target === 'enemy');
        const heroDmg = result?.damageDealt?.find(d => d.target === 'hero');

        expect(enemyDmg?.amount).toBeGreaterThanOrEqual(3); // 3 dice
        expect(heroDmg?.amount).toBeGreaterThanOrEqual(2); // 2 dice
    });
});
