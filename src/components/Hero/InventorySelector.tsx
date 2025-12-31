import React from 'react';
import { EquipmentSlot, EquipmentItem, BackpackItem } from '../../types/hero';
import { getItemsBySlot, ITEMS } from '../../data/items';
import { getStatIcon } from '../../utils/statUtils';
import DqCard from '../Shared/DqCard';
import './InventorySelector.css';



interface InventorySelectorProps {
    slot?: EquipmentSlot;
    onSelect: (item: EquipmentItem | BackpackItem | null) => void;
    onClose: () => void;
    showAllItems?: boolean;
    customItems?: (EquipmentItem | BackpackItem)[]; // Allow passing specific list (e.g. backpack items)
}

const InventorySelector: React.FC<InventorySelectorProps> = ({ slot, onSelect, onClose, showAllItems = false, customItems }) => {
    const [searchTerm, setSearchTerm] = React.useState('');

    // Determine source items
    let items: (EquipmentItem | BackpackItem)[] = [];
    if (customItems) {
        items = customItems;
    } else if (showAllItems) {
        items = ITEMS;
    } else if (slot) {
        items = getItemsBySlot(slot);
    }

    const filteredItems = items.filter(item => {
        const term = searchTerm.toLowerCase();
        return (
            item.name.toLowerCase().includes(term) ||
            (item.bookRef.section && item.bookRef.section.toString().includes(term)) ||
            (item.location && item.location.toLowerCase().includes(term))
        );
    });

    return (
        <div className="equipment-selector-overlay" onClick={onClose}>
            <DqCard
                className="equipment-selector-modal"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                title={slot ? `Select ${slot}` : 'Select Item'}
                onClose={onClose}
            >
                <div className="selector-header">
                    <div className="header-row-search">
                        <input
                            type="text"
                            className="dq-input"
                            placeholder="Search items..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            autoFocus
                        />
                        {searchTerm && (
                            <button
                                className="action-btn-secondary"
                                onClick={() => setSearchTerm('')}
                                title="Clear search"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </div>

                <div className="items-list">
                    <div className="item-card unequip-card" onClick={() => onSelect(null)}>
                        <div className="item-card-header">
                            <div className="item-name">Empty Slot</div>
                            <div className="item-stats">Unequip</div>
                        </div>
                        <div className="item-desc">Clear current equipment from this slot.</div>
                    </div>

                    {filteredItems.length === 0 ? (
                        <div className="text-dim" style={{ textAlign: 'center', padding: '20px' }}>
                            No items found matching "{searchTerm}".
                        </div>
                    ) : (
                        filteredItems.map(item => (
                            <div key={item.id} className="item-card" onClick={() => onSelect(item)}>
                                <div className="item-card-header">
                                    <div className="item-name">{item.name}</div>
                                    <div className="item-source">
                                        <div className="text-dim" style={{ fontSize: '0.8rem' }}>Act {item.bookRef.act}</div>
                                        {item.bookRef.section && <div className="text-dim" style={{ fontSize: '0.8rem' }}>📖 {item.bookRef.section}</div>}
                                    </div>
                                </div>

                                {(item.stats || ('abilities' in item && (item as EquipmentItem).abilities) || ('effect' in item)) && (
                                    <div className="item-stats">
                                        {item.stats?.speed ? `${getStatIcon('speed')} ${item.stats.speed} ` : ''}
                                        {item.stats?.brawn ? `${getStatIcon('brawn')} ${item.stats.brawn} ` : ''}
                                        {item.stats?.magic ? `${getStatIcon('magic')} ${item.stats.magic} ` : ''}
                                        {item.stats?.armour ? `${getStatIcon('armour')} ${item.stats.armour} ` : ''}
                                        {'abilities' in item && (item as EquipmentItem).abilities && (item as EquipmentItem).abilities!.length > 0 && (
                                            <div className="item-abilities-tag">
                                                {(item as EquipmentItem).abilities!.map(a => `★ ${a} `).join(', ')}
                                            </div>
                                        )}
                                        {'effect' in item && (
                                            <div className="item-abilities-tag">
                                                {(item as BackpackItem).effect}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {'description' in item && (item as EquipmentItem).description && <div className="item-desc">{(item as EquipmentItem).description}</div>}
                                {'notes' in item && (item as BackpackItem).notes && <div className="item-desc">{(item as BackpackItem).notes}</div>}

                                <div className="item-meta-container">
                                    {item.location && <span>📍 {item.location}</span>}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </DqCard>
        </div>
    );
};

export default InventorySelector;
