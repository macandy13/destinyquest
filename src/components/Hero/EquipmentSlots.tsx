import React, { useState } from 'react';
import { Hero, EquipmentSlot as EquipmentSlotType, EquipmentItem } from '../../types/hero';
import EquipmentSlot from './EquipmentSlot';
import InventorySelector from './InventorySelector';
import heroSilhouette from '../../assets/hero_silhouette.png';
import './EquipmentSlots.css';

interface EquipmentSlotsProps {
  hero: Hero;
  onEquip: (item: EquipmentItem, slot: EquipmentSlotType) => void;
  onUnequip: (slot: EquipmentSlotType) => void;
}

const SLOT_CONFIG: Record<EquipmentSlotType, { top: string; left: string; label: string; icon: string }> = {
  head: { top: '5%', left: '50%', label: 'Head', icon: '⛑️' },
  necklace: { top: '22%', left: '50%', label: 'Neck', icon: '📿' },
  talisman: { top: '22%', left: '20%', label: 'Talisman', icon: '🧿' },
  leftHand: { top: '15%', left: '85%', label: 'Off', icon: '🛡️' },
  ring2: { top: '32%', left: '85%', label: 'Ring 2', icon: '💍' },
  cloak: { top: '43%', left: '12%', label: 'Cloak', icon: '🧥' },
  chest: { top: '40%', left: '50%', label: 'Chest', icon: '👕' },
  mainHand: { top: '60%', left: '12%', label: 'Main', icon: '⚔️' },
  gloves: { top: '60%', left: '85%', label: 'Hands', icon: '🧤' },
  ring1: { top: '60%', left: '40%', label: 'Ring 1', icon: '💍' },
  feet: { top: '88%', left: '50%', label: 'Feet', icon: '👢' },
};

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

      <div className="equipment-slots">
        <div className="human-figure-container" style={{ backgroundImage: `url(${heroSilhouette})` }}>
          {(Object.entries(SLOT_CONFIG) as [EquipmentSlotType, typeof SLOT_CONFIG[EquipmentSlotType]][]).map(([slot, config]) => {
            const item = hero.equipment[slot];
            return (
              <div
                key={slot}
                className="positioned-slot"
                style={{ top: config.top, left: config.left }}
              >
                <EquipmentSlot
                  label={config.label}
                  icon={config.icon}
                  item={item}
                  onClick={() => setSelectedSlot(slot)}
                />
              </div>
            );
          })}
        </div>
      </div>

      {selectedSlot && (
        <InventorySelector
          slot={selectedSlot}
          onSelect={(item) => handleEquip(item as EquipmentItem)}
          onClose={() => setSelectedSlot(null)}
        />
      )}
    </div>
  );
};

export default EquipmentSlots;
