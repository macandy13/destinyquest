import { describe, it, expect, beforeEach } from 'vitest';
import { INITIAL_STATE, enemyWithStats } from '../../../tests/testUtils';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import { CombatState } from '../../../types/combat';
import './Bleed';

describe('Bleed', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Bleed')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should deal 1 damage at round end', () => {
        const state: CombatState = {
            ...INITIAL_STATE,
            enemy: enemyWithStats({ health: 20 }),
            winner: 'hero' as const,
            damageDealt: [{ target: 'enemy' as const, amount: 5, source: 'Attack' }]
        };

        const updates = ability.onRoundEnd!(state, 'hero' as const);

        expect(updates.enemy!.stats.health).toBe(19);
        expect(updates.activeEffects).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    modification: expect.objectContaining({
                        source: 'Bleed',
                        target: 'enemy',
                    })
                })
            ])
        );
    });
});
