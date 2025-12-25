import React from 'react';
import { Hero, EquipmentSlot } from '../../types/hero';
import './EquipmentSlots.css';

interface EquipmentSlotsProps {
  hero: Hero;
  onSlotClick: (slot: EquipmentSlot) => void;
  onBackpackClick: (index: number) => void;
}

const SLOT_CONFIG: Array<{ slot: EquipmentSlot; label: string; icon: string }> = [
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
            <div
              key={slot}
              className={`equipment-slot ${item ? 'equipped' : ''}`}
              onClick={() => onSlotClick(slot)}
            >
              <span className="slot-icon">{icon}</span>
              <span className="slot-label">{label}</span>
              {item && <div className="equipment-name">{item.name}</div>}
            </div>
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
              <div
                key={`backpack-${index}`}
                className={`equipment-slot backpack-slot-wrapper ${item ? 'equipped' : ''}`}
                onClick={() => onBackpackClick(index)}
              >
                <span className="slot-icon">🎒</span>
                <span className="slot-label">{index + 1}</span>
                {item && <div className="equipment-name">{item.name}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EquipmentSlots;
