import { describe, it, expect, beforeEach } from 'vitest';
import { INITIAL_STATE, enemyWithStats } from '../../../tests/testUtils';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import { CombatState } from '../../../types/combatState';
import './Bleed';

describe('Bleed', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Bleed')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should deal 1 damage at round end', () => {
        let state: CombatState = {
            ...INITIAL_STATE,
            enemy: enemyWithStats({ health: 20 }),
            winner: 'hero' as const,
            damageDealt: [{ target: 'enemy' as const, amount: 5, source: 'Attack' }]
        };

        state = ability.onDamageDealt!(state, { owner: 'hero', target: 'enemy' as const }, 'Attack', 5);
        expect(state.enemy!.activeEffects).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    source: 'Bleed',
                    target: 'enemy',
                })
            ])
        );

        state = ability.onPassiveAbility!(state, { owner: 'hero' as const });
        expect(state.damageDealt).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    source: 'Bleed',
                    target: 'enemy',
                    amount: 1,
                })
            ])
        );
    });
});
