import React from 'react';
import { EquipmentSlot, EquipmentItem, BackpackItem, HeroPath } from '../../types/hero';
import { BookRef } from '../../types/bookRef';
import { getItemsBySlot, ITEMS } from '../../data/items';
import DqCard from '../Shared/DqCard';
import './InventorySelector.css';
import { getStatIcon } from '../../types/stats';
import { formatEffect } from '../../types/effect';



interface InventorySelectorProps {
    slot?: EquipmentSlot;
    onSelect: (item: EquipmentItem | BackpackItem | null) => void;
    onClose: () => void;
    showAllItems?: boolean;
    customItems?: (EquipmentItem | BackpackItem)[];
    heroPath?: HeroPath;
    filterFn?: (bookRef: BookRef) => boolean;
}

const InventorySelector: React.FC<InventorySelectorProps> = ({
    slot,
    onSelect,
    onClose,
    showAllItems = false,
    customItems,
    heroPath,
    filterFn
}) => {
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

    const bookFiltered = filterFn
        ? items.filter(item => filterFn(item.bookRef))
        : items;

    const filteredItems = bookFiltered.filter(item => {
        const term = searchTerm.toLowerCase();
        return (
            item.name.toLowerCase().includes(term) ||
            (item.bookRef.section &&
                item.bookRef.section
                    .toString()
                    .includes(term)) ||
            (item.location &&
                item.location
                    .toLowerCase()
                    .includes(term))
        );
    });

    const isAllowed = (item: EquipmentItem | BackpackItem) => {
        if (!('pathRequirement' in item)) return true;
        return !item.pathRequirement || item.pathRequirement == heroPath;
    };

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
                        <div className="text-dim no-items-message">
                            No items found matching "{searchTerm}".
                        </div>
                    ) : (
                        filteredItems.map(item => {
                            return (
                                <div
                                    key={item.id}
                                    className={`item-card ${!isAllowed(item) ? 'disabled-item' : ''}`}
                                    onClick={() => isAllowed(item) && onSelect(item)}
                                >
                                    <div className="item-card-header">
                                        <div className="item-name">
                                            {item.name}
                                            {!isAllowed(item) && (item as EquipmentItem).pathRequirement && (
                                                <span className="requirement-tag">
                                                    (Req: {(item as EquipmentItem).pathRequirement})
                                                </span>
                                            )}
                                        </div>
                                        <div className="item-source">
                                            <div className="text-dim source-detail">Act {item.bookRef.act}</div>
                                            {item.bookRef.section && <div className="text-dim source-detail">📖 {item.bookRef.section}</div>}
                                        </div>
                                    </div>

                                    {item.type == 'backpack' ? (
                                        <div className="item-stats">
                                            {formatEffect(item.effect!)}
                                        </div>
                                    ) : (
                                        <div className="item-stats">
                                            {item.stats!.speed ? `${getStatIcon('speed')} ${item.stats!.speed} ` : ''}
                                            {item.stats!.brawn ? `${getStatIcon('brawn')} ${item.stats!.brawn} ` : ''}
                                            {item.stats!.magic ? `${getStatIcon('magic')} ${item.stats!.magic} ` : ''}
                                            {item.stats!.armour ? `${getStatIcon('armour')} ${item.stats!.armour} ` : ''}
                                            {'abilities' in item && (item as EquipmentItem).abilities && (item as EquipmentItem).abilities!.length > 0 && (
                                                <div className="item-abilities-tag">
                                                    {(item as EquipmentItem).abilities!.map(a => `★ ${a} `).join(', ')}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {'description' in item && (item as EquipmentItem).description && <div className="item-desc">{(item as EquipmentItem).description}</div>}
                                    {'notes' in item && (item as BackpackItem).notes && <div className="item-desc">{(item as BackpackItem).notes}</div>}

                                    <div className="item-meta-container">
                                        {item.location && <span>📍 {item.location}</span>}
                                        {'pathRequirement' in item && (item as EquipmentItem).pathRequirement && (
                                            <span className="requirement-meta">
                                                Requires: {(item as EquipmentItem).pathRequirement}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </DqCard>
        </div>
    );
};

export default InventorySelector;
