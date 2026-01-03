import React from 'react';
import { BackpackItem } from '../../types/Hero';
import './CombatBackpackItem.css';

interface CombatBackpackItemProps {
    item: BackpackItem;
    onClick: () => void;
}

const CombatBackpackItem: React.FC<CombatBackpackItemProps> = ({ item, onClick }) => {
    // Determine icon based on item type or name, or just generic
    // If we had an item registry for icons, we'd use it. For now, use generic potion/item icon.
    // Maybe try to guess based on name?
    const getIcon = (name: string) => {
        const lower = name.toLowerCase();
        if (lower.includes('potion')) return '🧪';
        if (lower.includes('bomb')) return '💣';
        if (lower.includes('scroll')) return '📜';
        return '🎒';
    };

    const icon = getIcon(item.name);

    return (
        <button
            className={`combat-backpack-item`}
            onClick={onClick}
            disabled={item.uses === 0}
            title={`${item.name} (Uses: ${item.uses})`}
        >
            <div className="backpack-icon-large">{icon}</div>
            <div className="backpack-name-compact">{item.name}</div>
            {item.uses !== undefined && (
                <div className="backpack-uses-badge">{item.uses}</div>
            )}
        </button>
    );
};

export default CombatBackpackItem;
