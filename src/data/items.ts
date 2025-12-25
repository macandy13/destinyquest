import { EquipmentItem } from '../types/hero';

export const ITEMS: EquipmentItem[] = [
    // ACT 1
    {
        id: 'patchwork_cloak',
        name: 'Patchwork Cloak',
        slot: 'cloak',
        type: 'cloak',
        act: 1,
        cost: 5, // Estimated
        stats: { speed: 1, armour: 0 },
        description: 'A tattered cloak that offers little protection.'
    },
    {
        id: 'bat_cape',
        name: 'Bat Cape',
        slot: 'cloak',
        type: 'cloak',
        act: 1,
        cost: 10, // Estimated
        stats: { speed: 1, armour: 1 },
        description: 'A dark cape resembling bat wings.'
    },

    // ACT 2
    {
        id: 'golden_fire',
        name: 'Golden Fire',
        slot: 'mainHand', // Bow? usually main hand.
        type: 'mainHand',
        act: 2,
        stats: { speed: 1, brawn: 5 },
        abilities: ['Smash fire: Deals 2 damage dice to all opponents, ignoring armor. Grants 10 health per kill.'],
        description: 'A legendary bow radiating with heat.'
    },
    {
        id: 'gnawing_pain',
        name: 'Gnawing Pain',
        slot: 'mainHand',
        type: 'mainHand',
        act: 2,
        stats: { speed: 2, brawn: 4 },
        abilities: ['Disease: Enemies take 2 damage at end of round if hurt.'],
        description: 'A cruel axe that infects wounds.'
    },
    {
        id: 'blood_rose',
        name: 'Blood Rose',
        slot: 'ring1', // Can fit in ring1 or ring2
        type: 'ring1',
        act: 2,
        stats: { brawn: 1, magic: 1 },
        abilities: ['Dark pact: Sacrifice 4 health to increase damage by 4.'],
        description: 'A ring featuring a crimson rose.'
    },
    {
        id: 'book_of_the_dead',
        name: 'Book of the Dead',
        slot: 'leftHand',
        type: 'leftHand',
        act: 2,
        stats: { speed: 3, magic: 4 },
        abilities: ['Haunt: Summons spirit dealing 2 damage each round.'],
        description: 'A tome bound in dark leather.'
    },
    {
        id: 'beacon_of_faith',
        name: 'Beacon of Faith',
        slot: 'mainHand',
        type: 'mainHand',
        act: 2,
        stats: { speed: 2, magic: 3 },
        abilities: ['Heal: Restore 4 health (once/combat).'],
        description: 'A glowing orb of holy light.'
    }
];

export const getItemsBySlot = (slot: string) => {
    // Handle ring1/ring2 mapping to generic 'ring' items if we had a type field.
    // For now, assume items meant for rings can go in either.
    // But our EquipmentItem has a fixed 'slot'. 
    // We might need to change 'slot' in EquipmentItem to 'type' (e.g. ring) and allow equipping in compatible slots.

    // Simplification: Searching by exact slot match for now, or partial match for rings.
    return ITEMS.filter(item => {
        if (slot.startsWith('ring')) return item.slot.startsWith('ring');
        return item.slot === slot;
    });
};
