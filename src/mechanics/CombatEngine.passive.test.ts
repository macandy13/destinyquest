import { MOCK_ENEMY, getPassiveAbilityPreview, startCombat } from './CombatEngine';
import { Hero } from '../types/hero';
import { registerAbility, toCanonicalName } from './abilityRegistry';

describe('Passive Ability Preview', () => {
    // Register a mock passive ability for testing
    registerAbility({
        name: 'MockVenom',
        type: 'passive',
        description: 'Test Passive',
        onPassiveAbility: (state, { }) => {
            // Mock effect: Deal 5 damage to enemy
            const newEnemyHealth = state.enemy.stats.health - 5;
            return {
                ...state,
                enemy: {
                    ...state.enemy,
                    stats: {
                        ...state.enemy.stats,
                        health: newEnemyHealth
                    }
                }
            };
        }
    });

    it('should generate a preview for a passive ability that deals damage', () => {
        const hero: Hero = {
            name: 'TestHero',
            type: 'hero',
            path: 'Warrior',
            career: 'Test Career',
            money: 0,
            stats: { speed: 10, brawn: 10, magic: 10, armour: 0, health: 100, maxHealth: 100 },
            backpack: [null, null, null, null, null],
            equipment: {
                head: {
                    id: 'test-helm',
                    name: 'Venom Helm',
                    type: 'head',
                    abilities: ['MockVenom'],
                    bookRef: { book: 'Test', act: 1 }
                }
            }
        };

        let state = startCombat(hero, MOCK_ENEMY);

        // Ensure ability is active (startCombat should activate equipment abilities)
        expect(state.hero.activeAbilities.has(toCanonicalName('MockVenom'))).toBe(true);

        const { previews } = getPassiveAbilityPreview(state);

        expect(previews).toHaveLength(1);
        expect(previews[0].abilityName).toBe('MockVenom');
        expect(previews[0].changes).toHaveLength(1);
        expect(previews[0].changes[0].message).toContain('Deals 5 damage');
    });

    it('should not generate preview if state does not change', () => {
        // Register a no-op passive
        registerAbility({
            name: 'NoOpPassive',
            type: 'passive',
            description: 'Does nothing',
            onPassiveAbility: (state) => state
        });

        const hero: Hero = {
            name: 'TestHero',
            type: 'hero',
            path: 'Warrior',
            career: 'Test Career',
            money: 0,
            stats: { speed: 10, brawn: 10, magic: 10, armour: 0, health: 100, maxHealth: 100 },
            backpack: [null, null, null, null, null],
            equipment: {
                head: {
                    id: 'test-helm',
                    name: 'Useless Hat',
                    type: 'head',
                    abilities: ['NoOpPassive'],
                    bookRef: { book: 'Test', act: 1 }
                }
            }
        };

        let state = startCombat(hero, MOCK_ENEMY);
        const { previews } = getPassiveAbilityPreview(state);
        expect(previews).toHaveLength(0);
    });
});
