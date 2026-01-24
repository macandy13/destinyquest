import { MOCK_ENEMY, applyDamage, startCombat } from './CombatEngine';
import { Hero } from '../types/hero';
import { registerAbility } from './abilityRegistry';
import { deterministicRoll } from '../types/dice';

describe('CombatEngine Phase Skipping', () => {
    // Setup a hero without passive abilities
    const simpleHero: Hero = {
        name: 'SimpleHero',
        type: 'hero',
        path: 'Warrior',
        career: 'Test Career',
        money: 0,
        stats: { speed: 10, brawn: 10, magic: 10, armour: 0, health: 100, maxHealth: 100 },
        backpack: [null, null, null, null, null],
        equipment: {}
    };

    it('should skip apply-damage phase when no passive abilities exist', () => {
        let state = startCombat(simpleHero, [MOCK_ENEMY]);

        // Mock a state ready for applying damage
        state = {
            ...state,
            winner: 'hero',
            damage: {
                damageRolls: deterministicRoll([1]), // Low damage to ensure enemy stays alive
                modifiers: []
            }
        };

        // Call applyDamage
        const nextState = applyDamage(state);

        // It should have skipped 'apply-damage' and went straight to 'passive-damage'
        expect(nextState.phase).toBe('passive-damage');
    });

    it('should NOT skip apply-damage phase when passive abilities exist', () => {
        // Register a passive ability
        registerAbility({
            name: 'DamagePassive',
            type: 'passive',
            description: 'Deals damage',
            onPassiveAbility: (s) => ({
                ...s,
                // Mock a change in state so preview shows up
                hero: { ...s.hero, stats: { ...s.hero.stats, health: s.hero.stats.health - 1 } }
            })
        });

        const passiveHero: Hero = {
            ...simpleHero,
            equipment: {
                mainHand: {
                    id: 'w1', name: 'Weapon', type: 'mainHand',
                    abilities: ['DamagePassive'], bookRef: { book: 'T', act: 1 }
                }
            }
        };

        let state = startCombat(passiveHero, [MOCK_ENEMY]);

        state = {
            ...state,
            winner: 'hero',
            damage: {
                damageRolls: deterministicRoll([1]),
                modifiers: []
            }
        };

        const nextState = applyDamage(state);

        // Should stay in 'apply-damage' phase to show UI
        expect(nextState.phase).toBe('apply-damage');
    });
});
