import React from 'react';
import { Effect } from '../../types/Effect';
import './CombatModifiers.css';

// Helper to format modification text
const formatEffect = (effect: Effect) => {
    const parts = [];
    if (effect.stats.speed) parts.push(`Speed ${effect.stats.speed > 0 ? '+' : ''}${effect.stats.speed}`);
    if (effect.stats.damageModifier) parts.push(`Dmg ${effect.stats.damageModifier > 0 ? '+' : ''}${effect.stats.damageModifier}`);
    if (effect.stats.armour) parts.push(`Armour ${effect.stats.armour > 0 ? '+' : ''}${effect.stats.armour}`);
    // Add others as needed
    return parts.join(', ');
}

interface CombatModifiersProps {
    modifications: Effect[];
}

const CombatModifiers: React.FC<CombatModifiersProps> = ({ modifications }) => {
    if (!modifications || modifications.length === 0) return null;

    return (
        <div className="combat-modifiers">
            <h4 className="modifiers-title">Active Effects</h4>
            <div className="modifiers-list">
                {modifications.map((item, i) => (
                    <div key={i} className="modifier-item">
                        {item.source}: {formatEffect(item)} ({item.duration} rounds left)
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CombatModifiers;
