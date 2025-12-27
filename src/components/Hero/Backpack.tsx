import React, { useState } from 'react';
import { Hero, EquipmentItem } from '../../types/hero';
import EquipmentSlot from './EquipmentSlot';
import InventorySelector from './InventorySelector';
import './Backpack.css';

interface BackpackProps {
    hero: Hero;
    onSetItem: (item: EquipmentItem, index: number) => void;
    onDeleteItem: (index: number) => void;
}

const BACKPACK_CAPACITY = 5;

const Backpack: React.FC<BackpackProps> = ({ hero, onSetItem, onDeleteItem }) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    return (
        <div className="backpack-container">
            <h4>Backpack ({hero.backpack.filter(i => i !== null).length}/{BACKPACK_CAPACITY})</h4>
            <div className="backpack-grid">
                {Array.from({ length: BACKPACK_CAPACITY }).map((_, index) => {
                    const item = hero.backpack[index];
                    return (
                        <EquipmentSlot
                            key={`backpack-${index}`}
                            label={`${index + 1}`}
                            icon="🎒"
                            item={item}
                            onClick={() => setSelectedIndex(index)}
                            className="backpack-slot-wrapper"
                        />
                    );
                })}
            </div>

            {selectedIndex !== null && (
                <InventorySelector
                    onSelect={(item) => {
                        if (item) {
                            onSetItem(item, selectedIndex);
                        } else {
                            onDeleteItem(selectedIndex);
                        }
                        setSelectedIndex(null);
                    }}
                    onClose={() => setSelectedIndex(null)}
                    showAllItems={true}
                />
            )}
        </div>
    );
};

export default Backpack;
