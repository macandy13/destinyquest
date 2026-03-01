import React from 'react';
import { Hero, EquipmentSlot, EquipmentItem, BackpackItem } from '../../types/hero';
import { BookRef } from '../../types/bookRef';
import EquipmentSlots from './EquipmentSlots';
import Backpack from './Backpack';

import DqCard from '../Shared/DqCard';

interface HeroEquipmentProps {
    hero: Hero;
    onEquip: (item: EquipmentItem, slot: EquipmentSlot) => void;
    onUnequip: (slot: EquipmentSlot) => void;
    onSetBackpackItem: (item: BackpackItem, index: number) => void;
    onDeleteBackpackItem: (index: number) => void;
    filterFn?: (bookRef: BookRef) => boolean;
}

const HeroEquipment: React.FC<HeroEquipmentProps> = ({
    hero,
    onEquip,
    onUnequip,
    onSetBackpackItem,
    onDeleteBackpackItem,
    filterFn
}) => {
    return (
        <DqCard title="Inventory" className="equipment-section">
            <EquipmentSlots
                hero={hero}
                onEquip={onEquip}
                onUnequip={onUnequip}
                filterFn={filterFn}
            />

            <Backpack
                hero={hero}
                onSetItem={onSetBackpackItem}
                onDeleteItem={onDeleteBackpackItem}
                filterFn={filterFn}
            />
        </DqCard>
    );
};

export default HeroEquipment;
