import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './Backfire';
import { deterministicRoll, INITIAL_STATE, mockDiceRolls } from '../../../tests/testUtils';

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
            winner: 'enemy' as const,
            damage: {
                damageRolls: deterministicRoll([6]),
                modifiers: []
            }
        };

        expect(ability.canActivate?.(state, { owner: 'hero' })).toBe(true);

        // Mock dice for enemy (3 dice) and self (2 dice)
        mockDiceRolls([4, 5, 6, 2, 3]);

        const result = ability.onActivate?.(state, { owner: 'hero' });

        expect(result?.phase).toBe('passive-damage');
        // Check logs or health modifications
        // Backfire deals damage immediately via dealDamage.
        // It skips damage phase.
        // So we verify health or logs.
        const enemyLog = result?.logs.find(l => l.message.includes('Backfire (enemy)'));
        const selfLog = result?.logs.find(l => l.message.includes('Backfire (self)'));

        expect(enemyLog).toBeDefined();
        expect(selfLog).toBeDefined();
    });
});
