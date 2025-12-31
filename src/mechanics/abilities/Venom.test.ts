import { describe, it, expect } from 'vitest';
import { INITIAL_STATE, enemyWithStats } from '../../tests/testUtils';
import { getAbilityDefinition } from '../abilityRegistry';
import { CombatState } from '../../types/combat';

import './Venom';

const INITIAL_STATE_WITH_DAMAGE: CombatState = {
    ...INITIAL_STATE,
    winner: 'hero' as const,
    damageDealt: [{ target: 'enemy', amount: 1, source: 'Attack' }],
};

describe('Venom', () => {
    it('should deal 2 damage by default', () => {
        const def = getAbilityDefinition('Venom');
        const enemy = enemyWithStats({ health: 20 });
        const state = {
            ...INITIAL_STATE_WITH_DAMAGE,
            enemy,
            activeAbilities: [{ name: 'Venom', source: 'Item', used: false, target: 'enemy' as const }]
        };

        const updates = def!.onRoundEnd!(state, 'enemy');

        expect(updates.enemy!.stats.health).toBe(18);
        expect(updates.damageDealt).toEqual(expect.arrayContaining([
            expect.objectContaining({
                amount: 2
            })
        ]));
        expect(updates.activeEffects).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    modification: expect.objectContaining({
                        source: 'Venom',
                        target: 'enemy',
                    })
                })
            ])
        );
    });

    it('should deal 3 damage with Deadly Poisons', () => {
        const def = getAbilityDefinition('Venom');
        const enemy = enemyWithStats({ health: 20 });
        const state = {
            ...INITIAL_STATE_WITH_DAMAGE,
            enemy,
            activeAbilities: [
                { name: 'Venom', source: 'Item', used: false, target: 'enemy' as const },
                { name: 'Deadly Poisons', source: 'Item', used: false, target: 'enemy' as const }
            ]
        };

        const updates = def!.onRoundEnd!(state, 'enemy');

        expect(updates.enemy!.stats.health).toBe(17);
        const damageEntry = updates.damageDealt?.find(d => d.source === 'Venom');
        expect(damageEntry?.amount).toBe(3);
    });

    it('should deal 4 damage with mastery', () => {
        const def = getAbilityDefinition('Venom');
        const enemy = enemyWithStats({ health: 20 });
        const state = {
            ...INITIAL_STATE_WITH_DAMAGE,
            enemy,
            activeAbilities: [
                { name: 'Venom', source: 'Item', used: false, target: 'enemy' as const },
                { name: 'Poison Mastery', source: 'Item', used: false, target: 'enemy' as const }
            ]
        };

        const updates = def!.onRoundEnd!(state, 'enemy');

        expect(updates.enemy!.stats.health).toBe(16);
        const damageEntry = updates.damageDealt?.find(d => d.source === 'Venom');
        expect(damageEntry?.amount).toBe(4);
    });

    it('should not deal damage if damage was only dealt to hero', () => {
        const def = getAbilityDefinition('Venom');
        const enemy = enemyWithStats({ health: 20 });
        const state = {
            ...INITIAL_STATE_WITH_DAMAGE,
            enemy,
            damageDealt: [{ target: 'hero' as const, amount: 1, source: 'Attack' }],
            activeAbilities: [{ name: 'Venom', source: 'Item', used: false, target: 'enemy' as const }]
        };

        const updates = def!.onRoundEnd!(state, 'enemy');
        // Should not have any damage dealt
        expect(updates.damageDealt).toBeUndefined();
    });
});
