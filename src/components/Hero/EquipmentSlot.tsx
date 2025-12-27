import React from 'react';
import { HeroStats } from '../../types/hero';
import './EquipmentSlot.css';
import { getStatIcon } from '../../utils/statUtils';

interface SlotDisplayItem {
    name: string;
    stats?: Partial<HeroStats>;
    abilities?: string[];
    description?: string;
    effect?: string;
}

interface EquipmentSlotProps {
    label?: string; // Label shown when empty (e.g. "Head")
    icon: string; // Background icon (e.g. helmet emoji)
    item?: SlotDisplayItem | null;
    onClick: () => void;
    className?: string;
}

const EquipmentSlot: React.FC<EquipmentSlotProps> = ({ label, icon, item, onClick, className = '' }) => {
    return (
        <div
            className={`equipment-slot ${item ? 'equipped' : ''} ${className}`}
            onClick={onClick}
        >
            <span className="slot-icon">{icon}</span>
            {item ? (
                <div className="equipment-item-container">
                    <span className="equipment-name-visible">{item.name}</span>
                    {item.stats && Object.keys(item.stats).length > 0 && (
                        <span className="equipment-stats-display">
                            {Object.entries(item.stats)
                                .map(([stat, value]) => {
                                    const statIcon = getStatIcon(stat);
                                    return `${value > 0 ? '+' : ''}${value} ${statIcon}`;
                                })
                                .join(' ')}
                        </span>
                    )}
                    {item.abilities && item.abilities.length > 0 && (
                        <span className="equipment-abilities-display">
                            {item.abilities.map(a => `★ ${a}`).join(', ')}
                        </span>
                    )}
                    {(item.description || item.effect) && (
                        <span className="equipment-effect-display">
                            {item.description || item.effect}
                        </span>
                    )}
                </div>
            ) : (
                label && <span className="slot-label">{label}</span>
            )}
        </div>
    );
};

export default EquipmentSlot;
