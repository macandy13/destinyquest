import React, { useState } from 'react';
import { Hero, BackpackItem } from '../../types/Hero';
import EquipmentSlot from './EquipmentSlot';
import InventorySelector from './InventorySelector';
import { BACKPACK_ITEMS } from '../../data/backpackItems';
import './Backpack.css';

interface BackpackProps {
    hero: Hero;
    onSetItem: (item: BackpackItem, index: number) => void;
    onDeleteItem: (index: number) => void;
}

const Backpack: React.FC<BackpackProps> = ({ hero, onSetItem, onDeleteItem }) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    return (
        <div className="backpack-container">
            <h4>Backpack ({hero.backpack.filter(i => i !== null).length}/{hero.backpack.length})</h4>
            <div className="backpack-grid">
                {Array.from({ length: hero.backpack.length }).map((_, index) => {
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
                            onSetItem(item as BackpackItem, selectedIndex);
                        } else {
                            onDeleteItem(selectedIndex);
                        }
                        setSelectedIndex(null);
                    }}
                    onClose={() => setSelectedIndex(null)}
                    customItems={BACKPACK_ITEMS}
                />
            )}
        </div>
    );
};

export default Backpack;
