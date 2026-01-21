import { startCombat } from '../../CombatEngine';
import { Hero } from '../../../types/hero';
import { Enemy } from '../../../types/character';
import { registerAbility } from '../../abilityRegistry';
import { royalRegalia } from './RoyalRegalia';
import { createStatModifierAbility } from '../abilityFactories';

describe('Royal regalia', () => {
    beforeAll(() => {
        registerAbility(royalRegalia);
        // Mock Cripple if not present
        registerAbility(createStatModifierAbility({
            name: 'Cripple', type: 'combat', description: 'Mock Cripple',
            target: 'opponent', stats: { speed: -1 }
        }));
    });

    it('should grant Cripple ability when 2 sources of Royal regalia are present', () => {
        const hero: Hero = {
            type: 'hero',
            name: 'Tester',
            stats: { speed: 1, brawn: 1, magic: 1, armour: 0, health: 10, maxHealth: 10 },
            career: '',
            path: 'Warrior',
            money: 0,
            equipment: {
                cloak: {
                    id: 'majestic_shoulders', name: 'Majestic shoulders', type: 'cloak',
                    stats: {}, abilities: ['Royal regalia'],
                    bookRef: { book: 'Test', act: 1, section: 1 }, location: ''
                },
                head: {
                    id: 'majestic_helm', name: 'Majestic greaves', type: 'head',
                    stats: {}, abilities: ['Royal regalia'],
                    bookRef: { book: 'Test', act: 1, section: 1 }, location: ''
                }
            },
            backpack: [null, null, null, null, null]
        };

        const enemy: Enemy = {
            type: 'enemy',
            name: 'Dummy',
            stats: { speed: 1, brawn: 1, magic: 0, armour: 0, health: 10, maxHealth: 10 },
            bookRef: { book: 'Test', act: 1 },
            abilities: []
        };

        let state = startCombat(hero, [enemy]);

        expect(state.hero.activeAbilities.has('cripple')).toBe(true);
    });

    it('should NOT grant Cripple ability when only 1 source of Royal regalia is present', () => {
        const hero: Hero = {
            type: 'hero',
            name: 'Tester',
            stats: { speed: 1, brawn: 1, magic: 1, armour: 0, health: 10, maxHealth: 10 },
            career: '',
            path: 'Warrior',
            money: 0,
            equipment: {
                cloak: {
                    id: 'majestic_shoulders', name: 'Majestic shoulders', type: 'cloak',
                    stats: {}, abilities: ['Royal regalia'],
                    bookRef: { book: 'Test', act: 1, section: 1 }, location: ''
                }
            },
            backpack: [null, null, null, null, null]
        };

        const enemy: Enemy = {
            type: 'enemy',
            name: 'Dummy',
            stats: { speed: 1, brawn: 1, magic: 0, armour: 0, health: 10, maxHealth: 10 },
            bookRef: { book: 'Test', act: 1 },
            abilities: []
        };

        let state = startCombat(hero, [enemy]);

        expect(state.hero.activeAbilities.has('cripple')).toBe(false);
    });
});
