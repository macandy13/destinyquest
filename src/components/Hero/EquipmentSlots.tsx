import React, { useState } from 'react';
import { Hero, EquipmentSlot as EquipmentSlotType, EquipmentItem } from '../../types/hero';
import EquipmentSlot from './EquipmentSlot';
import InventorySelector from './InventorySelector';
import './EquipmentSlots.css';
import heroSilhouette from '../../assets/hero_silhouette.png';

interface EquipmentSlotsProps {
  hero: Hero;
  onEquip: (item: EquipmentItem, slot: EquipmentSlotType) => void;
  onUnequip: (slot: EquipmentSlotType) => void;
}

const SLOT_CONFIG: Record<EquipmentSlotType, { top: string; left: string; label: string; icon: string }> = {
  head: { top: '10%', left: '50%', label: 'Head', icon: '⛑️' },
  necklace: { top: '22%', left: '70%', label: 'Neck', icon: '📿' },
  talisman: { top: '22%', left: '30%', label: 'Talisman', icon: '🧿' },
  leftHand: { top: '15%', left: '90%', label: 'Off', icon: '🛡️' },
  ring2: { top: '28%', left: '90%', label: 'Ring 2', icon: '💍' },
  cloak: { top: '40%', left: '20%', label: 'Cloak', icon: '🧥' },
  chest: { top: '40%', left: '50%', label: 'Chest', icon: '👕' },
  mainHand: { top: '55%', left: '10%', label: 'Main', icon: '⚔️' },
  gloves: { top: '65%', left: '70%', label: 'Hands', icon: '🧤' },
  ring1: { top: '65%', left: '35%', label: 'Ring 1', icon: '💍' },
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
