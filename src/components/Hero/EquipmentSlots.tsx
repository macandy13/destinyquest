import React from 'react';
import { Hero, EquipmentSlot as EquipmentSlotType } from '../../types/hero';
import EquipmentSlot from './EquipmentSlot';
import './EquipmentSlots.css';

interface EquipmentSlotsProps {
  hero: Hero;
  onSlotClick: (slot: EquipmentSlotType) => void;
  onBackpackClick: (index: number) => void;
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

const BACKPACK_CAPACITY = 5;

const EquipmentSlots: React.FC<EquipmentSlotsProps> = ({ hero, onSlotClick, onBackpackClick }) => {
  return (
    <div className="equipment-container">
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
              onClick={() => onSlotClick(slot)}
            />
          );
        })}
      </div>

      {/* Backpack */}
      <div>
        <h4 className="backpack-title">Backpack ({hero.backpack.length}/{BACKPACK_CAPACITY})</h4>
        <div className="backpack-grid">
          {Array.from({ length: BACKPACK_CAPACITY }).map((_, index) => {
            const item = hero.backpack[index];
            return (
              <EquipmentSlot
                key={`backpack-${index}`}
                label={`${index + 1}`}
                icon="🎒"
                item={item}
                onClick={() => onBackpackClick(index)}
                className="backpack-slot-wrapper"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EquipmentSlots;
