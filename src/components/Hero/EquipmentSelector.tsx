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
    const [searchTerm, setSearchTerm] = React.useState('');
    const items = getItemsBySlot(slot);

    const filteredItems = items.filter(item => {
        const term = searchTerm.toLowerCase();
        return (
            item.name.toLowerCase().includes(term) ||
            item.act.toString().includes(term) ||
            (item.entry && item.entry.toLowerCase().includes(term)) ||
            (item.location && item.location.toLowerCase().includes(term))
        );
    });

    return (
        <div className="equipment-selector-overlay" onClick={onClose}>
            <div className="equipment-selector-modal" onClick={e => e.stopPropagation()}>
                <div className="selector-header">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 className="selector-title">Select {slot}</h3>
                        <button className="close-btn" onClick={onClose}>&times;</button>
                    </div>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search name, entry, act..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        autoFocus
                    />
                </div>

                <div className="items-list">
                    {filteredItems.length === 0 ? (
                        <div className="text-dim" style={{ textAlign: 'center', padding: '20px' }}>
                            No items found matching "{searchTerm}".
                        </div>
                    ) : (
                        filteredItems.map(item => (
                            <div key={item.id} className="item-card" onClick={() => onSelect(item)}>
                                <div className="item-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div className="item-name">{item.name}</div>
                                    <div className="text-dim" style={{ fontSize: '0.8rem' }}>Act {item.act}</div>
                                </div>

                                {(item.stats || item.abilities) && (
                                    <div className="item-stats">
                                        {item.stats?.speed ? `⚡ ${item.stats.speed} ` : ''}
                                        {item.stats?.brawn ? `💪 ${item.stats.brawn} ` : ''}
                                        {item.stats?.magic ? `✨ ${item.stats.magic} ` : ''}
                                        {item.stats?.armour ? `🛡️ ${item.stats.armour} ` : ''}
                                    </div>
                                )}

                                {item.description && <div className="item-desc">{item.description}</div>}

                                <div className="item-meta" style={{ marginTop: '4px', fontSize: '0.75rem', color: '#888' }}>
                                    {item.entry && <span style={{ marginRight: '8px' }}>📖 {item.entry}</span>}
                                    {item.location && <span>📍 {item.location}</span>}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default EquipmentSelector;
