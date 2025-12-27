import React, { useState } from 'react';
import { Hero, EquipmentSlot, EquipmentItem } from '../../types/hero';
import EquipmentSlots from './EquipmentSlots';
import EquipmentSelector from './EquipmentSelector';

import DqCard from '../Shared/DqCard';

interface HeroEquipmentProps {
    hero: Hero;
    onEquip: (item: EquipmentItem, slot: EquipmentSlot) => void;
    onUnequip: (slot: EquipmentSlot) => void;
}

const HeroEquipment: React.FC<HeroEquipmentProps> = ({ hero, onEquip, onUnequip }) => {
    const [selectedSlot, setSelectedSlot] = useState<EquipmentSlot | null>(null);

    const handleEquip = (item: EquipmentItem | null) => {
        if (selectedSlot) {
            if (item) {
                onEquip(item, selectedSlot);
            } else {
                onUnequip(selectedSlot);
            }
            setSelectedSlot(null);
        }
    };

    return (
        <DqCard title="Inventory" className="equipment-section">
            <EquipmentSlots
                hero={hero}
                onSlotClick={(slot) => setSelectedSlot(slot)}
                onBackpackClick={(index) => console.log('Clicked backpack:', index)}
            />

            {selectedSlot && (
                <EquipmentSelector
                    slot={selectedSlot}
                    onSelect={handleEquip}
                    onClose={() => setSelectedSlot(null)}
                />
            )}
        </DqCard>
    );
};

export default HeroEquipment;
