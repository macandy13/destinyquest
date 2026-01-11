import { AbilityDefinition } from '../../abilityRegistry';
import { Hero, EquipmentItem, EquipmentSlot } from '../../../types/hero';

export const midasTouch: AbilityDefinition = {
    name: 'Midas touch',
    type: 'passive',
    description: 'Gain 30 gold crowns when replacing an item of equipment (excludes backpack items).',
    icon: '👑',
    reviewed: true,
    onEquipItem: (hero: Hero, _item: EquipmentItem, slot: EquipmentSlot): Hero => {
        // Midas touch: Gain 30 gold crowns when replacing an item of equipment
        const currentItem = hero.equipment[slot];
        if (currentItem) {
            return {
                ...hero,
                money: hero.money + 30
            };
        }
        return hero;
    }
};
