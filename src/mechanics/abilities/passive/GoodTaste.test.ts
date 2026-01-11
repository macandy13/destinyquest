import { startCombat, useBackpackItem } from '../../CombatEngine';
import { Hero } from '../../../types/hero';
import { Enemy } from '../../../types/character';
import { registerAbility } from '../../abilityRegistry';
import { goodTaste } from './GoodTaste';
import { mockDiceRolls } from '../../../tests/testUtils';

describe('Good taste', () => {
    beforeAll(() => {
        registerAbility(goodTaste);
    });

    it('should boost magic potion effect', () => {
        const hero: Hero = {
            type: 'hero',
            name: 'Tester',
            stats: { speed: 1, brawn: 1, magic: 1, armour: 0, health: 10, maxHealth: 10 },
            career: '',
            path: 'Mage',
            money: 0,
            equipment: {
                mainHand: {
                    id: 'test-item', name: 'Test Item', type: 'mainHand',
                    stats: {}, abilities: ['Good taste'],
                    bookRef: { book: 'Test', act: 1, section: 1 }, location: ''
                }
            },
            backpack: [
                {
                    id: 'magic-potion',
                    type: 'backpack',
                    name: 'Magic Potion',
                    description: '',
                    effect: {
                        source: 'Magic Potion',
                        target: 'hero',
                        stats: { magic: 2 },
                        duration: 1
                    },
                    bookRef: { book: 'Test', act: 1, section: 1 }
                },
                null, null, null, null
            ]
        };

        const enemy: Enemy = {
            type: 'enemy',
            name: 'Dummy',
            stats: { speed: 1, brawn: 1, magic: 0, armour: 0, health: 10, maxHealth: 10 },
            bookRef: { book: 'Test', act: 1 },
            abilities: []
        };

        let state = startCombat(hero, enemy);
        // Use potion at index 0
        mockDiceRolls([3]);
        state = useBackpackItem(state, 0);

        // Check active effects
        const potionEffect = state.hero.activeEffects.find(e => e.source === 'Magic Potion');
        expect(potionEffect).toBeDefined();
        // The original effect (+2) should be there.

        const boostEffect = state.hero.activeEffects.find(e => e.source === 'Good taste');
        expect(boostEffect).toBeDefined();
        expect(boostEffect?.stats.magic).toBe(3);
    });
});
