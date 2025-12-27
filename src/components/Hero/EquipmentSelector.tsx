import React from 'react';
import { EquipmentSlot, EquipmentItem } from '../../types/hero';
import { getItemsBySlot } from '../../data/items';
import { getStatIcon } from '../../utils/statUtils';
import DqCard from '../Shared/DqCard';
import './EquipmentSelector.css';

interface EquipmentSelectorProps {
    slot: EquipmentSlot;
    onSelect: (item: EquipmentItem | null) => void;
    onClose: () => void;
}

const EquipmentSelector: React.FC<EquipmentSelectorProps> = ({ slot, onSelect, onClose }) => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const items = getItemsBySlot(slot);

    const filteredItems = items.filter(item => {
        const term = searchTerm.toLowerCase();
        return (
            item.name.toLowerCase().includes(term) ||
            (item.entry && item.entry.toLowerCase().includes(term)) ||
            (item.location && item.location.toLowerCase().includes(term))
        );
    });

    return (
        <div className="equipment-selector-overlay" onClick={onClose}>
            <DqCard
                className="equipment-selector-modal"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                title={`Select ${slot}`}
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
                                        <div className="text-dim" style={{ fontSize: '0.8rem' }}>Act {item.act}</div>
                                        {item.entry && <div className="text-dim" style={{ fontSize: '0.8rem' }}>📖 {item.entry}</div>}
                                    </div>
                                </div>

                                {(item.stats || item.abilities) && (
                                    <div className="item-stats">
                                        {item.stats?.speed ? `${getStatIcon('speed')} ${item.stats.speed} ` : ''}
                                        {item.stats?.brawn ? `${getStatIcon('brawn')} ${item.stats.brawn} ` : ''}
                                        {item.stats?.magic ? `${getStatIcon('magic')} ${item.stats.magic} ` : ''}
                                        {item.stats?.armour ? `${getStatIcon('armour')} ${item.stats.armour} ` : ''}
                                        {item.abilities && item.abilities.length > 0 && (
                                            <div className="item-abilities-tag">
                                                {item.abilities.map(a => `★ ${a}`).join(', ')}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {item.description && <div className="item-desc">{item.description}</div>}

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

export default EquipmentSelector;
