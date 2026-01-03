import { describe, it, expect, beforeEach } from 'vitest';
import { INITIAL_STATE, enemyWithStats } from '../../../tests/testUtils';
import { getAbilityDefinition, AbilityDefinition } from '../../abilityRegistry';
import { CombatState } from '../../../types/combat';
import './DeadlyPoisons';
import './Venom';
import './PoisonMastery';

const DAMAGE_TO_ENEMY = { target: 'enemy' as const, amount: 1, source: 'Attack' };

const VENOM_ABILITY = {
    name: 'Venom',
    source: 'Item',
    used: false,
    owner: 'hero' as const,
    def: getAbilityDefinition('Venom')!
};
const DEADLY_POISONS_ABILITY = {
    name: 'Deadly Poisons',
    source: 'Item',
    used: false,
    owner: 'hero' as const,
    def: getAbilityDefinition('Deadly Poisons')!
}
const POISON_MASTERY = {
    name: 'Poison Mastery',
    source: 'Item',
    used: false,
    owner: 'hero' as const,
    def: getAbilityDefinition('Poison Mastery')!
}

describe('Venom', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Venom')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should deal 2 damage by default', () => {
        const enemy = enemyWithStats({ health: 20 });
        const state: CombatState = {
            ...INITIAL_STATE,
            winner: 'hero' as const,
            damageDealt: [DAMAGE_TO_ENEMY],
            enemy,
            activeAbilities: [VENOM_ABILITY]
        };

        const updates = ability.onRoundEnd!(state, 'hero');

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
        const enemy = enemyWithStats({ health: 20 });
        const state: CombatState = {
            ...INITIAL_STATE,
            winner: 'hero' as const,
            damageDealt: [DAMAGE_TO_ENEMY],
            enemy,
            activeAbilities: [
                VENOM_ABILITY,
                DEADLY_POISONS_ABILITY
            ]
        };

        const updates = ability.onRoundEnd!(state, 'hero');

        expect(updates.enemy!.stats.health).toBe(17);
        const damageEntry = updates.damageDealt?.find(d => d.source === 'Venom');
        expect(damageEntry?.amount).toBe(3);
    });

    it('should deal 4 damage with Poison Mastery', () => {
        const state = {
            ...INITIAL_STATE,
            winner: 'hero' as const,
            damageDealt: [DAMAGE_TO_ENEMY],
            enemy: enemyWithStats({ health: 20 }),
            activeAbilities: [
                VENOM_ABILITY,
                DEADLY_POISONS_ABILITY,
                POISON_MASTERY,
            ]
        };

        const updates = ability.onRoundEnd!(state, 'hero');

        expect(updates.enemy!.stats.health).toBe(16);
        const damageEntry = updates.damageDealt?.find(d => d.source === 'Venom');
        expect(damageEntry?.amount).toBe(4);
    });

    it('should not deal damage if damage was only dealt to hero', () => {
        const enemy = enemyWithStats({ health: 20 });
        const state = {
            ...INITIAL_STATE,
            winner: 'enemy' as const,
            damageDealt: [{ target: 'hero' as const, amount: 1, source: 'Attack' }],
            enemy,
            activeAbilities: [VENOM_ABILITY]
        };

        const updates = ability.onRoundEnd!(state, 'hero');
        // Should not have any damage dealt
        expect(updates.damageDealt).toBeUndefined();
    });
});
