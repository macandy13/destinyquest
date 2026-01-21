import { startCombat } from '../../CombatEngine';
import { Hero } from '../../../types/hero';
import { Enemy } from '../../../types/character';
import { registerAbility } from '../../abilityRegistry';
import { ebonyAndIvory } from './EbonyAndIvory';
import { createStatModifierAbility } from '../abilityFactories';

describe('Ebony and ivory', () => {
    beforeAll(() => {
        registerAbility(ebonyAndIvory);
        // Mock Cripple if not present
        registerAbility(createStatModifierAbility({
            name: 'Cripple', type: 'combat', description: 'Mock Cripple',
            target: 'opponent', stats: { speed: -1 }
        }));
    });

    it('should grant Cripple ability when both swords are equipped', () => {
        const hero: Hero = {
            type: 'hero',
            name: 'Tester',
            stats: { speed: 1, brawn: 1, magic: 1, armour: 0, health: 10, maxHealth: 10 },
            career: '',
            path: 'Warrior',
            money: 0,
            equipment: {
                mainHand: {
                    id: 'ebony', name: 'Ebony', type: 'mainHand',
                    stats: {}, abilities: ['Ebony and ivory'],
                    bookRef: { book: 'Test', act: 1, section: 1 }, location: ''
                },
                leftHand: {
                    id: 'ivory', name: 'Ivory', type: 'leftHand',
                    stats: {}, abilities: [],
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

    it('should NOT grant Cripple ability when only one sword is equipped', () => {
        const hero: Hero = {
            type: 'hero',
            name: 'Tester',
            stats: { speed: 1, brawn: 1, magic: 1, armour: 0, health: 10, maxHealth: 10 },
            career: '',
            path: 'Warrior',
            money: 0,
            equipment: {
                mainHand: {
                    id: 'ebony', name: 'Ebony', type: 'mainHand',
                    stats: {}, abilities: ['Ebony and ivory'],
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
