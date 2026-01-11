import { midasTouch } from './MidasTouch';
import { Hero } from '../../../types/hero';
import { EquipmentItem } from '../../../types/hero';

describe('Midas touch', () => {
    it('should gain 30 gold when replacing an item', () => {
        const hero: Hero = {
            type: 'hero',
            name: 'Tester',
            stats: { speed: 1, brawn: 1, magic: 1, armour: 0, health: 10, maxHealth: 10 },
            career: '',
            path: 'Warrior',
            money: 100,
            equipment: {
                mainHand: {
                    id: 'old-item', name: 'Old Item', type: 'mainHand',
                    stats: {}, abilities: [],
                    bookRef: { book: 'Test', act: 1, section: 1 }, location: ''
                }
            },
            backpack: []
        };

        const newItem: EquipmentItem = {
            id: 'new-item', name: 'New Item', type: 'mainHand',
            stats: {}, abilities: [],
            bookRef: { book: 'Test', act: 1, section: 1 }, location: ''
        };

        const onEquipItem = midasTouch.onEquipItem!;
        expect(onEquipItem).toBeDefined();

        const updatedHero = onEquipItem(hero, newItem, 'mainHand');

        // Should gain 30 gold because we replaced an item
        expect(updatedHero.money).toBe(130);
    });

    it('should NOT gain gold when equipping into empty slot', () => {
        const hero: Hero = {
            type: 'hero',
            name: 'Tester',
            stats: { speed: 1, brawn: 1, magic: 1, armour: 0, health: 10, maxHealth: 10 },
            career: '',
            path: 'Warrior',
            money: 100,
            equipment: {}, // Empty
            backpack: []
        };

        const newItem: EquipmentItem = {
            id: 'new-item', name: 'New Item', type: 'mainHand',
            stats: {}, abilities: [],
            bookRef: { book: 'Test', act: 1, section: 1 }, location: ''
        };

        const onEquipItem = midasTouch.onEquipItem!;
        const updatedHero = onEquipItem(hero, newItem, 'mainHand');

        // Should NOT gain gold
        expect(updatedHero.money).toBe(100);
    });
});
