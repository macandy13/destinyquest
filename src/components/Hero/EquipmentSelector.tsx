import React from 'react';
import { EquipmentSlot, EquipmentItem } from '../../types/hero';
import { getItemsBySlot } from '../../data/items';
import './EquipmentSelector.css';

interface EquipmentSelectorProps {
    slot: EquipmentSlot;
    onSelect: (item: EquipmentItem) => void;
    onClose: () => void;
}

const EquipmentSelector: React.FC<EquipmentSelectorProps> = ({ slot, onSelect, onClose }) => {
    const items = getItemsBySlot(slot);

    return (
        <div className="equipment-selector-overlay" onClick={onClose}>
            <div className="equipment-selector-modal" onClick={e => e.stopPropagation()}>
                <div className="selector-header">
                    <h3 className="selector-title">Select {slot}</h3>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="items-list">
                    {items.length === 0 ? (
                        <div className="text-dim" style={{ textAlign: 'center', padding: '20px' }}>
                            No items found for this slot.
                        </div>
                    ) : (
                        items.map(item => (
                            <div key={item.id} className="item-card" onClick={() => onSelect(item)}>
                                <div className="item-name">{item.name}</div>
                                {(item.stats || item.abilities) && (
                                    <div className="item-stats">
                                        {item.stats?.speed ? `⚡ ${item.stats.speed} ` : ''}
                                        {item.stats?.brawn ? `💪 ${item.stats.brawn} ` : ''}
                                        {item.stats?.magic ? `✨ ${item.stats.magic} ` : ''}
                                        {item.stats?.armour ? `🛡️ ${item.stats.armour} ` : ''}
                                    </div>
                                )}
                                {item.description && <div className="item-desc">{item.description}</div>}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default EquipmentSelector;
