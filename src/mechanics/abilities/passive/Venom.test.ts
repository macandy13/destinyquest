import { describe, it, expect, beforeEach } from 'vitest';
import { INITIAL_STATE, enemyWithStats } from '../../../tests/testUtils';
import { getAbilityDefinition, AbilityDefinition } from '../../abilityRegistry';
import { CombatState } from '../../../types/CombatState';
import './DeadlyPoisons';
import './Venom';
import './PoisonMastery';

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
            damage: { damageRolls: [], modifiers: [] },
            hero: {
                ...INITIAL_STATE.hero!,
                activeAbilities: new Map([['Venom', VENOM_ABILITY]])
            },
            enemy: {
                ...enemy,
                activeEffects: [{ source: 'Venom', target: 'enemy', stats: {} }]
            }
        };

        const updates = ability.onPassiveAbility!(state, { owner: 'hero' });


        expect(updates.bonusDamage).toEqual(expect.arrayContaining([
            expect.objectContaining({
                amount: 2,
                source: 'Venom'
            })
        ]));
    });

    it('should deal 3 damage with Deadly Poisons', () => {
        const enemy = enemyWithStats({ health: 20 });
        const state: CombatState = {
            ...INITIAL_STATE,
            winner: 'hero' as const,
            damage: { damageRolls: [], modifiers: [] },
            hero: {
                ...INITIAL_STATE.hero!,
                activeAbilities: new Map([
                    ['Venom', VENOM_ABILITY],
                    ['Deadly Poisons', DEADLY_POISONS_ABILITY]
                ])
            },
            enemy: {
                ...enemy,
                activeEffects: [{ source: 'Venom', target: 'enemy', stats: {} }]
            }
        };

        const updates = ability.onPassiveAbility!(state, { owner: 'hero' });


        const damageEntry = updates.bonusDamage?.find(d => d.source === 'Venom');
        expect(damageEntry?.amount).toBe(3);
    });

    it('should deal 4 damage with Poison Mastery', () => {
        const state: CombatState = {
            ...INITIAL_STATE,
            winner: 'hero' as const,
            damage: { damageRolls: [], modifiers: [] },
            hero: {
                ...INITIAL_STATE.hero!,
                activeAbilities: new Map([
                    ['Venom', VENOM_ABILITY],
                    ['Deadly Poisons', DEADLY_POISONS_ABILITY],
                    ['Poison Mastery', POISON_MASTERY]
                ])
            },
            enemy: {
                ...enemyWithStats({ health: 20 }),
                activeEffects: [{ source: 'Venom', target: 'enemy', stats: {} }]
            }
        };

        const updates = ability.onPassiveAbility!(state, { owner: 'hero' });


        const damageEntry = updates.bonusDamage?.find(d => d.source === 'Venom');
        expect(damageEntry?.amount).toBe(4);
    });

    it('should not deal damage if no damage was dealt', () => {
        // If we want to test that it DOES NOT apply if venom NOT present:
        const enemy = enemyWithStats({ health: 20 });
        const state = {
            ...INITIAL_STATE,
            winner: null,
            hero: {
                ...INITIAL_STATE.hero!,
            },
            enemy, // No active effects
        };

        const updates = ability.onPassiveAbility!(state, { owner: 'hero' });
        // Should not have any damage dealt
        expect(updates.bonusDamage).toEqual([]);
    });
});
