import React, { useState } from 'react';
import { Hero, EquipmentSlot as EquipmentSlotType, EquipmentItem } from '../../types/hero';
import EquipmentSlot from './EquipmentSlot';
import InventorySelector from './InventorySelector';
import './EquipmentSlots.css';

interface EquipmentSlotsProps {
  hero: Hero;
  onEquip: (item: EquipmentItem, slot: EquipmentSlotType) => void;
  onUnequip: (slot: EquipmentSlotType) => void;
}

const SLOT_CONFIG: Array<{ slot: EquipmentSlotType; label: string; icon: string }> = [
  { slot: 'head', label: 'Head', icon: '⛑️' },
  { slot: 'cloak', label: 'Cloak', icon: '🧥' },
  { slot: 'necklace', label: 'Neck', icon: '📿' },

  { slot: 'mainHand', label: 'Main', icon: '⚔️' },
  { slot: 'chest', label: 'Chest', icon: '👕' },
  { slot: 'leftHand', label: 'Off', icon: '🛡️' },

  { slot: 'gloves', label: 'Hands', icon: '🧤' },
  { slot: 'ring1', label: 'Ring 1', icon: '💍' },
  { slot: 'ring2', label: 'Ring 2', icon: '💍' },

  { slot: 'feet', label: 'Feet', icon: '👢' },
  { slot: 'talisman', label: 'Talisman', icon: '🧿' },
];

const EquipmentSlots: React.FC<EquipmentSlotsProps> = ({ hero, onEquip, onUnequip }) => {
  const [selectedSlot, setSelectedSlot] = useState<EquipmentSlotType | null>(null);

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
    <div className="equipment-container">
      <h4>Equipment</h4>
      {/* Main Equipment */}
      <div className="equipment-grid">
        {SLOT_CONFIG.map(({ slot, label, icon }) => {
          const item = hero.equipment[slot];
          return (
            <EquipmentSlot
              key={slot}
              label={label}
              icon={icon}
              item={item}
              onClick={() => setSelectedSlot(slot)}
            />
          );
        })}
      </div>

      {selectedSlot && (
        <InventorySelector
          slot={selectedSlot}
          onSelect={handleEquip}
          onClose={() => setSelectedSlot(null)}
        />
      )}
    </div>
  );
};

export default EquipmentSlots;
